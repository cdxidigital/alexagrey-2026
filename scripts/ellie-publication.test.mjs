import test from "node:test";
import assert from "node:assert/strict";
import {
  isCommercialPublicationApproved,
  mayPreviewFullSite,
} from "../src/lib/public-mode.server.ts";

const FLAGS = [
  "ELLIE_CREATOR_RELEASE_APPROVED",
  "ELLIE_ADVERTISING_LEGAL_APPROVED",
  "ELLIE_AGE_ASSURANCE_APPROVED",
  "DATABASE_URL",
];

function withFlags(values, fn) {
  const previous = Object.fromEntries(FLAGS.map((name) => [name, process.env[name]]));
  try {
    for (const name of FLAGS) delete process.env[name];
    for (const [name, value] of Object.entries(values)) process.env[name] = value;
    return fn();
  } finally {
    for (const name of FLAGS) {
      if (previous[name] === undefined) delete process.env[name];
      else process.env[name] = previous[name];
    }
  }
}

test("public advertising is disabled by default", () => {
  withFlags({}, () => assert.equal(isCommercialPublicationApproved(), false));
});

test("publication needs all creator, legal, age and durable DB approvals", () => {
  const all = {
    ELLIE_CREATOR_RELEASE_APPROVED: "true",
    ELLIE_ADVERTISING_LEGAL_APPROVED: "true",
    ELLIE_AGE_ASSURANCE_APPROVED: "true",
    DATABASE_URL: "postgres://example",
  };
  withFlags(all, () => assert.equal(isCommercialPublicationApproved(), true));
  for (const omitted of FLAGS) {
    const incomplete = { ...all };
    delete incomplete[omitted];
    withFlags(incomplete, () => assert.equal(isCommercialPublicationApproved(), false));
  }
});

test("admin preview is closed when the studio preview flag is unset", async () => {
  await withFlags({}, async () => {
    assert.equal(await mayPreviewFullSite(), false);
  });
});
