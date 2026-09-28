// Pure mocked network/database/email tests. No live requests or writes.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const { NextRequest } = require('next/server');
const root = path.resolve(__dirname, '..');
function load(relative, mocks = {}) {
  const filename = path.join(root, relative), mod = new Module(filename);
  mod.filename = filename;
  mod.paths = Module._nodeModulePaths(path.dirname(filename));
  mod.require = id => {
    if (id === 'server-only') return {};
    if (Object.hasOwn(mocks, id)) return mocks[id];
    if (id.startsWith('@/')) return load(id.slice(2) + '.ts', mocks);
    return require(id);
  };
  mod._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText, filename);
  return mod.exports;
}
async function main() {
  const savedEnv = { ...process.env }, savedFetch = global.fetch;
  let sends = 0, inserts = 0, verifies = 0;
  const usedTokens = new Set();
  let mode = 'valid';
  process.env.TURNSTILE_SECRET_KEY = 'fake-test-secret';
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = 'fake-test-sitekey';
  process.env.TURNSTILE_ALLOWED_HOSTNAMES = 'aggrecapital.com,www.aggrecapital.com';
  process.env.VERCEL_ENV = 'production';
  global.fetch = async (url, options) => {
    assert.equal(url, 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
    const data = JSON.parse(options.body);
    assert.deepEqual(Object.keys(data).sort(), ['response', 'secret']);
    assert.equal(data.secret, 'fake-test-secret');
    assert(options.signal);
    verifies++;
    if (mode === 'timeout') throw new Error('private error');
    if (mode === 'unavailable') return new Response('', {status: 503});
    if (mode === 'malformed') return new Response('null');
    const success = mode !== 'rejected' && !usedTokens.has(data.response);
    usedTokens.add(data.response);
    return Response.json({success,
      action: mode === 'wrong-action' ? 'other' : data.response.startsWith('application') ? 'application' : 'contact',
      hostname: mode === 'wrong-host' ? 'attacker.example' : 'www.aggrecapital.com'});
  };
  const mocks = {
    '@/lib/database': {query: async () => { inserts++; return {rows: [{application_id:'TEST', created_at: new Date()}]}; }},
    '@/lib/auth-middleware': {},
    '@/lib/email-service': {sendEmail: async () => {sends++; return {success:true, status:'accepted'};}},
  };
  const {isValidPhone} = load('lib/form-validation.ts');
  for (const phone of ['081234567890', '+62 812-3456-7890', '(021) 27881921']) assert(isValidPhone(phone));
  for (const phone of ['', 'vyQfULbqWiPwkbBkdFsxgUmP', '123', '1'.repeat(16), {}, 8123456789, '0812<script>345678']) assert(!isValidPhone(phone));
  const contact = load('app/api/contact/route.ts', mocks).POST;
  const application = load('app/api/applications/route.ts', mocks).POST;
  const fixtures = [
    [contact, 'contact', {name:'Pengunjung', email:'visitor@example.invalid', phone:'081234567890', message:'Informasi pendanaan', website:''}],
    [application, 'application', {namaDebitur:'Pengunjung', email:'visitor@example.invalid', nomorTelepon:'081234567890', nomorHpPasangan:'081234567891', jumlahPinjaman:100000000, persetujuan:true, website:''}],
  ];
  let sequence = 0;
  try {
    for (const [post, action, fixture] of fixtures) {
      const request = data => new NextRequest('https://www.aggrecapital.com/api/' + action, {method:'POST', body:JSON.stringify(data)});
      const submit = (overrides = {}) => post(request({...fixture, turnstileToken:action + (++sequence), ...overrides}));
      const assertBlocked = async (response, status) => {
        assert.equal(response.status, status);
        assert.equal((await response.json()).success, false);
        assert.equal(sends, action === 'contact' ? 0 : 1);
        assert.equal(inserts, 0);
      };
      let before = verifies;
      await assertBlocked(await submit({turnstileToken:''}), 400);
      await assertBlocked(await submit({turnstileToken:'x'.repeat(2049)}), 400);
      await assertBlocked(await submit({website:'spam.example'}), 400);
      await assertBlocked(await submit(action === 'contact' ? {phone:'randomletters'} : {nomorTelepon:'randomletters'}), 400);
      assert.equal(verifies, before, 'obvious spam never reaches Cloudflare');
      await assertBlocked(await post(request(null)), 400);
      await assertBlocked(await post(new NextRequest('https://www.aggrecapital.com/api/test', {method:'POST',body:'{'})), 400);
      delete process.env.TURNSTILE_SECRET_KEY;
      await assertBlocked(await submit(), 503);
      process.env.TURNSTILE_SECRET_KEY = '1x0000000000000000000000000000000AA';
      await assertBlocked(await submit(), 503);
      process.env.TURNSTILE_SECRET_KEY = 'fake-test-secret';
      for (const [scenario, status] of [['rejected',403],['wrong-host',403],['wrong-action',403],['timeout',503],['unavailable',503],['malformed',403]]) {
        mode = scenario;
        await assertBlocked(await submit(), status);
      }
      mode = 'valid';
      const token = action + '-single-use';
      assert.equal((await submit({turnstileToken:token})).status, 200);
      const sendCount = sends, insertCount = inserts;
      assert.equal((await submit({turnstileToken:token})).status, 403);
      assert.equal(sends, sendCount);
      assert.equal(inserts, insertCount);
    }
    assert.equal(sends, 2);
    assert.equal(inserts, 1);
    console.log('PASS: both forms reject spam, invalid phones, missing/replayed tokens, wrong host/action, production test keys, bad JSON and provider failures before email/DB effects.');
    console.log('PASS: valid submissions reach the existing transport/storage once. No real emails, requests or database writes.');
  } finally {
    global.fetch = savedFetch;
    for (const key of Object.keys(process.env)) if (!(key in savedEnv)) delete process.env[key];
    Object.assign(process.env, savedEnv);
  }
}
main().catch(error => {console.error(error);process.exitCode=1;});
