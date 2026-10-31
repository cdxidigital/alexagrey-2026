import { createHmac } from "node:crypto";
import {
  getRequestIP,
  setResponseHeader,
  setResponseStatus,
} from "@tanstack/react-start/server";
import { getSql, type Sql } from "@/lib/db";
import {
  RATE_LIMIT_POLICIES,
  exceedsLimit,
  type RateLimitScope,
} from "@/lib/rate-limit-policy";

function clientDigest() {
  const secret =
    process.env.RATE_LIMIT_HASH_KEY || process.env.INBOX_TOKEN_SECRET;
  if (!secret && process.env.VERCEL === "1") {
    throw new Error("Rate limiting is not configured.");
  }
  const ip = getRequestIP({ xForwardedFor: true }) || "unknown";
  const key = secret || "local-development-only";
  return createHmac("sha256", key).update(ip).digest("hex");
}

async function consume(
  sql: Sql,
  bucketKey: string,
  windowSeconds: number,
): Promise<number> {
  // Atomic UPSERT prevents parallel requests from bypassing a per-process counter.
  const rows = await sql.query<{ attempts: number }>(
    `INSERT INTO ellie_rate_limits (bucket_key, window_start, attempts)
     VALUES (
       $1,
       to_timestamp(floor(extract(epoch from now()) / $2) * $2),
       1
     )
     ON CONFLICT (bucket_key, window_start)
     DO UPDATE SET attempts = ellie_rate_limits.attempts + 1
     RETURNING attempts`,
    [bucketKey, windowSeconds],
  );
  return Number(rows[0]?.attempts ?? Number.POSITIVE_INFINITY);
}

export async function requireRateLimit(scope: RateLimitScope): Promise<void> {
  const policy = RATE_LIMIT_POLICIES[scope];
  const digest = clientDigest();
  const sql = await getSql();

  const local = await consume(sql, `${scope}:client:${digest}`, policy.windowSeconds);
  const global = await consume(sql, `${scope}:global`, policy.windowSeconds);

  if (exceedsLimit(local, policy.perClient) || exceedsLimit(global, policy.global)) {
    setResponseStatus(429);
    setResponseHeader("Retry-After", String(policy.windowSeconds));
    setResponseHeader("Cache-Control", "no-store");
    throw new Error("Too many requests. Please try again later.");
  }
}
