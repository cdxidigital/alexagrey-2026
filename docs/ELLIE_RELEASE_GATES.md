# Ellie May V2: release and compliance gates

**Status:** draft review implementation; NOT cleared for public commercial launch.

**Branches:** development `cdxi/ellie-may-audit-polish` → review base `v0/ellie-may-polish` in PR #2. Preserve the original approved media files.

## Current behavior

- If required publication approvals are absent, the public homepage is a non-commercial editorial landing page. The design uses original media; each image/video still requires content classification and applicable access controls before public release. There are no rates, service catalogue or booking forms on the default public page.
- When `ELLIE_ALLOW_STUDIO_PREVIEW=true`, only a staff member with a valid signed HttpOnly studio cookie can view the full draft. This is a review surface, not publication approval. The booking endpoint remains disabled.
- Only when the required creator, legal, age-assurance and database flags pass may the more detailed informational website render. **In-person booking submission remains blocked on the server regardless of flags,** because fleshsesh is contracted for digital publishing only.
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

## fleshsesh Studio (protected)

The authenticated `/studio` page now presents a read-only readiness board, four operational approval flags and a state/territory review queue. Its source is a protected server function; the page has no action that changes approvals or publishes advertising. `/admin` remains the private enquiry inbox.

**Note:** every jurisdiction entry is a review prompt, not a statement that a state permits a particular offer. Staff must not treat a global environment flag as a substitute for evidence.

## Booking privacy and security

- The database-backed limiter has per-client and global limits. Client identifiers are HMACs; raw client IPs are not written to the rate-limit table.
- Studio login: five attempts per client per 15 minutes, maximum 120 global attempts per window.
- The former public-enquiry rate-limit policy remains in the source for legacy compatibility, but the booking submission endpoint is now disabled before it can process or store appointment requests. This endpoint is not part of the digital-only service.
- Sensitive server functions send `Cache-Control: no-store`.
- Staff auth is enforced server-side for list and write operations. The studio cookie is signed and HttpOnly.
- The inbox intentionally returns the newest 200 enquiries; pagination and a retention/deletion workflow remain to be built.
- The existing inbox holds legacy booking records only, not a newly authorised physical-services intake. Before retention or deletion decisions, confirm lawful requirements and preservation needs. For digital publishing, separately review access logs, profile data, privacy notices, backup/restore and content complaints.

## Legal/creator checks prior to switching on commercial site

1. Obtain a digital-only service agreement from Ellie May covering each asset, approved copy, fees for genuine digital work, distribution channels, revocation, ownership and any AI/synthetic representation disclosure. Exclude in-person bookings, payments, physical rate-setting, recruitment and physical-service commissions.
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

For manual testing, verify **all** anonymous/authenticated booking RPC calls are denied even when publication flags are true; no booking form is mounted; authorised studio login; incorrect-code throttling; cross-user denial; cookie HttpOnly/Secure; CSRF same-origin checks; media 18+ access; and mobile screen widths from 320px through desktop.

## Rollback

Do not merge this draft until CI and independent browser tests pass. To roll back later, redeploy the last verified commit, disable publication approval flags, and retain booking data and incident evidence. Never run destructive schema cleanups as part of rollback.

## Notes on existing data

The pre-existing `migrations/0003_clear_demo_bookings.sql` deletes three known demonstration email rows. It was not changed in this pass. Do not repurpose it for general data deletion. New migrations must be additive and reviewed against actual data before the first live run.
