/**
 * Pure, price-agnostic logic for independently prepared enquiries.
 *
 * Actual amounts are supplied by an authenticated/publishing-approved server
 * response, never hard-coded into the public client-side bundle.
 */
export const DURATION_OPTIONS = [
  { id: "30m", label: "30 minutes" },
  { id: "60m", label: "1 hour" },
  { id: "120m", label: "2 hours" },
  { id: "custom", label: "Longer / custom" },
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
export type RateTable = Record<DurationId, number | null>;

export function formatAUD(value: number): string {
  if (!Number.isSafeInteger(value) || value < 0) throw new Error("Invalid amount");
  return "A" + new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function estimateInterest(
  durationId: DurationId,
  interestIds: readonly InterestId[],
  rateTable: RateTable,
) {
  const duration = DURATION_OPTIONS.find((entry) => entry.id === durationId);
  if (!duration) throw new Error("Unsupported duration");
  if (interestIds.some((id) => !INTEREST_OPTIONS.some((entry) => entry.id === id))) {
    throw new Error("Unsupported interest");
  }
  const amount = rateTable[durationId];
  if (amount !== null && (!Number.isSafeInteger(amount) || amount < 0)) {
    throw new Error("Invalid rate");
  }
  const selection = new Set(interestIds);
  return {
    duration: duration.label,
    baseAUD: amount,
    interests: INTEREST_OPTIONS.filter((option) => selection.has(option.id)).map((option) => option.label),
    customQuote: amount === null || selection.has("extended") || selection.has("other"),
  };
}

export function buildIndependentEnquiryText(
  durationId: DurationId,
  interestIds: readonly InterestId[],
  rateTable: RateTable,
): string {
  const quote = estimateInterest(durationId, interestIds, rateTable);
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
