# Ellie May | Adult creator revenue architecture
**Target website:** https://alexagrey.fleshsesh.fans/  
**As of:** 8 November 2026 AWST  
**Status:** Creator-offer strategy and source-code prototype; live domain and its publishing pipeline NOT verified.

## Corrected business context
Ellie May (previously branded Alexa Grey) is an **adult influencer and model**. Revenue opportunities must support her creative work, online audience, intellectual property and creator-controlled professional partnerships. **fleshsesh is a digital brand/publishing service provider** and does not control real-world activity, personal appointments or payment for in-person services.

The earlier B2B website-maintenance revenue model remains a separate internal **fleshsesh services** analysis. It is **not Ellie's creator income strategy** and must not be used to forecast her subscription revenue.

## Priority revenue channels

| Offer | Creator value | Website action | Fulfilment |
|---|---|---|---|
| Exclusive membership | Predictable content access revenue, subject to renewal and churn | Verified subscription link | Creator's approved adult membership platform |
| Premium photos/films | Incremental digital releases and curated sets | Approved pay-per-view/media collection link | Third-party permitted platform |
| Personalised digital commissions | Higher-value content requests within explicit creator boundaries | Creator-platform commission enquiry | Creator approves scope, quote, refunds and delivery |
| Live online content | Fan engagement and virtual events | Verified live channel | Creator's approved streaming platform |
| Tips and fan support | Voluntary audience support | Verified creator-owned tip link | Approved platform handling payments and refunds |
| Brand/model campaigns | Sponsored posts, commercial modelling, usage rights | Professional collaboration channel | Creator independently quotes and controls work |
| Merchandise/prints | Content/IP-based physical and digital merchandise | Approved storefront | Merch partner with permitted-use policy |
| Affiliate partnerships | Product recommendations and tracked commissions | Approved disclosed affiliate link | Eligible affiliate programme, with transparent disclosure |

**Proposed** categories, not claims that Ellie has activated accounts, accepts all requests or offers any specific item.

## On-page order
1. Black & gold creator identity and original authorised media.
2. **Primary CTA:** verified creator-owned subscription destination *only when approved*.
3. "Step inside her world" digital offer cards for available approved options.
4. Brand and modelling collaboration enquiry information, without inventing hourly rates.
5. Optional media-gallery teaser and genuine independently operated links.
6. Creator privacy/contact policies, disclosures and appropriate age assurance.

A review mode may show planned cards with **no click-through**; public output includes **only cards with verified, creator-approved HTTPS destinations**. Never invent fan counts, pricing, earnings, platform badges or testimonials.

## Revenue analytics (only with lawful, authorised data)
For each approved creator platform: record month, currency, net subscriber receipts, content sales, tips, digital commission receipts, refunds, chargebacks, platform fee, production hours and direct production costs. Keep taxes and platform payout timing separate; do not add pending sales to settled cash.

**Accounting bridge:** creator gross recognised digital sales − refunds − platform fee/payment deductions = net creator receipts; − paid production and fulfilment variable costs = creator contribution before tax/fixed overhead. Avoid treating gross fan spend or estimated likes as profits.

**Illustrative only:** 100 eligible subscribers × A$18 monthly price = A$1,800 gross. An assumed platform 20% fee leaves A$1,440 before chargebacks, refunds, exchange rates, taxes and production costs. This is **not** a forecast of Ellie’s earnings. Fansly's 2026 official terms state an 80% creator share, but the example is NOT evidence that Ellie uses Fansly.

## Single recommended first test
*Eligible audience:* consenting adult users of an approved external platform, no invasive cross-platform tracking.
*Intervention:* compare two approved landing-page CTA messages for the **same verified membership offer** (e.g. "Explore membership" vs "See exclusive updates"), preserving the same destination.
*Unit:* eligible adult landing session, assigned once within privacy-consistent measurement.
*Primary metric:* settled contribution per attributable eligible visit if actual verified conversions/fee records are available; otherwise outbound click-through is an **interest proxy**, not revenue.
*Window:* one complete monthly subscription renewal cycle plus a pre-defined analysis period.
*Safeguards:* no fake urgency/scarcity, no deceptive intimacy, no unapproved adult media, no undisclosed tracking and no purchase required to view the public editorial page. Stop on consent complaint, platform suspension or misleading-claims issue.

## Legal and channel restrictions
- Australia's mandatory Age-Restricted Material Codes apply from relevant 2025/2026 dates; site risk tier and direct asset accessibility must be assessed before publishing age-restricted material. An "I am 18" button alone does not suffice where appropriate age assurance is mandatory.
- Creator/model identity, media rights, likeness and all participants' adulthood/consent must be evidenced in restricted records. AI-labelled source visuals may require disclosure and must not be misrepresented as genuine photographs.
- Sponsored, gifted and affiliate content requires clear disclosure. Consumer price claims must be accurate; prices must include applicable non-optional charges.
- Before links go public: obtain creator-owned account URLs, verify permitted content and payouts in each destination provider's latest terms, and record the creator's platform account authority.
- No adult fan checkout, private-message processing, payment intake or subscriptions are run directly by the website unless a separate fully reviewed platform is commissioned.

Official references:
- https://www.esafety.gov.au/industry/codes
- https://www.esafety.gov.au/industry/codes/faq-access-to-online-porn-and-other-adult-content
- https://www.accc.gov.au/business/advertising-and-promotions/social-media-promotions
- https://fansly.com/tos (effective 21 July 2026; creator 80% share)

## Source and host confirmation
New review-branch source:
- `src/lib/ellie-creator-offer-catalog.ts`
- `src/lib/ellie-creator-offers.server.ts`
- `src/components/ellie-creator-offers.tsx`
- `src/styles/ellie-creator-offers.css`
- `src/lib/public-mode.ts`, `src/routes/index.tsx`, `src/components/editorial-preview.tsx`
- `scripts/ellie-creator-offers.test.mjs`

**Host mapping unresolved:** `alexagrey.fleshsesh.fans` could not be fetched or mapped to a connected Vercel project: direct URL returned an accessibility error, and Vercel denied access to `fleshsesh.fans` in every connected account. Existing Vercel `model001`, `alexagrey` and `ellie-may-editorial-preview` projects are not confirmed as this custom domain. **Do not deploy, alias, overwrite or route traffic until the canonical host/repository is confirmed.** No changes have been deployed to the named domain by this work.

## Rate calculator scope
Existing A$500/800/1,500 time rates were transcribed from an earlier site, but no evidence establishes that they are **professional modelling fees**. They are **not** used to price adult influencer subscriptions or custom digital content. The public rate-card gate now additionally requires `ELLIE_RATE_SCOPE_CONFIRMED=digital_modelling_only`, plus separate creator rate and legal publication approvals. Professional collaborations should default to "quote from Ellie" until rates and usage rights are confirmed.
