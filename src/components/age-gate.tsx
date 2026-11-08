import { ArrowUpRight, ShieldCheck } from "lucide-react";

/**
 * First-visit acknowledgment for the editorial preview.
 * It is not an identity or age-verification technology.
 */
export function AgeGate({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="ellie-age-overlay" data-testid="age-verification-gate">
      <div aria-hidden="true" className="ellie-age-orbit">e.</div>
      <div className="ellie-age-card">
        <div className="ellie-age-top">
          <span className="ellie-age-mark">em</span>
          <span>THE PRIVATE EDITION / ELLIE MAY</span>
        </div>
        <div className="ellie-age-inner">
          <p className="ellie-age-eyebrow"><ShieldCheck size={17} aria-hidden="true" /> AN ADULT EDITORIAL PREVIEW</p>
          <h1>Welcome to <em>Ellie May.</em></h1>
          <p>This website is intended for adults aged 18 or older and may contain mature editorial imagery.</p>
          <p>By entering, you confirm that you are at least 18 and understand that this is a non-commercial preview with no active booking service.</p>
          <div className="ellie-age-actions">
            <button type="button" data-testid="age-gate-enter-btn" onClick={onEnter}>
              I am 18 or older <ArrowUpRight size={18} aria-hidden="true" />
            </button>
            <a data-testid="age-gate-exit-btn" href="https://www.google.com/">Leave website</a>
          </div>
          <p className="ellie-age-disclaimer">This acknowledgment is not identity or age verification. Commercial publication remains subject to separate approvals.</p>
        </div>
        <div className="ellie-age-bottom">
          <span>CREATOR-LED DIGITAL EXPERIENCE</span>
          <span>EST. INDEPENDENT SPIRIT</span>
        </div>
      </div>
    </div>
  );
}
