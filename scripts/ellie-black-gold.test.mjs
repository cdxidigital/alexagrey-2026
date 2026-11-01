import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const css = source("src/styles/ellie-black-gold-v5.css");
const homepage = source("src/routes/index.tsx");
const editorial = source("src/components/editorial-preview.tsx");

test("public homepage imports the independently scoped luxe theme", () => {
  assert.match(homepage, /import "\@\/styles\/ellie-black-gold-v5\.css"/);
  assert.match(css, /\.ellie-landing\s*\{/);
  assert.match(css, /\.ellie-estimator\s*\{/);
  assert.match(css, /\.ellie-age-overlay\s*\{/);
});

test("black-gold palette has deliberate dark, metallic and readable colors", () => {
  for (const color of ["#080908", "#d9b66f", "#f2eddf"]) {
    assert.ok(css.includes(color), "Missing palette color " + color);
  }
  assert.match(css, /background:linear-gradient/);
  assert.match(css, /-webkit-background-clip:text/);
});

test("responsive and accessible interaction states are retained", () => {
  assert.match(css, /max-width:940px/);
  assert.match(css, /max-width:630px/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /focus-visible/);
  assert.match(css, /min-height:0/);
});

test("theme leaves management backend unchanged", () => {
  assert.doesNotMatch(css, /\.studio-|\.admin-|\.fleshsesh-dashboard/);
  assert.match(editorial, /media\.heroImage/);
  assert.match(editorial, /media\.heroVideos\[2\]/);
  assert.match(editorial, /showRateEstimator\s*&&\s*rateTable/);
  assert.doesNotMatch(homepage, /<BookingForm\s*\/>/);
});
