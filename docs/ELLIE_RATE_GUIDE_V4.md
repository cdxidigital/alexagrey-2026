# Ellie May | Rates & Interests V4

**Scope:** Public-facing informational rate calculator and creator-owned contact pathway. fleshsesh remains a digital publisher only.  
**Assessment date:** 2026-11-01, Australia/Perth.  
**Release status:** Draft design and code on `cdxi/ellie-may-audit-polish`, not approved for public advertising or production.

## Feature

- Duration buttons: **30 minutes A$500**, **1 hour A$800**, **2 hours A$1,500**, and **longer/custom: contact directly**.
- Figures come from `src/lib/site-data.ts` in the existing Ellie May source. These are **unconfirmed draft values**, not new prices selected by fleshsesh. Reconfirm with Ellie before publication.
- Six non-explicit, multi-select interest prompts: general information; rates & availability; social occasion; dinner/event; extended time; something else. They are message subjects, **not add-on charges** or promises of particular services.
- The estimate is based **only on the chosen duration**. Never automatically multiply the one-hour rate to estimate unpriced 3+ hour arrangements, add sexual extras or invent other fees.
- Changing duration updates the estimate immediately. Custom/extended/other selections prompt a direct quote where appropriate.
- The user can **copy** a short enquiry summary or manually copy it from a read-only textarea. The site stores or sends no enquiry data, and takes no payments or bookings.
- An independently owned HTTPS destination appears as **Contact Ellie directly** only after it is verified, approved and supplied in the server configuration. The message is not transmitted automatically.

## Release safeguards

The published rates appear only when all four server-side values are explicitly `true`:

- `ELLIE_RATE_CARD_APPROVED`: Ellie confirms the current values, variants, applicable fees, GST and service descriptions.
- `ELLIE_CREATOR_RELEASE_APPROVED`: the relevant creator content and use are authorised.
- `ELLIE_ADVERTISING_LEGAL_APPROVED`: qualified review for the actual advertising content, WA nexus and other intended jurisdictions/channels.
- `ELLIE_AGE_ASSURANCE_APPROVED`: the appropriate online age-assurance implementation has been assessed and verified for the content/service category.

These flags represent manual sign-offs and are **not automatic legal conclusions**.

The rates live in `src/lib/ellie-rate-card.server.ts`, a server-only module. `src/lib/public-mode.ts` includes the price table in its response only when authorised public publication or signed-in staff review is active; otherwise `rateTable: null`. A JavaScript bundle or CSS-hidden component must never substitute for server-side withholding of unapproved content. The repository is presently public and contains legacy prices in other source files; repository privacy and complete asset classification require separate review.

For optional direct contact, configure:

- `ELLIE_DIRECT_CONTACT_APPROVED=true` only after Ellie authorises the contact method and destination.
- `ELLIE_DIRECT_CONTACT_URL=https://<creator-owned-approved-channel>` using a real, vetted HTTPS URL. Never invent the channel or accept arbitrary visitor-supplied redirects.

The legacy booking endpoint remains blocked in `src/lib/bookings.ts`, regardless of rate publication flags. The calculator does not call it.

## Required legal checks

- WA `Prostitution Act 2000`, ss9-10: review whether the proposed digital publishing agreement is genuinely a service contract, and whether the particular advertisement is lawful; section 10(3)(b) does not confer blanket advertising permission.
- WA Consumer Protection and ACCC price presentation: verify that any promotional total includes mandatory charges/taxes, avoid misleading prices and distinguish an estimate from a final quote. Figures in this preview exclude unidentified extra costs and therefore **cannot be presented as a final total** without creator verification.
- eSafety Age-Restricted Material Codes: determine actual content classification and applicable age checks, including direct-image/video access; do not treat an 18+ confirmation button as age verification.
- Channel, SEO, social and third-party publisher policies must be reviewed independently before making the price card searchable or using it in campaigns.

Official entry points (verified 2026-11-01):
- https://www.legislation.wa.gov.au/legislation/statutes.nsf/main_mrtitle_11564_homepage.html
- https://www.consumerprotection.wa.gov.au/price-display
- https://www.accc.gov.au/business/pricing/price-displays
- https://www.esafety.gov.au/industry/codes
- https://www.esafety.gov.au/industry/regulatory-guidance

## Source and verification

- `src/lib/ellie-rate-card.server.ts`: source values on the server only.
- `src/lib/ellie-rate-estimator.ts`: price-agnostic calculation and summary formatting logic.
- `src/components/ellie-rate-calculator.tsx`: accessible buttons, interest chips, estimate, copy message, safe direct-link control.
- `src/components/editorial-preview.tsx`: conditional section on the editorial landing.
- `src/routes/index.tsx`: all paths guarded by server-provided approved price data.
- `src/lib/public-mode.ts` / `public-mode.server.ts`: policy and direct contact gating.
- `scripts/ellie-rate-estimator.test.mjs`: regression checks for all durations, interest combinations, invalid values, contact and policy.
- `/mnt/data/ellie-may-rate-interest-preview.html`: interactive standalone visual companion. **Not** the deployed React app.

The standalone preview was visually and functionally tested with Playwright at 390, 820 and 1440 pixel viewports: no overflow, no JS errors, duration switches, custom price fallback and multiple-choice combinations all passed. This is **not** evidence that the compiled React branch passed typecheck or production build. Complete that build and external browser verification before merging.

## Publication and rollback

Do not publicly enable the rate flags or provide creator contact details until reviewed and approved. To immediately withdraw the rate card, set `ELLIE_RATE_CARD_APPROVED=false` (or remove the key), invalidate caches, review existing social snippets and ads, and confirm the public response has `rateTable: null`. No booking or financial records should be created or altered by this section.
