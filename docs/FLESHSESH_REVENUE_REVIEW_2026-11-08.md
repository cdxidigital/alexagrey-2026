# fleshsesh | Digital footprint revenue review and 30-day pilot
**Decision:** choose an economically sustainable, digital-only managed-web offer for Ellie May and future authorised clients.  
**As-of:** 2026-11-08 · **Currency:** AUD, **GST excluded from illustrative calculations** · **Timezone:** Australia/Perth.  
**Evidence status:** no invoicing/settlement/labour exports supplied. All numerical offers and costs below are **assumptions for pricing experiments**, not realised earnings, historical data or industry averages.

## Revenue accounting boundary
This model includes only **fleshsesh digital consultancy, build and maintenance** revenue. It deliberately excludes Ellie May's in-person rates, visitors' suggested budgets, physical bookings, escort payments or commissions. The adult-site rate estimator is unrelated to fleshsesh revenue.

No existing realised finance bridge can be reconciled:
| Actuals bridge | A$ | Evidence |
|---|---|---|
| Gross digital-service invoices/sales | Unknown | No invoices/settlement export supplied |
| Refunds / disputed digital invoices | Unknown | No refund ledger |
| Card/bank processing fees | Unknown | No provider settlement report |
| Net receipts | Unknown | No matched cash transactions |
| Delivery labour and variable software/hosting | Unknown | No timesheets or cost ledger |
| Contribution before fixed overhead | Not calculable | Insufficient actual inputs |
| Cash flow / retained revenue / churn | Not calculable | No completed monthly cohorts |

### Illustrative, capacity-bounded unit economics
**Modelling assumptions:** loaded delivery labour at A$65/hour; processing reserve at 2% of invoiced digital fee (NOT a verified provider rate); other variable hosting/software expenses stated per offer; client price shown **excluding GST**. Source for these amounts: internal proposal assumptions only.

| Offer | Assumed fee | Included digital hours | Labour @65/h | Tools/hosting | Payment reserve (2%) | Modelled direct cost | Contribution* | Contribution % |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| One-time launch | A$995 | 7 | 455 | 60 | 19.90 | 534.90 | **460.10** | 46.2% |
| Foundation monthly | A$595 | 3 | 195 | 45 | 11.90 | 251.90 | **343.10** | 57.7% |
| Momentum monthly | A$1,195 | 6 | 390 | 90 | 23.90 | 503.90 | **691.10** | 57.8% |

*Contribution = fee − loaded delivery labour − variable tools/hosting − payment reserve. **Not profit**: excludes fixed overhead, taxes, refunds, chargebacks, acquisition, additional approvals, unplanned revisions and founder time not included in loaded hours. If the provider fee is withheld from settlements, record it **once**, not twice.*

### Monthly recurring digital-service scenarios, hypothetical
| Scenario | Foundation accounts | Momentum accounts | Active accounts | MRR | Direct costs | Contribution before fixed costs | Delivery hours |
|---|---:|---:|---:|---:|---:|---:|---:|
| Conservative | 3 | 1 | 4 | 2,980 | 1,259.60 | **1,720.40** | 15 |
| Working case | 8 | 3 | 11 | 8,345 | 3,526.90 | **4,818.10** | 42 |
| Growth stress test | 15 | 6 | 21 | 16,095 | 6,801.90 | **9,293.10** | 81 |

If **illustrative** fixed overhead is A$500/month, remaining amounts are A$1,220.40 / A$4,318.10 / A$8,793.10 **before other excluded costs**, not net profit. These scenarios are not demand or customer forecasts. A 20% delivery-hour overrun would materially reduce contribution: each additional included hour costs an assumed A$65.

## 1 priority intervention: paid digital-footprint diagnostic
**Hypothesis:** a narrowly scoped, creator-controlled paid audit creates qualified digital retainers with less free consulting and clearer delivery economics.

- Eligible: consenting adult creators/businesses who request a digital-only brand/privacy/website audit; no assumptions about sex-work earnings or sensitive traits.
- Proposed offer: **A$395 + GST if applicable**, 2 delivery hours maximum per audit; public rate not approved. Scope: domain and public-footprint assessment, UX/accessibility, profile consistency, ownership/access and actionable technical recommendations. Exclude private browsing/activity histories, booking management, explicit content and representation without permission.
- Illustrative direct costs: A$130 labour + A$20 tooling + A$7.90 payment reserve = A$157.90.
- Illustrative contribution: **A$237.10 per completed audit**, or A$118.55 contribution per included delivery hour, before fixed costs and customer-acquisition cost.
- 30-day pilot: at most 5 eligible paid audits **only if actual capacity is available**, with separate creator consent/terms.
- Primary metric: **contribution per delivered digital audit hour** over 30 days, including edits, correspondence, rework and refunds.
- Secondary: audits converting to approved recurring digital-services contracts; accepted quotes, creator satisfaction and complaint rate. Do not claim causality or calculate LTV from one short cohort.
- Go/no-go target: contribution at least A$100 per delivered hour on complete actual cost data, zero unauthorised content incidents, zero undisclosed physical-service scope drift. This is a decision threshold, not a predicted result.
- Stop rule: any consent/privacy complaint, payment provider disallowance or incomplete scope review; no fake scarcity, undisclosed upsells or emotional-pressure sales.

## Collection schema before a true revenue review
Anonymised digital creator-account ID; service SKU and invoice ID; invoice date/paid date; A$ amount excluding GST; GST separately; refund amount/date; processor fee; attributable digital hours and labour cost; third-party tools/hosting; other fulfilment costs; support/revision hours; acquisition source with consent; optional quotation outcome; month for completed renewal. Deduplicate invoices against settlement records.

**Next finance action:** capture the first actual digital service delivery timesheet and invoice settlement. Only then replace assumptions with realised gross, net receipts, contribution and retention; do not use Ellie May's personal/physical earnings as a proxy.

## Executable modelling evidence
- `scripts/fleshsesh-digital-economics.mjs` expresses the assumed plans, loaded labour, hypothetical processing reserve and contribution bridge.
- `scripts/fleshsesh-digital-economics.test.mjs` has **five passing Node 22 tests** (8 November 2026). Original local files match exact Git blob SHAs `f70a9e35eb145f41116dde040affab62dd12e1f2` and `f67c22e58847be9a1ed41ee73cd00b6f8ed59112`.
- The calculations are verified **as arithmetic under stated assumptions only**, not as a reconciled digital-service income statement.
- Re-run `node --test scripts/fleshsesh-digital-economics.test.mjs` whenever the offers, cost basis, fee reserve or capacity assumptions change.

## Regulatory and platform constraints
- The digital-only arrangement must be genuine, reflected in invoices and actual conduct. WA Prostitution Act 2000 s10(3)(b) distinguishes bona fide services contracts within a sponsorship definition but does not automatically license all advertising. Legal review remains necessary.
- Under ACCC pricing guidance, publicly advertised consumer prices must account for unavoidable taxes/fees and avoid misleading totals; the modelled GST-excluded B2B figures are **internal**, not ready-to-publish consumer prices.
- eSafety Age-Restricted Material Codes took effect for relevant designated internet services on 9 March 2026. Classification and direct-media access remain unresolved.
- Confirm payment/hosting/ad provider permitted-use policies before charging or promoting.
Primary official references: https://www.accc.gov.au/business/pricing/price-displays ; https://www.esafety.gov.au/industry/codes ; https://www.legislation.wa.gov.au/legislation/statutes.nsf/main_mrtitle_11564_homepage.html.
