import { Link } from "@tanstack/react-router";

/** Public-safe holding experience while creator/legal/age approvals are pending. */
export function EditorialPreview() {
  return (
    <main id="main-content" className="relative isolate flex min-h-screen flex-col overflow-hidden bg-ink text-cream">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_68%_18%,#9e783122,transparent_48%),radial-gradient(ellipse_at_12%_85%,#4a243d33,transparent_58%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-28 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <header className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-7 md:px-10">
        <span className="font-serif text-2xl tracking-[0.13em] text-gold-light">Ellie May</span>
        <span className="rounded-full border border-gold/25 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-gold-light">Private preview</span>
      </header>
      <section className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-16 md:px-10">
        <p className="label-text text-gold-light">An editorial world in progress</p>
        <h1 className="mt-7 max-w-4xl font-serif text-[clamp(5rem,12vw,11rem)] font-light leading-[0.82] tracking-[-0.045em] text-gold">
          Ellie <span className="italic text-cream">May.</span>
        </h1>
        <p className="mt-10 max-w-xl text-base leading-8 text-cream/75 md:text-lg">
          A thoughtfully crafted, creator-led digital home. This preview is not accepting bookings or displaying commercial offers while publication reviews are completed.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <span className="rounded-full border border-gold/35 px-5 py-3 text-xs uppercase tracking-[0.18em] text-gold-light">Australian editorial concept</span>
          <span className="text-xs tracking-[0.16em] text-muted">18+ audience</span>
        </div>
      </section>
      <footer className="relative mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-gold/15 px-6 py-7 text-xs text-muted md:px-10">
        <span>© {new Date().getFullYear()} Ellie May. All rights reserved.</span>
        <Link to="/login" className="text-gold-light underline-offset-4 hover:underline">Studio access</Link>
      </footer>
    </main>
  );
}
