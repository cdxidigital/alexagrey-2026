import { ArrowUpRight, CircleCheck, LockKeyhole } from "lucide-react";
import type { CreatorOffer } from "@/lib/ellie-creator-offer-catalog";

export function EllieCreatorOffers({
  offers,
  previewOnly = false,
}: {
  offers: CreatorOffer[];
  previewOnly?: boolean;
}) {
  if (!offers.length) return null;
  return (
    <section id="creator-offers" className="ellie-creator-offers" aria-labelledby="ellie-offers-heading">
      <div className="ellie-section-head ellie-section-head-dark">
        <span>04 / THE CREATOR EDITION</span>
        <span>ENTIRELY ON HER TERMS</span>
      </div>

      <div className="ellie-creator-offers-intro">
        <div>
          <p className="ellie-eyebrow">ELLIE MAY · DIGITAL CREATOR</p>
          <h2 id="ellie-offers-heading">Step inside <em>her world.</em></h2>
        </div>
        <p>
          Exclusive content, digital releases and professional collaborations.
          Visit Ellie’s own approved channels to learn more.
        </p>
      </div>

      {previewOnly && (
        <p className="ellie-creator-offers-review" role="status">
          <LockKeyhole size={16} aria-hidden="true" />
          Private design review. Offer types are proposed and no purchase links are active.
        </p>
      )}

      <div className="ellie-creator-offers-grid">
        {offers.map((offer, index) => (
          <article key={offer.id} className="ellie-creator-offer-card">
            <span className="ellie-creator-offer-index">
              {String(index + 1).padStart(2, "0")} / {offer.eyebrow}
            </span>
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>
            {offer.url && !previewOnly ? (
              <a
                href={offer.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                referrerPolicy="no-referrer"
                className="ellie-creator-offer-link"
              >
                {offer.action} <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            ) : (
              <span className="ellie-creator-offer-pending">
                <CircleCheck size={15} aria-hidden="true" /> Pending creator approval
              </span>
            )}
          </article>
        ))}
      </div>

      <p className="ellie-creator-offers-disclaimer">
        Creator offerings, prices, eligibility and content permissions are determined
        by Ellie May and the relevant external platforms. This site does not charge,
        process fan purchases, arrange in-person services or store fan preferences.
      </p>
    </section>
  );
}
