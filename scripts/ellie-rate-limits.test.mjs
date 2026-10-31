import test from "node:test";
import assert from "node:assert/strict";
import {
  RATE_LIMIT_POLICIES,
  exceedsLimit,
} from "../src/lib/rate-limit-policy.ts";

test("every write endpoint has bounded limits", () => {
  assert.deepEqual(Object.keys(RATE_LIMIT_POLICIES).sort(), [
    "enquiry",
    "studio-login",
  ]);
  for (const policy of Object.values(RATE_LIMIT_POLICIES)) {
    assert.ok(Number.isInteger(policy.windowSeconds));
    assert.ok(policy.windowSeconds >= 60);
    assert.ok(policy.perClient > 0);
    assert.ok(policy.global > policy.perClient);
  }
});

test("rate limit boundary fails closed", () => {
  assert.equal(exceedsLimit(5, 5), false);
  assert.equal(exceedsLimit(6, 5), true);
  assert.equal(exceedsLimit(Number.NaN, 5), true);
  assert.equal(exceedsLimit(Number.POSITIVE_INFINITY, 5), true);
});
