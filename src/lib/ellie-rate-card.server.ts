import type { RateTable } from "@/lib/ellie-rate-estimator";

/**
 * Draft figures recovered from Ellie's previous site (not automatically approved).
 * Never import this module into a client component or a shared bundle.
 * The server function must verify the publishing policy BEFORE returning values.
 */
export function getDraftRateTable(): RateTable {
  return {
    "30m": 500,
    "60m": 800,
    "120m": 1500,
    custom: null,
  };
}
