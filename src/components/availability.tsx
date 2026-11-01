import { useEffect, useMemo, useState } from "react";
import { Clock } from "lucide-react";
import { weeklyHours } from "@/lib/site-data";
import { FadeIn } from "@/components/fade-in";
import { cn } from "@/lib/utils";

const PERTH_TZ = "Australia/Perth";

function perthNow() {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: PERTH_TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Sun";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  const dayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(weekday);

  return {
    dayIndex: dayIndex < 0 ? 0 : dayIndex,
    minutes: hour * 60 + minute,
  };
}

function buildSchedule(dayIndex: number) {
  const today = weeklyHours[dayIndex]!;
  const rest = [
    ...weeklyHours.slice(dayIndex + 1),
    ...weeklyHours.slice(0, dayIndex),
  ];

  return [
    { day: "Today", hours: today.hours },
    ...rest.map((d) => ({ day: d.day, hours: d.hours })),
  ];
}

function isOpenAt(hours: string, minutes: number) {
  if (hours.includes("24")) return true;

  const match = hours.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return false;

  let h = Number(match[1]);
  const m = Number(match[2]);
  const ap = match[3].toUpperCase();
  if (ap === "PM" && h !== 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;

  const start = h * 60 + m;
  return minutes >= start || minutes < 4 * 60;
}

export function Availability() {
  const [clock, setClock] = useState<{ dayIndex: number; minutes: number } | null>(null);

  useEffect(() => {
    const update = () => setClock(perthNow());
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const rows = useMemo(
    () => buildSchedule(clock?.dayIndex ?? 0),
    [clock?.dayIndex],
  );
  const open = clock ? isOpenAt(rows[0]!.hours, clock.minutes) : false;

  return (
    <section
      id="availability"
      data-testid="availability-section"
      className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32"
    >
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <FadeIn>
          <p className="label-text">Availability</p>
          <h2 className="mt-3 heading-serif text-4xl font-light md:text-5xl">
            When you can <span className="italic text-cream">see me</span>
          </h2>
          <p className="mt-4 max-w-sm font-sans text-sm font-light leading-relaxed text-muted">
            Outcall only. Availability is indicative and subject to confirmation.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-ink/40 px-4 py-2 text-xs text-gold">
            <Clock size={14} /> Times shown in Perth (AWST)
          </p>
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="overflow-hidden rounded-2xl border border-gold/15">
            {rows.map((row, i) => {
              const allDay = row.hours.includes("24");
              return (
                <div
                  key={row.day}
                  data-testid={`availability-${row.day.toLowerCase()}`}
                  className={cn(
                    "flex items-center justify-between px-6 py-5 transition-colors duration-300 hover:bg-gold/5 md:px-8",
                    i !== rows.length - 1 && "border-b border-white/5",
                    open && i === 0 && "bg-gold/5",
                  )}
                >
                  <span className="flex items-center gap-3 font-serif text-xl font-light text-cream">
                    {row.day}
                    {open && i === 0 && (
                      <span className="rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink">
                        Within listed hours
                      </span>
                    )}
                  </span>
                  <span
                    className={cn(
                      "font-sans text-sm",
                      allDay ? "font-semibold text-gold" : "text-muted",
                    )}
                  >
                    {row.hours}
                  </span>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
