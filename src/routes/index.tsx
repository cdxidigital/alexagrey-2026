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
import { Rates } from "@/components/rates";
import { BookingForm } from "@/components/booking-form";
import { SiteFooter } from "@/components/footer";
import { getPublicationMode } from "@/lib/public-mode";

export const Route = createFileRoute("/")({ component: Home });

const AGE_KEY = "ag-age-ok";

type PublicationMode = {
  fullSite: boolean;
  commercialEnabled: boolean;
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
        if (active) setMode({ fullSite: false, commercialEnabled: false });
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

  if (!mode.fullSite) return <EditorialPreview />;

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
      <Rates />
      {mode.commercialEnabled ? (
        <BookingForm />
      ) : (
        <section id="booking" className="mx-auto max-w-7xl px-6 py-20 text-center">
          <p className="label-text">Studio preview</p>
          <h2 className="mt-4 heading-serif text-4xl">Enquiries are paused</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted">
            The enquiry form becomes available only after creator, legal, and age-assurance sign-off.
          </p>
        </section>
      )}
      <SiteFooter />
    </main>
  );
}
