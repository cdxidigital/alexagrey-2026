import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  DURATION_OPTIONS, INTEREST_OPTIONS, estimateInterest,
  formatAUD, buildIndependentEnquiryText,
} from "../src/lib/ellie-rate-estimator.ts";

const read = (file) => readFileSync(new URL("../" + file, import.meta.url), "utf8");
const reviewRates = { "30m": 500, "60m": 800, "120m": 1500, custom: null };

test("amounts are server-only, not embedded in client estimator module", () => {
  assert.deepEqual(DURATION_OPTIONS.map(({ id }) => id), ["30m", "60m", "120m", "custom"]);
  const server = read("src/lib/ellie-rate-card.server.ts");
  assert.match(server, /"30m": 500/);
  assert.match(server, /"60m": 800/);
  assert.match(server, /"120m": 1500/);
  assert.doesNotMatch(read("src/lib/ellie-rate-estimator.ts"), /baseAUD: 500|baseAUD: 800|baseAUD: 1500/);
  const original = read("src/lib/site-data.ts");
  for (const value of ["$500", "$800", "$1,500"]) {
    assert.ok(original.includes(value), "Original site rate missing: " + value);
  }
});

test("duration changes the estimate; interests do not add speculative charges", () => {
  assert.equal(estimateInterest("30m", [], reviewRates).baseAUD, 500);
  assert.equal(estimateInterest("60m", ["social", "dinner"], reviewRates).baseAUD, 800);
  assert.equal(estimateInterest("120m", ["other"], reviewRates).baseAUD, 1500);
  assert.equal(estimateInterest("custom", ["availability"], reviewRates).baseAUD, null);
});

test("unpriced arrangements require confirmation rather than invented rates", () => {
  assert.equal(estimateInterest("60m", ["extended"], reviewRates).customQuote, true);
  assert.equal(estimateInterest("60m", ["other"], reviewRates).customQuote, true);
  assert.equal(estimateInterest("60m", ["dinner"], reviewRates).customQuote, false);
  assert.equal(estimateInterest("custom", [], reviewRates).customQuote, true);
  assert.throws(() => estimateInterest("300m", [], reviewRates), /Unsupported duration/);
  assert.throws(() => estimateInterest("60m", ["explicit"], reviewRates), /Unsupported interest/);
  assert.throws(() => estimateInterest("60m", [], { ...reviewRates, "60m": -100 }), /Invalid rate/);
});

test("AUD and independent enquiry wording are unambiguous", () => {
  assert.equal(formatAUD(800), "A$800");
  assert.equal(formatAUD(1500), "A$1,500");
  assert.throws(() => formatAUD(-1), /Invalid amount/);
  const message = buildIndependentEnquiryText("60m", ["availability", "social"], reviewRates);
  assert.match(message, /Ellie May/);
  assert.match(message, /A\$800/);
  assert.match(message, /not a booking or commitment/);
});

test("calculator is a local copy-only guide, not a platform booking form", () => {
  assert.equal(INTEREST_OPTIONS.length, 6);
  const ui = read("src/components/ellie-rate-calculator.tsx");
  assert.match(ui, /rateTable\[option\.id\]/);
  assert.match(ui, /aria-pressed=\{interests\.includes/);
  assert.match(ui, /Copy enquiry summary/);
  assert.match(ui, /No message is sent or stored here/);
  assert.doesNotMatch(ui, /submitEnquiry|BookingForm|<form|type="submit"/);
});

test("public pricing is suppressed until server-side publication approval", () => {
  const policy = read("src/lib/public-mode.server.ts");
  for (const flag of [
    "ELLIE_RATE_CARD_APPROVED",
    "ELLIE_ADVERTISING_LEGAL_APPROVED",
    "ELLIE_CREATOR_RELEASE_APPROVED",
    "ELLIE_AGE_ASSURANCE_APPROVED",
  ]) assert.ok(policy.includes(flag));
  const serverFn = read("src/lib/public-mode.ts");
  assert.match(serverFn, /rateCardVisible\s*\?/);
  assert.match(serverFn, /ellie-rate-card\.server/);
  assert.match(serverFn, /:\s*null/);
  const route = read("src/routes/index.tsx");
  assert.match(route, /mode\.rateCardVisible/);
  assert.match(route, /mode\.rateTable/);
});
