import { useMemo, useState } from "react";
import { ArrowUpRight, Check, Clipboard, Clock3, Info } from "lucide-react";
import {
  DURATION_OPTIONS,
  INTEREST_OPTIONS,
  buildIndependentEnquiryText,
  estimateInterest,
  formatAUD,
  type DurationId,
  type InterestId,
} from "@/lib/ellie-rate-estimator";

type Props = {
  /** Only true following server-side publication approval, or a staff-only review. */
  previewOnly?: boolean;
  directContactUrl?: string | null;
};

export function EllieRateCalculator({
  previewOnly = false,
  directContactUrl = null,
}: Props) {
  const [duration, setDuration] = useState<DurationId>("60m");
  const [interests, setInterests] = useState<InterestId[]>(["availability"]);
  const [copyState, setCopyState] = useState<"idle" | "done" | "manual">("idle");

  const estimate = useMemo(() => estimateInterest(duration, interests), [duration, interests]);
  const message = useMemo(
    () => buildIndependentEnquiryText(duration, interests),
    [duration, interests],
  );

  const toggleInterest = (id: InterestId) => {
    setInterests((previous) => previous.includes(id)
      ? previous.filter((item) => item !== id)
      : [...previous, id]);
    setCopyState("idle");
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopyState("done");
    } catch {
      setCopyState("manual");
    }
  };

  return (
    <section id="estimate" className="ellie-estimator" aria-labelledby="ellie-estimator-title">
      <div className="ellie-estimator-intro">
        <p className="ellie-eyebrow">04 / AN INDEPENDENT ENQUIRY</p>
        <h2 id="ellie-estimator-title">
          Your time, <em>your way.</em>
        </h2>
        <p>
          Choose a duration and a few interests to see an indicative starting amount.
          These are draft rates provided from Ellie May's existing site, not a confirmed
          offer or an appointment.
        </p>
        {previewOnly && (
          <div className="ellie-estimator-review" role="status">
            <Info size={16} aria-hidden="true" />
            Design review only. Pricing is not approved for public advertising.
          </div>
        )}
      </div>

      <div className="ellie-estimator-grid">
        <div className="ellie-estimator-controls">
          <fieldset className="ellie-estimator-fieldset">
            <legend><span>01</span> How much time are you interested in?</legend>
            <div className="ellie-duration-grid">
              {DURATION_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={duration === option.id}
                  className={duration === option.id ? "ellie-duration is-selected" : "ellie-duration"}
                  onClick={() => { setDuration(option.id); setCopyState("idle"); }}
                >
                  <span>{option.label}</span>
                  <strong>{option.baseAUD === null ? "Ask Ellie" : formatAUD(option.baseAUD)}</strong>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="ellie-estimator-fieldset ellie-estimator-interests">
            <legend><span>02</span> What would you like to ask about?</legend>
            <p>Choose as many as you like. These interests do not add an automatic charge.</p>
            <div className="ellie-interest-grid">
              {INTEREST_OPTIONS.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  aria-pressed={interests.includes(item.id)}
                  className={interests.includes(item.id) ? "ellie-interest is-selected" : "ellie-interest"}
                  onClick={() => toggleInterest(item.id)}
                >
                  <span className="ellie-interest-check" aria-hidden="true">
                    {interests.includes(item.id) ? <Check size={13} /> : "+"}
                  </span>
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <aside className="ellie-estimator-summary" aria-label="Your indicative estimate">
          <div className="ellie-estimator-summary-top">
            <span className="ellie-eyebrow"><Clock3 size={15} aria-hidden="true" /> ESTIMATE SUMMARY</span>
            <span>AUSTRALIAN DOLLARS</span>
          </div>

          <p className="ellie-summary-name">{estimate.duration}</p>
          <div className="ellie-summary-value" aria-live="polite" aria-atomic="true">
            <span>{estimate.baseAUD === null ? "Ask Ellie" : formatAUD(estimate.baseAUD)}</span>
            <small>{estimate.baseAUD === null ? "CUSTOM DURATION" : "INDICATIVE BASE COST"}</small>
          </div>

          <div className="ellie-estimator-rule" />
          <dl className="ellie-summary-details">
            <div><dt>Duration</dt><dd>{estimate.duration}</dd></div>
            <div><dt>Interests</dt><dd>{estimate.interests.length ? estimate.interests.join(", ") : "General enquiry"}</dd></div>
            <div><dt>Other charges</dt><dd>Not calculated</dd></div>
          </dl>

          <p className="ellie-estimator-notice">
            {estimate.customQuote
              ? "A custom quote is needed. The amount above, if shown, covers the selected duration only."
              : "Estimate is based on the selected duration only. Any other costs, conditions or availability must be confirmed by Ellie."}
          </p>

          <button type="button" className="ellie-copy-summary" onClick={() => void copySummary()}>
            <Clipboard size={17} aria-hidden="true" />
            {copyState === "done" ? "Copied enquiry summary" : "Copy enquiry summary"}
            <ArrowUpRight size={17} aria-hidden="true" />
          </button>

          {directContactUrl && !previewOnly && (
            <a
              className="ellie-direct-contact"
              href={directContactUrl}
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              Contact Ellie directly <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          )}
          {!directContactUrl && (
            <p className="ellie-contact-pending">
              Ellie May's verified personal contact link can be added once approved.
              No message is sent or stored here.
            </p>
          )}

          <details className="ellie-estimator-manual" open={copyState === "manual"}>
            <summary>Review or manually copy your message</summary>
            <textarea
              readOnly
              value={message}
              rows={8}
              aria-label="Your personal enquiry summary"
              onFocus={(e) => e.currentTarget.select()}
            />
          </details>

          <p className="ellie-estimator-footnote">
            Indicative, non-binding information only. fleshsesh publishes this website
            but does not set Ellie's rates, manage appointments, collect payments or
            receive commission on in-person services.
          </p>
        </aside>
      </div>
    </section>
  );
}
