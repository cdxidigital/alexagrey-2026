/**
 * Ellie May | non-graphic creator-monetization catalogue.
 * Digital content and professional brand work, not physical services.
 * Prices/URLs are NOT invented or provided by this module.
 */
export const CREATOR_OFFER_CATALOG = [
  {
    id: "membership",
    eyebrow: "THE INNER CIRCLE",
    title: "Exclusive membership",
    description: "Members-only editorial photos, video updates and behind-the-scenes content.",
    action: "Explore membership",
    configKey: "ELLIE_MEMBERSHIP_URL",
  },
  {
    id: "premium-media",
    eyebrow: "THE PRIVATE COLLECTION",
    title: "Premium photo & film",
    description: "Curated digital photo and video releases on Ellie’s verified creator platform.",
    action: "Explore the collection",
    configKey: "ELLIE_PREMIUM_MEDIA_URL",
  },
  {
    id: "personalised",
    eyebrow: "MADE FOR YOU",
    title: "Digital commissions",
    description: "Personalised digital content enquiries, subject to Ellie’s boundaries and availability.",
    action: "Enquire on her platform",
    configKey: "ELLIE_DIGITAL_COMMISSIONS_URL",
  },
  {
    id: "live",
    eyebrow: "IN REAL TIME",
    title: "Live online",
    description: "Creator-led online streams, virtual fan events and scheduled digital appearances.",
    action: "View live channel",
    configKey: "ELLIE_LIVE_CHANNEL_URL",
  },
  {
    id: "collabs",
    eyebrow: "WORK WITH ELLIE",
    title: "Brand & modelling work",
    description: "Sponsored campaigns, modelling, licensing and creative brand collaborations.",
    action: "Professional enquiries",
    configKey: "ELLIE_BRAND_COLLAB_URL",
  },
  {
    id: "merch",
    eyebrow: "THE EDITION",
    title: "Prints & merchandise",
    description: "Creator-approved prints, collectibles and branded goods when available.",
    action: "Browse the collection",
    configKey: "ELLIE_MERCH_URL",
  },
  {
    id: "affiliate",
    eyebrow: "HER EDIT",
    title: "Selected partnerships",
    description: "Clearly disclosed brand and affiliate recommendations approved by Ellie.",
    action: "Explore collaborations",
    configKey: "ELLIE_AFFILIATE_URL",
  },
] as const;

export type CreatorOfferId = (typeof CREATOR_OFFER_CATALOG)[number]["id"];
export type CreatorOffer = {
  id: CreatorOfferId;
  eyebrow: string;
  title: string;
  description: string;
  action: string;
  url: string | null;
};
