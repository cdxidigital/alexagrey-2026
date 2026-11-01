import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  DURATION_OPTIONS, INTEREST_OPTIONS, estimateInterest,
  formatAUD, buildIndependentEnquiryText,
} from "../src/lib/ellie-rate-estimator.ts";

const read = (file) => readFileSync(new URL("../" + file, import.meta.url), "utf8");

test("draft durations match existing published source exactly, without extrapolating", () => {
  assert.deepEqual(DURATION_OPTIONS.map(({ id, baseAUD }) => [id, baseAUD]), [
    ["30m", 500], ["60m", 800], ["120m", 1500], ["custom", null],
  ]);
  const original = read("src/lib/site-data.ts");
  for (const value of ["$500", "$800", "$1,500"]) {
    assert.ok(original.includes(value), "Rate not found in original data: " + value);
  }
});

test("estimate changes with duration and not with interest choices", () => {
  assert.equal(estimateInterest("30m", []).baseAUD, 500);
  assert.equal(estimateInterest("60m", ["social", "dinner"]).baseAUD, 800);
  assert.equal(estimateInterest("120m", ["other"]).baseAUD, 1500);
  assert.equal(estimateInterest("custom", ["availability"]).baseAUD, null);
});

test("custom requests never create invented surcharges or unsupported hourly multiples", () => {
  assert.equal(estimateInterest("60m", ["extended"]).customQuote, true);
  assert.equal(estimateInterest("60m", ["other"]).customQuote, true);
  assert.equal(estimateInterest("60m", ["dinner"]).customQuote, false);
  assert.equal(estimateInterest("custom", []).customQuote, true);
  assert.throws(() => estimateInterest("300m", []), /Unsupported duration/);
  assert.throws(() => estimateInterest("60m", ["explicit"] ), /Unsupported interest/);
});

test("AUD display and copied message clearly remain non-binding", () => {
  assert.match(formatAUD(1500), /1,500/);
  assert.throws(() => formatAUD(-1), /Invalid amount/);
  const message = buildIndependentEnquiryText("60m", ["availability", "social"]);
  assert.match(message, /Ellie May/);
  assert.match(message, /1 hour/);
  assert.match(message, /800/);
  assert.match(message, /not a booking or commitment/);
  assert.doesNotMatch(message, /fleshsesh will book/i);
});

test("interest IDs are non-explicit and are not priced add-on services", () => {
  assert.equal(INTEREST_OPTIONS.length, 6);
  const ui = read("src/components/ellie-rate-calculator.tsx");
  assert.match(ui, /aria-pressed=\{interests\.includes/);
  assert.match(ui, /Copy enquiry summary/);
  assert.match(ui, /No message is sent or stored here/);
  assert.doesNotMatch(ui, /submitEnquiry|BookingForm|<form|type="submit"/);
});

test("public pricing requires separate rate and publishing approval", () => {
  const policy = read("src/lib/public-mode.server.ts");
  for (const flag of [
    "ELLIE_RATE_CARD_APPROVED",
    "ELLIE_ADVERTISING_LEGAL_APPROVED",
    "ELLIE_CREATOR_RELEASE_APPROVED",
    "ELLIE_AGE_ASSURANCE_APPROVED",
  ]) assert.ok(policy.includes(flag));
  const route = read("src/routes/index.tsx");
  assert.match(route, /mode\.rateCardVisible/);
  assert.match(route, /!mode\.rateCardPublished/);
});
