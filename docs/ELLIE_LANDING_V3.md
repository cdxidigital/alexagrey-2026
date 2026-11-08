# Ellie May | Landing Page V3

## Scope

This update changes only the **public Ellie May homepage and 18+ entry**. The creator-management functionality is outside this design pass.

## Source files

- src/components/editorial-preview.tsx
- src/components/age-gate.tsx
- src/styles.css (scoped ellie-landing and ellie-age CSS)
- src/routes/__root.tsx (editorial page title)

## Creative direction

Warm near-black, plum, champagne and dusty rose with oversized editorial typography. The page moves through: opening hero, introduction, editorial media diary, approach and closing feature.

The authorised original-site assets are retained without replacement:
- public/media/hero.webp (the Grok-watermarked editorial artwork)
- public/media/clip-1.mp4
- public/media/clip-2.mp4
- public/media/clip-3.mp4

Do not describe the Grok-watermarked image as a verified photograph unless its provenance supports that description.

## Interactions and safety

- Acknowledging "18 or older" is a user declaration, **not independent age verification**.
- Gallery video playback is click-initiated; Escape closes the viewer.
- The source includes original artwork; the PR is not a public media-release approval.
- This non-commercial landing does not show rates or service menus or collect enquiries.
- Existing server-side commercial publication safeguards must remain in place.
- Keyboard focus, skip navigation, semantic headings and responsive CSS are included.

## Release checklist

1. Verify asset-specific creator permissions and any required synthetic-media disclosure.
2. Verify advertising/content eligibility across intended Australian states and territories, channels and hosting services.
3. Run React typecheck, lint, unit tests, build and end-to-end browser/media tests on the newest branch head.
4. Test keyboard control, focus, audio/video, screen readers, responsive overflow and slow mobile loading.
5. Keep noindex, the non-commercial holding mode and draft PR until release approvals are recorded.

## Preview scope

The standalone HTML file ellie-may-landing-v3-visual-preview.html is a visual companion for design review, **not a compiled React deployment**. It links the original assets at their public GitHub source. Its browser checks do not prove the full React application is deployable.
