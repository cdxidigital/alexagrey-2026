/**
 * Ellie May's draft rate-card figures, transcribed from the existing site.
 *
 * These are NOT legal/publication approval and are not a booking offer.
 * Only the creator can confirm current rates, extras, availability and total cost.
 * Do not extrapolate a third hour or invent prices for unpriced arrangements.
 */
export const DURATION_OPTIONS = [
  { id: "30m", label: "30 minutes", minutes: 30, baseAUD: 500 },
  { id: "60m", label: "1 hour", minutes: 60, baseAUD: 800 },
  { id: "120m", label: "2 hours", minutes: 120, baseAUD: 1500 },
  { id: "custom", label: "Longer / custom", minutes: null, baseAUD: null },
] as const;

export const INTEREST_OPTIONS = [
  { id: "general", label: "General information" },
  { id: "availability", label: "Rates & availability" },
  { id: "social", label: "Social occasion" },
  { id: "dinner", label: "Dinner / event" },
  { id: "extended", label: "Extended time" },
  { id: "other", label: "Something else" },
] as const;

export type DurationId = (typeof DURATION_OPTIONS)[number]["id"];
export type InterestId = (typeof INTEREST_OPTIONS)[number]["id"];

export function formatAUD(value: number): string {
  if (!Number.isSafeInteger(value) || value < 0) throw new Error("Invalid amount");
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function estimateInterest(
  durationId: DurationId,
  interestIds: readonly InterestId[] = [],
) {
  const duration = DURATION_OPTIONS.find((entry) => entry.id === durationId);
  if (!duration) throw new Error("Unsupported duration");

  const interestSet = new Set(interestIds);
  if (interestIds.some((id) => !INTEREST_OPTIONS.some((entry) => entry.id === id))) {
    throw new Error("Unsupported interest");
  }

  const selection = INTEREST_OPTIONS.filter((option) => interestSet.has(option.id));
  const customQuote = duration.baseAUD === null ||
    interestSet.has("extended") ||
    interestSet.has("other");

  return {
    duration: duration.label,
    baseAUD: duration.baseAUD,
    interests: selection.map((option) => option.label),
    customQuote,
  };
}

export function buildIndependentEnquiryText(
  durationId: DurationId,
  interestIds: readonly InterestId[],
): string {
  const quote = estimateInterest(durationId, interestIds);
  const amount = quote.baseAUD === null ? "Please quote directly" : formatAUD(quote.baseAUD);
  return [
    "Hello Ellie May,",
    "",
    "I would like to enquire with you directly about:",
    "Preferred duration: " + quote.duration,
    "Interests: " + (quote.interests.length ? quote.interests.join(", ") : "General enquiry"),
    "Indicative duration-only estimate: " + amount,
    quote.customQuote ? "Custom requirements may need a separate quote." : "",
    "",
    "I understand this is only an estimate and not a booking or commitment.",
    "Please confirm your own current rates and availability directly.",
  ].filter(Boolean).join("\n");
}
