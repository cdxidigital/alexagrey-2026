/**
 * Publishing flags are operational approvals, not automatic legal opinions.
 * Keep this policy server-only; absence of any approval fails closed.
 */
export function isCommercialPublicationApproved(): boolean {
  return (
    process.env.ELLIE_CREATOR_RELEASE_APPROVED === "true" &&
    process.env.ELLIE_ADVERTISING_LEGAL_APPROVED === "true" &&
    process.env.ELLIE_AGE_ASSURANCE_APPROVED === "true" &&
    Boolean(process.env.DATABASE_URL?.trim())
  );
}

export async function mayPreviewFullSite(): Promise<boolean> {
  if (isCommercialPublicationApproved()) return true;
  if (process.env.ELLIE_ALLOW_STUDIO_PREVIEW !== "true") return false;
  const { hasInboxAccess } = await import("@/lib/inbox-access.server");
  return hasInboxAccess();
}
