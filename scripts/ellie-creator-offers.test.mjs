import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { CREATOR_OFFER_CATALOG } from "../src/lib/ellie-creator-offer-catalog.ts";

const get = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("catalogue covers adult influencer and model DIGITAL earning categories", () => {
  assert.deepEqual(CREATOR_OFFER_CATALOG.map((offer) => offer.id), [
    "membership", "premium-media", "personalised", "live", "tips", "collabs", "merch", "affiliate",
  ]);
  for (const offer of CREATOR_OFFER_CATALOG) {
    assert.ok(offer.title && offer.description && offer.action && offer.configKey);
    assert.doesNotMatch(offer.title+" "+offer.description, /in-person bookings|escort appointments|physical-service commission/);
  }
});

test("creator paid platforms and links are never fabricated in client catalogue", () => {
  const catalog = get("src/lib/ellie-creator-offer-catalog.ts");
  assert.doesNotMatch(catalog, /https:\/\/|A\$[0-9]/);
  const server = get("src/lib/ellie-creator-offers.server.ts");
  assert.match(server, /ELLIE_CREATOR_OFFERS_APPROVED/);
  assert.match(server, /ELLIE_ADVERTISING_LEGAL_APPROVED/);
  assert.match(server, /ELLIE_AGE_ASSURANCE_APPROVED/);
  assert.match(server, /approvedHttpsUrl/);
  assert.match(server, /return \{ published: false, offers: \[\] \}/);
  assert.match(server, /offers\.filter\(\(item\) => item\.url\)/);
});

test("public CTA exists only for verified creator-controlled channels", () => {
  const card = get("src/components/ellie-creator-offers.tsx");
  assert.match(card, /offer\.url && !previewOnly/);
  assert.match(card, /rel="noopener noreferrer nofollow"/);
  assert.match(card, /referrerPolicy="no-referrer"/);
  assert.match(card, /Pending creator approval/);
  assert.doesNotMatch(card, /<form|submitEnquiry|checkout|processPayment/);
});

test("creator offers appear on public landing only after server-driven publishing decision", () => {
  const route = get("src/routes/index.tsx");
  const client = get("src/lib/public-mode.ts");
  const editorial = get("src/components/editorial-preview.tsx");
  assert.match(route, /creatorOffers: CreatorOffer\[\]/);
  assert.match(route, /creatorOffers=\{mode\.creatorOffers\}/);
  assert.match(client, /listCreatorOfferLinks\(reviewOnly\)/);
  assert.match(editorial, /<EllieCreatorOffers offers=\{creatorOffers\}/);
});

test("unconfirmed legacy time-based amounts cannot be marketed as modelling rates", () => {
  const server = get("src/lib/public-mode.server.ts");
  assert.match(server, /ELLIE_RATE_SCOPE_CONFIRMED === "digital_modelling_only"/);
  assert.doesNotMatch(get("src/lib/ellie-creator-offer-catalog.ts"), /30 minutes|1 hour|2 hours/);
});
