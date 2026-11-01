import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2, CircleAlert, Globe2, LockKeyhole, RefreshCw, ShieldCheck } from "lucide-react";
import { getStudioReadiness } from "@/lib/studio-readiness";

type Readiness = {
  creator: boolean;
  legal: boolean;
  ageAssurance: boolean;
  persistentStorage: boolean;
  publicationEnabled: boolean;
};

const JURISDICTIONS = [
  ["WA", "Western Australia"],
  ["NSW", "New South Wales"],
  ["VIC", "Victoria"],
  ["QLD", "Queensland"],
  ["SA", "South Australia"],
  ["TAS", "Tasmania"],
  ["ACT", "Australian Capital Territory"],
  ["NT", "Northern Territory"],
] as const;

const CONTROLS: { key: keyof Omit<Readiness, "publicationEnabled">; label: string; help: string }[] = [
  { key: "creator", label: "Creator release", help: "Media rights and approved publication scope" },
  { key: "legal", label: "Advertising/legal review", help: "Jurisdictions, services, channel and copy sign-off" },
  { key: "ageAssurance", label: "Age-assurance review", help: "Real age safeguards, not a self-declaration button" },
  { key: "persistentStorage", label: "Durable data storage", help: "A configured persistent Postgres database" },
];

export function StudioDashboard() {
  const [status, setStatus] = useState<Readiness | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    setError("");
    try {
      setStatus(await getStudioReadiness());
    } catch {
      setStatus(null);
      setError("Studio readiness could not be loaded. Check your access and connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const completed = status ? CONTROLS.filter((item) => status[item.key]).length : 0;

  return (
    <main className="min-h-screen bg-ink text-cream">
      <header className="border-b border-gold/15 bg-surface/70">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-6 md:px-10">
          <div>
            <p className="label-text text-gold-light">fleshsesh / creator operations</p>
            <h1 className="mt-2 font-serif text-3xl font-light text-cream">Ellie May <span className="italic text-gold-light">Studio.</span></h1>
          </div>
          <nav aria-label="Studio navigation" className="flex flex-wrap items-center gap-4 text-sm">
            <Link to="/admin" className="text-gold-light hover:underline">Enquiry inbox</Link>
            <Link to="/" className="text-muted hover:text-cream">View site</Link>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="label-text">Release control</p>
            <h2 className="mt-3 font-serif text-4xl font-light text-cream md:text-6xl">Publication readiness</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">These statuses reflect secure configuration flags, not certificates or legal opinions. Actual signed evidence and jurisdiction review remain mandatory.</p>
          </div>
          <button type="button" onClick={() => void refresh()} disabled={loading} className="btn-ghost" aria-label="Refresh studio status">
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>
        {error && <p role="alert" className="mt-6 rounded-xl border border-danger/30 px-4 py-3 text-sm text-danger">{error}</p>}
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <section aria-label="Release checklist" className="rounded-[1.6rem] border border-gold/20 bg-surface/70 p-6 md:p-9">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="font-serif text-3xl">Required approvals</h3>
              <span className="rounded-full border border-gold/30 px-4 py-2 text-xs text-gold-light">
                {status ? `${completed} / 4 recorded` : "Checking…"}
              </span>
            </div>
            <div className="mt-7 divide-y divide-gold/15">
              {CONTROLS.map((item) => {
                const good = status?.[item.key] ?? false;
                return (
                  <div key={item.key} className="flex items-start gap-4 py-5">
                    {good ? <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-gold-light" /> : <CircleAlert size={22} className="mt-0.5 shrink-0 text-muted" />}
                    <div>
                      <p className="font-medium text-cream">{item.label}</p>
                      <p className="mt-1 text-sm leading-6 text-muted">{item.help}</p>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.15em] text-gold-light">{good ? "Flag recorded, evidence still required" : "Not recorded"}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          <aside className="flex flex-col justify-between gap-6 rounded-[1.6rem] border border-gold/20 bg-gradient-to-br from-surface to-[#241a13] p-6 md:p-9">
            <div>
              <ShieldCheck size={28} className="text-gold-light" />
              <p className="mt-6 label-text">Public status</p>
              <h3 className="mt-3 font-serif text-4xl font-light">{status?.publicationEnabled ? "Publishing enabled" : "Publication held"}</h3>
              <p className="mt-5 text-sm leading-7 text-muted">
                {status?.publicationEnabled ? "All release flags are recorded. Confirm scope before any new campaign or location." : "Public visitors receive the editorial holding page; the booking endpoint rejects submissions."}
              </p>
            </div>
            <div className="flex items-center gap-3 border-t border-gold/20 pt-6 text-sm text-gold-light">
              <LockKeyhole size={16} /> Release changes are server-controlled
            </div>
          </aside>
        </div>
        <section className="mt-12">
          <div className="flex items-center gap-3">
            <Globe2 className="text-gold-light" size={20} />
            <h3 className="font-serif text-3xl">Australian jurisdiction queue</h3>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">Before advertising in a state or territory, review the actual advertisement, images, services, intermediary role and publication channel. A global approval flag is not a state-by-state clearance.</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {JURISDICTIONS.map(([code, name]) => (
              <div key={code} className="rounded-2xl border border-gold/15 bg-surface/60 p-5">
                <div className="flex justify-between gap-2"><span className="font-serif text-2xl text-gold-light">{code}</span><ArrowUpRight size={16} className="text-muted" aria-hidden="true" /></div>
                <p className="mt-2 text-sm text-cream">{name}</p>
                <p className="mt-4 text-xs tracking-wide text-muted">Individual review required</p>
              </div>
            ))}
          </div>
        </section>
        <p className="mt-10 text-xs leading-6 text-muted">No offer, campaign, booking or payout is automatically approved or executed from this dashboard.</p>
      </div>
    </main>
  );
}
