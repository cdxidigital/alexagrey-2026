import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AgeGate } from "@/components/age-gate";
import { EditorialPreview } from "@/components/editorial-preview";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Facts } from "@/components/facts";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { Gallery } from "@/components/gallery";
import { Availability } from "@/components/availability";
import { EllieRateCalculator } from "@/components/ellie-rate-calculator";
import { SiteFooter } from "@/components/footer";
import { getPublicationMode } from "@/lib/public-mode";

export const Route = createFileRoute("/")({ component: Home });

const AGE_KEY = "ag-age-ok";

type PublicationMode = {
  fullSite: boolean;
  commercialEnabled: boolean;
  rateCardVisible: boolean;
  rateCardPublished: boolean;
  directContactUrl: string | null;
};

function Home() {
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [mode, setMode] = useState<PublicationMode | null>(null);

  useEffect(() => {
    try {
      setAllowed(sessionStorage.getItem(AGE_KEY) === "1");
    } catch {
      setAllowed(false);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    let active = true;
    void getPublicationMode()
      .then((value) => {
        if (active) setMode(value);
      })
      .catch(() => {
        if (active) setMode({ fullSite: false, commercialEnabled: false, rateCardVisible: false, rateCardPublished: false, directContactUrl: null });
      });
    return () => {
      active = false;
    };
  }, []);

  const enter = () => {
    try {
      sessionStorage.setItem(AGE_KEY, "1");
    } catch {
      // A privacy mode may block session storage; access still lasts only this view.
    }
    setAllowed(true);
  };

  if (!ready) return <div className="min-h-screen bg-ink" />;
  if (!allowed) return <AgeGate onEnter={enter} />;

  if (!mode) {
    return (
      <main className="grid min-h-screen place-items-center bg-ink text-gold-light">
        <p className="label-text">Loading Ellie May…</p>
      </main>
    );
  }

  if (!mode.fullSite) {
    return (
      <EditorialPreview
        showRateEstimator={mode.rateCardVisible}
        estimatorPreviewOnly={!mode.rateCardPublished}
        directContactUrl={mode.directContactUrl}
      />
    );
  }

  return (
    <main id="main-content" className="bg-ink">
      <Navbar />
      <Hero />
      {!mode.commercialEnabled && (
        <div role="status" className="border-y border-gold/20 bg-surface px-6 py-5 text-center text-sm text-gold-light">
          Studio preview only. Commercial publication and booking submission are disabled pending approval.
        </div>
      )}
      <Facts />
      <About />
      <Services />
      <Gallery />
      <Availability />
      {mode.rateCardVisible && (
        <EllieRateCalculator
          previewOnly={!mode.rateCardPublished}
          directContactUrl={mode.directContactUrl}
        />
      )}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-20 text-center">
        <p className="label-text">{mode.commercialEnabled ? "Independent enquiries" : "Studio preview"}</p>
        <h2 className="mt-4 heading-serif text-4xl">
          {mode.commercialEnabled ? "Ellie manages her own enquiries" : "Enquiries are paused"}
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted">
          {mode.commercialEnabled
            ? "All appointments, availability decisions and in-person payments are managed independently by Ellie May. This website does not collect or arrange bookings."
            : "Direct contact information may be published after Ellie May approves the channel and the necessary publication reviews are complete. No appointments or payments are accepted here."}
        </p>
      </section>
      <SiteFooter />
    </main>
  );
}
