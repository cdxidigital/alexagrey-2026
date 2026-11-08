/** Pure, testable policy for all public and studio write endpoints. */
export const RATE_LIMIT_POLICIES = {
  "studio-login": { windowSeconds: 900, perClient: 5, global: 120 },
  "enquiry": { windowSeconds: 3600, perClient: 3, global: 600 },
} as const;

export type RateLimitScope = keyof typeof RATE_LIMIT_POLICIES;

export function exceedsLimit(attempts: number, limit: number): boolean {
  return !Number.isInteger(attempts) || attempts > limit;
}
