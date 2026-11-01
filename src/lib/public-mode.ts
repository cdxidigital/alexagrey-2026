import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";

/** Response includes price figures only after server-side publication or signed-in staff approval. */
export const getPublicationMode = createServerFn({ method: "GET" }).handler(
  async () => {
    setResponseHeader("Cache-Control", "no-store");
    setResponseHeader("Vary", "Cookie");
    const { mayPreviewFullSite, isCommercialPublicationApproved,
      isRateCardPublicationApproved, getApprovedCreatorContactUrl } =
      await import("@/lib/public-mode.server");
    const fullSite = await mayPreviewFullSite();
    const commercialEnabled = isCommercialPublicationApproved();
    const rateCardPublished = isRateCardPublicationApproved();

    // Only a signed-in staff preview can inspect unapproved pricing.
    // Without it, unpublished amounts are never returned to the client UI.
    const reviewOnly = fullSite && !commercialEnabled;
    const rateCardVisible = rateCardPublished || reviewOnly;
    const rateTable = rateCardVisible
      ? (await import("@/lib/ellie-rate-card.server")).getDraftRateTable()
      : null;
    return {
      fullSite,
      commercialEnabled,
      rateCardVisible,
      rateTable,
      rateCardPublished,
      directContactUrl: rateCardPublished ? getApprovedCreatorContactUrl() : null,
    };
  },
);
