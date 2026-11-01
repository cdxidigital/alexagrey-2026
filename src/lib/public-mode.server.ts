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

/**
 * Rate display is a distinct digital-publishing approval, not permission for
 * fleshsesh to arrange, accept or receive payment for physical appointments.
 * Unknown or missing flags keep public pricing out of HTML.
 */
export function isRateCardPublicationApproved(): boolean {
  return (
    process.env.ELLIE_RATE_CARD_APPROVED === "true" &&
    process.env.ELLIE_CREATOR_RELEASE_APPROVED === "true" &&
    process.env.ELLIE_ADVERTISING_LEGAL_APPROVED === "true" &&
    process.env.ELLIE_AGE_ASSURANCE_APPROVED === "true"
  );
}

/** Only a verified creator-owned HTTPS destination may be published. */
export function getApprovedCreatorContactUrl(): string | null {
  if (process.env.ELLIE_DIRECT_CONTACT_APPROVED !== "true") return null;
  const value = process.env.ELLIE_DIRECT_CONTACT_URL?.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password) return null;
    return url.toString();
  } catch {
    return null;
  }
}
