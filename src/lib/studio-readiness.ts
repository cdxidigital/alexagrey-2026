import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";

export const getStudioReadiness = createServerFn({ method: "POST" }).handler(
  async () => {
    const { assertInboxAccess } = await import("@/lib/inbox-access.server");
    assertInboxAccess();
    setResponseHeader("Cache-Control", "no-store");
    setResponseHeader("Vary", "Cookie");
    const { isCommercialPublicationApproved } =
      await import("@/lib/public-mode.server");
    return {
      creator: process.env.ELLIE_CREATOR_RELEASE_APPROVED === "true",
      legal: process.env.ELLIE_ADVERTISING_LEGAL_APPROVED === "true",
      ageAssurance: process.env.ELLIE_AGE_ASSURANCE_APPROVED === "true",
      persistentStorage: Boolean(process.env.DATABASE_URL?.trim()),
      publicationEnabled: isCommercialPublicationApproved(),
    };
  },
);
