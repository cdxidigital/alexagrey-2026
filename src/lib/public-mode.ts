import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";

/** Only simple booleans are returned; approval configuration stays server-side. */
export const getPublicationMode = createServerFn({ method: "GET" }).handler(
  async () => {
    setResponseHeader("Cache-Control", "no-store");
    setResponseHeader("Vary", "Cookie");
    const { mayPreviewFullSite, isCommercialPublicationApproved } =
      await import("@/lib/public-mode.server");
    return {
      fullSite: await mayPreviewFullSite(),
      commercialEnabled: isCommercialPublicationApproved(),
    };
  },
);
