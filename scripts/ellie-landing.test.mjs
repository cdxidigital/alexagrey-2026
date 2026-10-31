import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const load = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const landing = load("../src/components/editorial-preview.tsx");
const gate = load("../src/components/age-gate.tsx");
const page = load("../src/routes/index.tsx");
const styles = load("../src/styles.css");

test("editorial landing has the full five-section narrative", () => {
  for (const anchor of ['id="home"', 'id="story"', 'id="editorial"', 'id="approach"', 'id="finale"']) {
    assert.ok(landing.includes(anchor), "Missing " + anchor);
  }
  assert.equal((landing.match(/<h1\b/g) ?? []).length, 1, "One primary heading");
});

test("original-site image and all three film assets are retained", () => {
  assert.ok(landing.includes("media.heroImage"));
  for (let i = 0; i < 3; i += 1) {
    assert.ok(landing.includes("media.heroVideos[" + i + "]"), "Missing original film " + (i + 1));
  }
  assert.match(landing, /Reveal original media/);
});

test("non-commercial landing excludes booking and explicit rates", () => {
  assert.doesNotMatch(landing, /BookingForm|Rates|submitEnquiry|durationOptions|pseIncludes|services\.map/);
  assert.match(landing, /No bookings or offers are available/);
  assert.match(page, /if \(!mode\.fullSite\) return <EditorialPreview/);
  assert.match(page, /mode\.commercialEnabled/);
});

test("gallery supports keyboard and accessibility essentials", () => {
  assert.match(landing, /Skip to main content/);
  assert.match(landing, /aria-expanded=\{mobileOpen\}/);
  assert.match(landing, /aria-modal="true"/);
  assert.match(landing, /event\.key === "Escape"/);
  assert.match(landing, /window\.requestAnimationFrame/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
  assert.match(styles, /\.ellie-landing a:focus-visible/);
});

test("18+ entry distinguishes confirmation from verified age assurance", () => {
  assert.match(gate, /not identity or age verification/i);
  assert.match(gate, /I am 18 or older/);
  assert.doesNotMatch(gate, /Legal adult services provided/);
});
