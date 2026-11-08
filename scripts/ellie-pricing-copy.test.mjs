import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");

test("pricing approval changes editorial messaging, never direct booking behaviour", () => {
  const calculator = read("src/components/ellie-rate-calculator.tsx");
  assert.match(calculator, /previewOnly\s*\?/);
  assert.match(calculator, /amounts were recovered from an earlier site/);
  assert.match(calculator, /full price, including any applicable compulsory charges/);
  assert.match(calculator, /Copy enquiry summary/);
  assert.doesNotMatch(calculator, /submitEnquiry|<BookingForm/);
});

test("rate approval remains server-side and independent from physical services", () => {
  const policy = read("src/lib/public-mode.server.ts");
  const scope = read("src/lib/ellie-digital-scope.ts");
  assert.match(policy, /ELLIE_RATE_CARD_APPROVED/);
  assert.match(policy, /ELLIE_ADVERTISING_LEGAL_APPROVED/);
  assert.match(scope, /inPersonBookingByFleshsesh: false/);
  assert.match(scope, /physicalServiceCommissionByFleshsesh: false/);
});
