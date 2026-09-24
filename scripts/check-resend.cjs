// Simulated transport and database only. Never sends email or writes live data.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");
const { NextRequest } = require("next/server");
const root = path.resolve(__dirname, "..");

function load(relative, mocks = {}) {
  const filename = path.join(root, relative),
    mod = new Module(filename);
  mod.filename = filename;
  mod.paths = Module._nodeModulePaths(path.dirname(filename));
  mod.require = (id) => {
    if (id === "server-only") return {};
    if (Object.hasOwn(mocks, id)) return mocks[id];
    if (id.startsWith("@/")) return load(id.slice(2) + ".ts", mocks);
    return require(id);
  };
  mod._compile(
    ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
      },
    }).outputText,
    filename,
  );
  return mod.exports;
}

async function main() {
  const keys = [
    "RESEND_API_KEY",
    "RESEND_FROM_EMAIL",
    "RESEND_REPLY_TO",
    "EMAIL_DISABLED",
  ];
  const before = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  const originalFetch = global.fetch,
    originalError = console.error,
    originalLog = console.log;
  let fetchCalls = [],
    responseMode = "accepted";
  global.fetch = async (url, options) => {
    assert.equal(url, "https://api.resend.com/emails");
    fetchCalls.push(options);
    if (responseMode === "timeout")
      throw new Error("simulated network timeout");
    if (responseMode === "malformed")
      return new Response("{}", { status: 200 });
    if (responseMode === "rejected")
      return new Response(
        JSON.stringify({ message: "simulated private provider message" }),
        { status: 403 },
      );
    return new Response(JSON.stringify({ id: "simulated-email-id" }), {
      status: 200,
    });
  };
  console.error = () => {};
  console.log = () => {};
  try {
    const { sendEmail, getEmailConfiguration } = load("lib/resend-email.ts");
    delete process.env.RESEND_API_KEY;
    delete process.env.RESEND_FROM_EMAIL;
    delete process.env.RESEND_REPLY_TO;
    process.env.EMAIL_DISABLED = "false";
    const options = {
      to: "customer@example.invalid",
      subject: "Konfirmasi",
      html: "<p>Contoh</p>",
      replyTo: "reply@example.invalid",
      idempotencyKey: "application-received/test-1",
    };
    assert.equal((await sendEmail(options)).code, "email_not_configured");
    assert.equal(fetchCalls.length, 0);
    process.env.RESEND_API_KEY = "fake-test-key-not-a-secret";
    process.env.RESEND_FROM_EMAIL = "AGGRE CAPITAL <sender@example.invalid>";
    process.env.RESEND_REPLY_TO = "default@example.invalid";
    const config = getEmailConfiguration();
    assert.equal(config.ready, true);
    assert(!JSON.stringify(config).includes(process.env.RESEND_API_KEY));
    const accepted = await sendEmail(options);
    assert.equal(accepted.status, "accepted");
    assert.equal(accepted.success, true);
    assert.equal(accepted.messageId, "simulated-email-id");
    const payload = JSON.parse(fetchCalls[0].body);
    assert.deepEqual(payload.to, [options.to]);
    assert.equal(Object.hasOwn(payload, "cc"), false);
    assert.equal(payload.from, process.env.RESEND_FROM_EMAIL);
    assert.equal(payload.reply_to, options.replyTo);
    assert.equal(
      fetchCalls[0].headers["Idempotency-Key"],
      options.idempotencyKey,
    );
    assert.equal(
      fetchCalls[0].headers.Authorization,
      "Bearer fake-test-key-not-a-secret",
    );
    process.env.EMAIL_DISABLED = "true";
    assert.equal((await sendEmail(options)).status, "disabled");
    assert.equal(fetchCalls.length, 1);
    process.env.EMAIL_DISABLED = "false";
    assert.equal(
      (await sendEmail({ ...options, to: "invalid" })).code,
      "invalid_recipient",
    );
    assert.equal(fetchCalls.length, 1);
    for (const mode of ["rejected", "timeout", "malformed"]) {
      responseMode = mode;
      const count = fetchCalls.length;
      const result = await sendEmail(options);
      assert.equal(result.success, false);
      assert.equal(result.status, mode === "rejected" ? "failed" : "unknown");
      assert.equal(
        fetchCalls.length,
        count + 1,
        "no automatic SMTP fallback or duplicate attempt",
      );
      assert(!JSON.stringify(result).includes("private provider message"));
    }

    responseMode = "accepted";
    for (const cc of [" copy@example.invalid ", ["copy@example.invalid", " second@example.invalid "]]) {
      const result = await sendEmail({ ...options, cc });
      assert.equal(result.success, true);
      assert.deepEqual(
        JSON.parse(fetchCalls.at(-1).body).cc,
        Array.isArray(cc) ? ["copy@example.invalid", "second@example.invalid"] : ["copy@example.invalid"],
      );
    }
    for (const cc of ["invalid", "copy@example.invalid\r\nBcc: other@example.invalid", ["valid@example.invalid", "invalid"]]) {
      const count = fetchCalls.length;
      assert.equal((await sendEmail({ ...options, cc })).code, "invalid_recipient");
      assert.equal(fetchCalls.length, count, "invalid CC must not reach the provider");
    }

    const contactPost = load("app/api/contact/route.ts").POST;
    const contactRequest = (overrides = {}) => new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "<Visitor>",
        email: "visitor@example.invalid",
        phone: "0800000000",
        message: "Pertanyaan pengunjung <contoh>",
        to: "untrusted@example.invalid",
        cc: "untrusted-cc@example.invalid",
        ...overrides,
      }),
    });
    const contactCount = fetchCalls.length;
    const contactResponse = await contactPost(contactRequest());
    assert.equal(contactResponse.status, 200);
    assert.equal((await contactResponse.json()).success, true);
    assert.equal(fetchCalls.length, contactCount + 1, "contact sends one email with CC");
    const contactPayload = JSON.parse(fetchCalls.at(-1).body);
    assert.deepEqual(contactPayload.to, ["hallo@aggrecapital.com"]);
    assert.deepEqual(contactPayload.cc, ["corp@aggrecapital.com"]);
    assert.equal(contactPayload.reply_to, "visitor@example.invalid");
    assert.equal(contactPayload.from, process.env.RESEND_FROM_EMAIL);
    assert(contactPayload.html.includes("&lt;Visitor&gt;"));
    assert(contactPayload.html.includes("&lt;contoh&gt;"));
    assert.equal((await contactPost(contactRequest({ email: "invalid" }))).status, 400);
    assert.equal(fetchCalls.length, contactCount + 1);
    responseMode = "rejected";
    const contactRejected = await contactPost(contactRequest());
    assert.equal(contactRejected.status, 502);
    assert.equal((await contactRejected.json()).success, false);
    responseMode = "accepted";

    let notification = {
      success: true,
      provider: "resend",
      status: "accepted",
      messageId: "test-id",
    };
    let inserts = 0,
      sends = 0;
    const post = load("app/api/applications/route.ts", {
      "@/lib/database": {
        query: async (sql, values) => {
          assert(sql.includes("INSERT INTO applications"));
          inserts++;
          return {
            rows: [{ id: 1, application_id: values[0], status: "pending" }],
          };
        },
      },
      "@/lib/auth-middleware": {},
      "@/lib/email-service": {
        sendEmail: async (options) => {
          sends++;
          assert.equal(options.to, "customer@example.invalid");
          assert(
            options.idempotencyKey.startsWith("application-received/AGC-"),
          );
          assert(options.html.includes("&lt;Example&gt;"));
          return notification;
        },
      },
    }).POST;
    for (const status of ["accepted", "failed", "disabled", "unknown"]) {
      notification = {
        ...notification,
        status,
        success: status === "accepted",
      };
      const response = await post(
        new NextRequest("http://localhost/api/applications", {
          method: "POST",
          body: JSON.stringify({
            namaDebitur: "<Example>",
            email: "customer@example.invalid",
            jumlahPinjaman: 100000000,
          }),
        }),
      );
      const body = await response.json();
      assert.equal(response.status, 200);
      assert.equal(body.success, true);
      assert(body.data.application_id);
      assert.equal(body.notification.status, status);
    }
    assert.equal(inserts, 4);
    assert.equal(sends, 4);
    const denied = {
      "@/lib/auth-middleware": {
        authenticate: async () => ({ isAuthenticated: false }),
      },
      "@/lib/resend-email": {
        sendEmail: async () => {
          throw new Error("must not send");
        },
      },
    };
    const testRoute = load("app/api/settings/email/test/route.ts", denied);
    assert.equal(
      (
        await testRoute.POST(
          new NextRequest("http://localhost/api/settings/email/test", {
            method: "POST",
          }),
        )
      ).status,
      401,
    );
    let testRecipient;
    const testAllowed = load("app/api/settings/email/test/route.ts", {
      "@/lib/auth-middleware": {
        authenticate: async () => ({
          isAuthenticated: true,
          user: { email: "admin@example.invalid" },
        }),
      },
      "@/lib/resend-email": {
        sendEmail: async (options) => {
          testRecipient = options.to;
          return { success: true, status: "accepted" };
        },
      },
    });
    await testAllowed.POST(
      new NextRequest("http://localhost/api/settings/email/test", {
        method: "POST",
        body: JSON.stringify({ to: "different@example.invalid" }),
      }),
    );
    assert.equal(testRecipient, "admin@example.invalid");
  } finally {
    for (const key of keys)
      before[key] === undefined
        ? delete process.env[key]
        : (process.env[key] = before[key]);
    global.fetch = originalFetch;
    console.error = originalError;
    console.log = originalLog;
  }
  console.log(
    "PASS: Resend payload / reply-to / idempotency, missing config, disabled, rejection, timeout, no secret leakage",
  );
  console.log(
    "PASS: submission stays saved for all notification outcomes; test endpoint requires auth and only sends to account owner",
  );
  console.log("No real emails sent; no database writes.");
  console.log("PASS: contact To/CC cannot be overridden; visitor reply-to, CC validation, and provider rejection handled");
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
