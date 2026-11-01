import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";

/** Only simple booleans are returned; approval configuration stays server-side. */
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
    return {
      fullSite,
      commercialEnabled,
      rateCardVisible: rateCardPublished || reviewOnly,
      rateCardPublished,
      directContactUrl: rateCardPublished ? getApprovedCreatorContactUrl() : null,
    };
  },
);
