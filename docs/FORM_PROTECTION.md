# Public form protection

Contact (`POST /api/contact`) and funding applications (`POST /api/applications`) use a managed Cloudflare Turnstile widget, a honeypot, and phone validation. The existing database schema, application storage, and email destinations are unchanged.

## Server enforcement

- Cloudflare Siteverify is called before sending mail or inserting an application. Tokens must succeed and match both the expected action (`contact` or `application`) and an explicitly allowed hostname.
- Missing, expired, reused, or forged tokens are rejected. Verification outages fail closed with a retryable message; user input stays in the form.
- The browser refreshes verification after each submission attempt. Cloudflare refreshes expired tokens, which matters for the longer application form.
- Phone numbers allow common formatting and 8–15 digits. This checks format, not ownership. Names are not filtered with unreliable randomness heuristics.
- The honeypot is hidden and excluded from keyboard navigation. A populated trap is rejected, without sending an email.
- Contact mail remains To `hallo@aggrecapital.com`, CC `corp@aggrecapital.com`, Reply-To the visitor. Application confirmation still goes to the applicant only after saving.

## Environment

Configure all three before deploying:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public widget identifier, built into client JS |
| `TURNSTILE_SECRET_KEY` | Server-only verification credential; store as Vercel Secret |
| `TURNSTILE_ALLOWED_HOSTNAMES` | Exact comma-separated allowlist: `aggrecapital.com,www.aggrecapital.com` |

The Cloudflare widget is named `AGGRE CAPITAL public forms` in the existing Cloudflare account. Managed mode is enabled; pre-clearance is disabled. The widget allows `aggrecapital.com` (Cloudflare also allows its subdomains), while the server allowlist is limited to the two public website hosts above.

Production configuration was added through Vercel CLI, without pulling or changing production database/email variables. Production rejects Cloudflare's public testing keys. Do not put secrets in Git.

Localhost and preview deployment domains are intentionally not authorized by the production widget. For local UI testing use separate Cloudflare testing keys and an explicit local test configuration. Never deploy testing keys to production. An unconfigured environment displays a contact fallback and does not silently bypass verification.

## Vercel Firewall

The project-level rule `AGGRE public form rate limit` limits POSTs to exactly `/api/contact` or `/api/applications`, with a shared per-IP budget of **3 requests per 600-second fixed window**. Excess requests receive HTTP 429. The UI handles Vercel's non-JSON 429 response. Limits count unsuccessful attempts too; shared office/network IPs share the budget. Vercel counters are regional, not a globally transactional quota.

GET requests, crawlers, sitemap/robots, login, dashboard, and other APIs are outside this custom rule. Turnstile supplements the rate limit; neither guarantees all spam will disappear.

An older unpublished draft requested a site-wide bot challenge. Its original configuration was saved locally in `.vercel/firewall-draft-before-antispam.json` before configuring the form-only protection. That change remains unpublished in Vercel; the active configuration has only the form rate-limit rule and no site-wide bot challenge. Do not publish that old challenge as part of routine form changes.

## Verification

- `node scripts/check-form-protection.cjs`: mocked Siteverify, transport, and DB. Exercises both routes, phone formats, honeypot, missing/oversized/replayed tokens, wrong hostname/action, invalid JSON, missing configuration, production testing-key rejection, and provider failures. Asserts that rejected traffic causes no email or DB writes.
- `node scripts/check-resend.cjs`: isolated transport regression coverage, including fixed To/CC, Reply-To, and handling notification failures after a saved application.
- `npm run build`: lint, types, and production build.

Production smoke checks must only submit invalid requests that cannot send mail or save applications. Do not submit a valid funding application as a test against the production database.
