// Exercise browser storage failures without contacting services or changing data.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

const filename = path.resolve(__dirname, "../components/CookieConsent.tsx");
const loaded = new Module(filename);
loaded.paths = module.paths;
loaded.require = (id) => {
  if (id === "lucide-react") return {};
  if (id === "next/link") return () => null;
  if (id === "@/components/ui/button") return { Button: () => null };
  return require(id);
};
loaded._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText, filename);
const { hasConsented, getCookiePreferences, saveCookiePreferences } = loaded.exports;
const necessary = { necessary: true, functional: false, analytics: false, marketing: false };
const previous = Object.fromEntries(["window", "localStorage"].map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
let events = 0;
try {
  delete globalThis.window;
  assert.equal(hasConsented(), false);
  assert.deepEqual(getCookiePreferences(), necessary);
  assert.doesNotThrow(() => saveCookiePreferences(necessary));
  globalThis.window = { dispatchEvent(event) { assert.equal(event.type, "cookiePreferencesUpdated"); events++; } };

  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    get() { throw new DOMException("Storage denied", "SecurityError"); },
  });
  assert.equal(hasConsented(), false, "storage getter denial must not crash mount");
  assert.deepEqual(getCookiePreferences(), necessary);
  assert.doesNotThrow(() => saveCookiePreferences(necessary));
  assert.equal(events, 1);

  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: {
    getItem() { throw new DOMException("Storage denied", "SecurityError"); },
    setItem() { throw new DOMException("Storage full", "QuotaExceededError"); },
  } });
  assert.equal(hasConsented(), false);
  assert.doesNotThrow(() => saveCookiePreferences(necessary));
  assert.equal(events, 2);

  const entries = new Map();
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: {
    getItem(key) { return entries.get(key) ?? null; },
    setItem(key, value) { entries.set(key, value); },
  } });
  assert.equal(hasConsented(), false);
  saveCookiePreferences(necessary);
  assert.equal(hasConsented(), true);
  assert.deepEqual(getCookiePreferences(), necessary);
  assert.equal(events, 3);
  entries.set("aggre_cookie_consent", "invalid json");
  assert.deepEqual(getCookiePreferences(), necessary);
  console.log("PASS: SSR, denied storage getter/read, full storage, normal persistence, preference events, malformed JSON");
} finally {
  for (const [key, descriptor] of Object.entries(previous)) {
    if (descriptor) Object.defineProperty(globalThis, key, descriptor);
    else delete globalThis[key];
  }
}
