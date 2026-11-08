-- Security controls for public enquiries and studio access.
-- No raw IP addresses are stored; keys are HMAC digests created server-side.
CREATE TABLE IF NOT EXISTS ellie_rate_limits (
  bucket_key TEXT NOT NULL,
  window_start TIMESTAMPTZ NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0 CHECK (attempts >= 0),
  PRIMARY KEY (bucket_key, window_start)
);
CREATE INDEX IF NOT EXISTS ellie_rate_limits_window_idx
  ON ellie_rate_limits (window_start);
