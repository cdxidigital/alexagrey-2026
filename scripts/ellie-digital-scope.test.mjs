import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { ellieDigitalScope, rejectPhysicalBookingIntake } from "../src/lib/ellie-digital-scope.ts";

const source = (name) => readFileSync(new URL("../" + name, import.meta.url), "utf8");

test("fleshsesh is a digital publisher, not a physical-service manager", () => {
  assert.equal(ellieDigitalScope.websiteDesign, true);
  assert.equal(ellieDigitalScope.approvedMediaPublishing, true);
  assert.equal(ellieDigitalScope.creatorDecidesPhysicalServices, true);
  assert.equal(ellieDigitalScope.inPersonBookingByFleshsesh, false);
  assert.equal(ellieDigitalScope.physicalServicePaymentByFleshsesh, false);
  assert.equal(ellieDigitalScope.physicalServiceRateSettingByFleshsesh, false);
  assert.equal(ellieDigitalScope.recruitmentForPhysicalServicesByFleshsesh, false);
  assert.equal(ellieDigitalScope.physicalServiceCommissionByFleshsesh, false);
});

test("legacy booking requests are explicitly rejected", () => {
  assert.throws(() => rejectPhysicalBookingIntake(), /does not accept or arrange appointments/);
  const handler = source("src/lib/bookings.ts");
  assert.match(handler, /rejectPhysicalBookingIntake\(\)/);
  assert.doesNotMatch(handler, /insert into bookings/i);
});

test("public homepage cannot mount the legacy booking form", () => {
  const home = source("src/routes/index.tsx");
  assert.doesNotMatch(home, /<BookingForm\s*\/>/);
  assert.doesNotMatch(home, /import\s+\{\s*BookingForm\s*\}/);
  assert.match(home, /Ellie manages her own enquiries/);
  assert.match(home, /This website does not collect or arrange bookings/);
});

test("navigation leads to independent contact, not fleshsesh-managed bookings", () => {
  const nav = source("src/components/navbar.tsx");
  const hero = source("src/components/hero.tsx");
  assert.doesNotMatch(nav, /go\("#booking"\)/);
  assert.doesNotMatch(hero, /scrollToId\("#booking"\)/);
  assert.match(hero, /scrollToId\("#contact"\)/);
  assert.match(nav, /go\("#contact"\)/);
});

test("commercial publication remains a separately gated legal decision", () => {
  const server = source("src/lib/public-mode.server.ts");
  assert.match(server, /ELLIE_CREATOR_RELEASE_APPROVED/);
  assert.match(server, /ELLIE_ADVERTISING_LEGAL_APPROVED/);
  assert.match(server, /ELLIE_AGE_ASSURANCE_APPROVED/);
});
