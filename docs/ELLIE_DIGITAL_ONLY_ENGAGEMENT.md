# Ellie May × fleshsesh: digital-only engagement boundary

**Recorded:** 1 November 2026 (Australia/Perth)  
**Status:** project scope and publication-control specification, not an executed agreement or legal approval.  
**Client:** Ellie May (creator)  
**Digital service provider:** fleshsesh

## Engagement

fleshsesh provides **digital technology, brand publishing and digital-footprint management**, not in-person escort/sex-service agency or booking operations.

### Included, subject to creator approval and legal/channel reviews
- Web design, web hosting, security, maintenance, backups and accessibility.
- Domain, SEO and online-profile setup; publisher access to approved profiles, social media and approved digital marketing campaigns.
- Editing, optimisation and publishing of **creator-authorised** image and video assets in approved formats and channels.
- Digital reputation management, impersonation reporting, account hardening, privacy takedowns and source-content deletion on legitimate requests.
- Analytics in aggregate without collecting sensitive appointment/customer histories.
- Content approval/revocation logs, moderated published-copy changes, incident response and platform policy checks.
- An agreed **fixed fee, project fee or hourly fee for bona fide digital services**; separate documentation for expenses and third-party subscriptions.

### Explicitly excluded
- Taking or arranging in-person appointments, contact screening or customer vetting for physical services.
- Setting or negotiating the creator's physical-service fees, extras, schedules, service menu, location or client decisions.
- Collecting deposits, cash, tips or card payments relating to in-person services.
- Receiving a commission, referral fee or percentage of **physical-service** revenue.
- Recruiting, employing, directing or managing workers in the provision of physical sexual services.
- Managing transport, premises, accommodation, touring logistics or physical safety arrangements.
- Deceptively operating direct messages as if staff were Ellie May.

Ellie May independently controls her real-world activities, whether any physical services are offered, her own communication channels and her client relationships. fleshsesh may publish truthful, creator-approved factual information only where lawful and supported by the destination platform. This digital-only scope **does not itself grant permission** for any advertising.

## Website and API boundaries

- Public editorial page remains non-commercial until media classification, release, publication and platform requirements are cleared.
- If a commercial information page is approved, it may display Ellie May's **own authorised information**, but must not expose a fleshsesh-managed appointment flow.
- The legacy in-person-booking POST endpoint is deliberately locked to reject requests regardless of environment flags; no new booking row is inserted.
- The old `BookingForm` component is not mounted by `src/routes/index.tsx`. Do not re-enable it without a separate project scope change, new legal review and explicit creator decision.
- The contact section says Ellie handles her enquiries herself. No direct contact details or links have been invented. Only add a verified, creator-owned destination with her approval and legal/channel review.
- Historical booking data and private inbox code should be assessed for minimisation, deletion and access controls; retention must be determined rather than assumed. Do not publish or export those records.

## Current legal reading

**WA:** The currently indexed `Prostitution Act 2000`, version `02-d0-00` effective 5 April 2023, contains s9 restrictions on employment-promotion statements and s10 on certain sponsorship arrangements. Section 10(3)(b) distinguishes bona fide contracts for services from a defined financial-arrangement category. The exclusion is not a blanket advertising licence. Check the actual digital contract, payment arrangements, content and audience with qualified WA counsel before promotional sex-service advertising.  
Primary official source: https://www.legislation.wa.gov.au/legislation/statutes.nsf/main_mrtitle_11564_homepage.html

**Commonwealth digital publishing:** determine applicable Online Safety Age-Restricted Material Codes (in force for relevant services by March 2026), classify image/video assets and implement appropriate age access where required, protecting direct file URLs as well as page UI. Self-declaration alone is not adequate for services that must use appropriate age assurance. Use the OAIC 17 March 2026 guidance to minimise identity/biometric data.  
Sources:
- https://www.esafety.gov.au/industry/codes
- https://www.esafety.gov.au/industry/regulatory-guidance
- https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/organisations/age-assurance-technologies-and-privacy-obligations

**Publishing and outreach:** verify every price, service statement, image provenance and availability representation under the Australian Consumer Law, and obtain consent, identify the sender and provide working unsubscribes for any commercial email/SMS distribution.  
Sources:
- https://www.accc.gov.au/consumers/advertising-and-promotions/false-or-misleading-claims
- https://www.acma.gov.au/avoid-sending-spam

**Nationwide scope:** map laws for publisher, creator, destination and channel rather than treating Australia as one advertising jurisdiction. Sex-work agency/worker controls should not be automatically applied to a genuinely digital-only provider, but publication, content, consent, recruitment and specific local restrictions must still be checked. No jurisdiction is deemed cleared by this memo.

## Implementation / QA

- Policy source: `src/lib/ellie-digital-scope.ts` (true digital services; false physical management).
- Runtime gate: `src/lib/bookings.ts` calls `rejectPhysicalBookingIntake()` on every legacy booking attempt.
- Public routes: `src/routes/index.tsx`, `src/components/hero.tsx`, and `src/components/navbar.tsx` remove all booking CTAs and the booking form.
- Regression tests: `scripts/ellie-digital-scope.test.mjs`; run `npm test`, `npm run typecheck`, `npm run lint`, `npm run build` before merging.
- Direct media still requires separate assessment. Current original files are in public `public/media/`; hiding UI cannot secure these URLs.
- Audit events to add for production: creator asset approval, channel approval, content edit, publish/unpublish, takedown, policy version/decision, access revocation, outbound campaign and export.
- Rollback: keep this PR draft and the existing public publishing gates held; revert only to a release that **also rejects in-person booking requests**. Do not silently restore legacy booking intake.

## Scope change trigger
Any future request for staff to manage Ellie May's booking inbox, process or receive physical-service payments, control real-world pricing/schedule, recruit workers, or take commissions is a **different business model**, requiring a new signed scope, separate legal review, technical architecture and consent. A digital-only contract must not be used as a disguise for the excluded functions.
