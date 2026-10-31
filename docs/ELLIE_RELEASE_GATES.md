# Ellie May V2: release and compliance gates

**Status:** draft review implementation; NOT cleared for public commercial launch.

**Branches:** development `cdxi/ellie-may-audit-polish` → review base `v0/ellie-may-polish` in PR #2. Preserve the original approved media files.

## Current behavior

- If any required approval is absent, the public landing page is an editorial holding page: no rates, service catalogue, gallery, or booking form.
- When `ELLIE_ALLOW_STUDIO_PREVIEW=true`, only a staff member with a valid signed HttpOnly studio cookie can view the full draft. This is a review surface, not publication approval. The booking endpoint remains disabled.
- Only when all required creator, legal, age-assurance and database flags pass is the commercial site rendered and enquiry submission enabled server-side.
- An age self-declaration alone does **not** establish adequate age assurance; the sign-off flag must remain disabled until the real gate has been implemented and reviewed.
- Site metadata defaults to `noindex,nofollow,noarchive,nosnippet` pending a separate search/advertising review.

## Required server-side configuration

| Setting | Purpose | Requirement |
|---|---|---|
| `DATABASE_URL` | Persistent Postgres database | Mandatory for Vercel/production. Memory-only PGLite is for local preview, not confidential records |
| `INBOX_ACCESS_CODE` | Studio unlock code | Long, unique, non-default; review and rotate; use restricted environment settings |
| `INBOX_TOKEN_SECRET` | Signs short-lived HttpOnly studio cookies | High-entropy secret, stored outside source control |
| `RATE_LIMIT_HASH_KEY` | HMAC pseudonymisation of rate-limit clients | Recommended distinct high-entropy secret; can fall back to token secret |
| `ELLIE_ALLOW_STUDIO_PREVIEW` | Allow authenticated staff full-site preview | Optional; keep off on public environments unless intentionally reviewed |
| `ELLIE_CREATOR_RELEASE_APPROVED` | Creator authority/asset sign-off | Exact value `true` only after documented approval |
| `ELLIE_ADVERTISING_LEGAL_APPROVED` | Counsel-approved services, placement and jurisdiction policy | Exact value `true` only after documented sign-off for intended audiences and channels |
| `ELLIE_AGE_ASSURANCE_APPROVED` | Verified age-assurance deployment | Exact value `true` only after testing an age-assurance solution appropriate to the actual hosted content |

**Security warning:** these flags are human-controlled release gates, not legal verdicts. They must never be automated from a visitor-entered state/territory field or an unverified IP geolocation guess.

## Booking privacy and security

- The database-backed limiter has per-client and global limits. Client identifiers are HMACs; raw client IPs are not written to the rate-limit table.
- Studio login: five attempts per client per 15 minutes, maximum 120 global attempts per window.
- Public enquiries: three per client per hour, maximum 600 global attempts per window.
- Sensitive server functions send `Cache-Control: no-store`.
- Staff auth is enforced server-side for list and write operations. The studio cookie is signed and HttpOnly.
- The inbox intentionally returns the newest 200 enquiries; pagination and a retention/deletion workflow remain to be built.
- Before live intake, confirm encryption/storage region, privacy notices, access logs, data subject requests, retention/deletion processes, incident reporting ownership and secure backup/restore procedures.

## Legal/creator checks prior to switching on commercial site

1. Obtain documented, current agreement from Ellie May covering each media asset, approved copy, fees, agency work, distribution channels, revocation procedure and any AI/synthetic representation disclosure.
2. Have Australian counsel review the actual offering and advertisement in each relevant state/territory, particularly the difference between public image display, adult-content publishing, escort/service advertising, and agency management. Do not assume one approval applies to every jurisdiction or channel.
3. Decide and test the required age-assurance technology; self-declaration and gallery blur alone are not certification.
4. Confirm platform restrictions (Vercel, CDN, photo hosts, email, payments) and their terms.
5. Publish a privacy notice and contact/escalation paths. Obtain written creator approval for the final production content snapshot.
6. Keep unapproved content, marketing campaigns, paid promotions and enquiry collection disabled.

## Build verification and release sequence

The previous `package-lock.json` pinned vulnerable TanStack Start 1.168.50 and has been removed. The project now requires a **fresh lockfile** for 1.168.61+ with patched `@tanstack/start-server-core` 1.169.39+.

```sh
npm install --package-lock-only --ignore-scripts --no-audit --no-fund
npm ci --ignore-scripts --no-audit --no-fund
npm run typecheck
npm run lint
npm test
npm run build
```

The PR includes an Actions workflow that regenerates the lock, tests and builds, then commits the lock only when every step passes. As of this review, GitHub Actions reported failed jobs **with no runner assigned and no steps executed**, so these checks cannot be marked passed. Verify Actions billing/runner availability and inspect the first job error before enabling that workflow again.

For manual testing, verify anonymous booking RPC denial; authorised studio login; incorrect-code throttling; cross-user denial; cookie HttpOnly/Secure; CSRF same-origin checks; real Postgres persistence through redeployment; media 18+ access; and mobile screen widths from 320px through desktop.

## Rollback

Do not merge this draft until CI and independent browser tests pass. To roll back later, redeploy the last verified commit, disable publication approval flags, and retain booking data and incident evidence. Never run destructive schema cleanups as part of rollback.

## Notes on existing data

The pre-existing `migrations/0003_clear_demo_bookings.sql` deletes three known demonstration email rows. It was not changed in this pass. Do not repurpose it for general data deletion. New migrations must be additive and reviewed against actual data before the first live run.
