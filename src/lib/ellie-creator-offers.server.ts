import {
  CREATOR_OFFER_CATALOG,
  type CreatorOffer,
} from "@/lib/ellie-creator-offer-catalog";

/** Fail closed. Explicit approval never substitutes for Australian legal review. */
export function isCreatorMonetizationApproved(): boolean {
  return (
    process.env.ELLIE_CREATOR_OFFERS_APPROVED === "true" &&
    process.env.ELLIE_CREATOR_RELEASE_APPROVED === "true" &&
    process.env.ELLIE_ADVERTISING_LEGAL_APPROVED === "true" &&
    process.env.ELLIE_AGE_ASSURANCE_APPROVED === "true"
  );
}

function approvedHttpsUrl(raw: string | undefined): string | null {
  if (!raw?.trim()) return null;
  try {
    const parsed = new URL(raw);
    if (
      parsed.protocol !== "https:" ||
      parsed.username ||
      parsed.password ||
      parsed.hostname === "localhost" ||
      /^127\./.test(parsed.hostname) ||
      /^10\./.test(parsed.hostname) ||
      /^192\.168\./.test(parsed.hostname) ||
      parsed.hostname.endsWith(".local")
    ) return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

/** Published links must be creator-approved platform URLs in environment settings. */
export function listCreatorOfferLinks(staffPreview: boolean): {
  published: boolean;
  offers: CreatorOffer[];
} {
  const published = isCreatorMonetizationApproved();
  if (!published && !staffPreview) return { published: false, offers: [] };

  const offers: CreatorOffer[] = CREATOR_OFFER_CATALOG.map((item) => ({
    id: item.id,
    eyebrow: item.eyebrow,
    title: item.title,
    description: item.description,
    action: item.action,
    url: published ? approvedHttpsUrl(process.env[item.configKey]) : null,
  }));

  // Only show public offerings that have a real, approved external destination.
  return { published, offers: published ? offers.filter((item) => item.url) : offers };
}
