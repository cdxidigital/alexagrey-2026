# Ellie May V5 | Obsidian & Gold

**Design status:** React source committed to draft PR #2. The associated standalone HTML file is a design review companion, not a deployed production build. Review date: 2026-11-01, AWST.

## Roadmap stage
- Phase 1: original-site review and media inventory — complete.
- Phase 2: landing-page information architecture and mobile layouts — built.
- Phase 3: original-media gallery and multiple-choice duration estimate — built, with pricing behind server-side approvals.
- Phase 4: black-and-gold visual system — V5 implemented on review branch; QA in progress.
- Phase 5: full React CI, e2e accessibility/performance QA and media/access protection — pending.
- Phase 6: legal/creator/channel approvals, launch and monitoring — pending.

## Visual direction
Obsidian and near-black surfaces (#080908, #11120e), champagne and burnished gold accents (#d9b66f, #f2d68d), warm ivory body type (#f2eddf). Metallic treatments are restricted to display type, highlights and primary controls. Body copy uses high-contrast ivory and muted limestone rather than hard-to-read gold.

This is a luxury editorial page rather than a booking directory: monumental Cormorant typography, original authorised portrait and three original videos, fine-gold inset frames, restrained decorative lines, generous section spacing and smooth but non-essential transitions.

## Code changes
- `src/styles/ellie-black-gold-v5.css`: scoped design layer. It affects only Ellie May's public homepage, age entry and rate estimator, not the private fleshsesh Studio.
- `src/routes/index.tsx`: imports the theme.
- `src/routes/__root.tsx`: page title and browser theme colour.
- `src/components/editorial-preview.tsx`: coordinated header and strapline.
- `scripts/ellie-black-gold.test.mjs`: source regression tests.

## Accessibility
- Focus-visible outlines are light-gold against black, at least 44px interactive controls where supported.
- Mobile breakpoints at 630px/940px; stacked hero portrait on phones.
- No forced video autoplay for gallery; native video controls remain.
- Reduced-motion setting disables unnecessary transitions.
- Typography should be checked in a real built app for zoom to 200%, keyboard focus order and screen-reader dialog focus trapping.

## Commercial and safety boundaries
- Fleshsesh manages digital branding/publishing, **not** Ellie May's in-person appointments, rates or payments.
- Draft rate values remain server-side and unpublished unless the required flags pass.
- The standalone preview exposes draft prices for authorised design review **only**, and must not be launched as a publicly indexed pricing page.
- Original media currently remains in the repository public media paths; direct media access cannot be secured by CSS or a visual age disclaimer. Verify content classification, appropriate age-assurance requirements and asset permissions prior to distribution.
- No direct contact URL is invented.

## QA evidence
The V5 standalone HTML design companion passed Playwright interaction checks at 390, 820 and 1440px: duration selection updates A$ figures, interests are multi-select, no DOM JS errors, and document scroll width never exceeds viewport width. Full React CI/deployment QA must still pass independently.
