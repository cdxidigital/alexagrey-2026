import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Film, Menu, Play, X } from "lucide-react";
import { media } from "@/lib/site-data";
import { EllieRateCalculator } from "@/components/ellie-rate-calculator";

const sections = [
  { label: "The introduction", href: "#story" },
  { label: "The editorial", href: "#editorial" },
  { label: "The approach", href: "#approach" },
];

const films = [
  { src: media.heroVideos[0], number: "01", label: "A moment in motion", caption: "Original film" },
  { src: media.heroVideos[1], number: "02", label: "A different perspective", caption: "Original film" },
  { src: media.heroVideos[2], number: "03", label: "The moving portrait", caption: "Original film" },
];

/**
 * Public-safe editorial landing page.
 * Its presence does not enable commercial publishing, rates or booking endpoints.
 * The original-site media is intentionally preserved with no claim of photographic authenticity.
 */
export function EditorialPreview({
  showRateEstimator = false,
  estimatorPreviewOnly = false,
  directContactUrl = null,
}: {
  showRateEstimator?: boolean;
  estimatorPreviewOnly?: boolean;
  directContactUrl?: string | null;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [activeFilm, setActiveFilm] = useState<number | null>(null);
  const filmOpener = useRef<HTMLElement | null>(null);

  const closeFilm = () => {
    setActiveFilm(null);
    window.requestAnimationFrame(() => filmOpener.current?.focus());
  };

  const openFilm = (index: number) => {
    filmOpener.current = document.activeElement as HTMLElement;
    setActiveFilm(index);
  };

  useEffect(() => {
    if (activeFilm === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveFilm(null);
        window.requestAnimationFrame(() => filmOpener.current?.focus());
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onEscape);
    };
  }, [activeFilm]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [mobileOpen]);

  return (
    <main id="main-content" className="ellie-landing">
      <a href="#story" className="ellie-skip">Skip to main content</a>

      <div className="ellie-topline" role="note">
        <span className="ellie-live-dot" aria-hidden="true" />
        <span>ELLIE MAY / THE PRIVATE EDITION</span>
        <span className="ellie-top-divider" aria-hidden="true">✦</span>
        <span>18+ EDITORIAL PREVIEW</span>
      </div>

      <header className="ellie-header">
        <a className="ellie-wordmark" href="#home" aria-label="Ellie May, return to top">
          <span className="ellie-monogram" aria-hidden="true">em</span>
          <span className="ellie-wordmark-name">ELLIE MAY <small>THE PRIVATE EDITION</small></span>
        </a>
        <nav className="ellie-nav" aria-label="Primary navigation">
          {sections.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
          {showRateEstimator && <a href="#estimate">Rates & estimate</a>}
        </nav>
        <a href="#editorial" className="ellie-header-cta">
          Explore the edition <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <button
          type="button"
          className="ellie-menu-toggle"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          aria-controls="ellie-mobile-menu"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </header>
      {mobileOpen && (
        <nav id="ellie-mobile-menu" className="ellie-mobile-nav" aria-label="Mobile navigation">
          {sections.map((item) => (
            <a href={item.href} key={item.href} onClick={() => setMobileOpen(false)}>{item.label}</a>
          ))}
          {showRateEstimator && (
            <a href="#estimate" onClick={() => setMobileOpen(false)}>Rates & estimate</a>
          )}
          <a href="#finale" onClick={() => setMobileOpen(false)}>The next chapter</a>
        </nav>
      )}

      <section id="home" className="ellie-hero" aria-labelledby="ellie-hero-title">
        <div className="ellie-hero-text">
          <p className="ellie-eyebrow"><span aria-hidden="true">✦</span> AN INTRODUCTION, HER WAY</p>
          <p className="ellie-hero-pretitle">The art of a first impression.</p>
          <h1 id="ellie-hero-title" className="ellie-hero-title">
            <span>ELLIE</span><em>MAY.</em>
          </h1>
          <p className="ellie-hero-description">
            A little intrigue. A little edge. An unmistakable presence.
            Welcome to the editorial world of Ellie May.
          </p>
          <div className="ellie-hero-links">
            <a className="ellie-button ellie-button-cream" href="#story">
              Discover her story <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a className="ellie-text-link" href="#editorial">
              View the editorial <ArrowDown size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="ellie-hero-bottom">
            <span>SCROLL TO EXPLORE</span>
            <span className="ellie-hero-bottom-rule" aria-hidden="true" />
            <span>AN ORIGINAL VISUAL EDITION</span>
          </div>
        </div>
        <div className="ellie-hero-visual">
          <img
            src={media.heroImage}
            alt="Authorised original-site editorial artwork, showing a styled figure in an ornate interior"
            className="ellie-hero-img"
            fetchPriority="high"
            decoding="async"
          />
          <div className="ellie-hero-visual-shade" aria-hidden="true" />
          <div className="ellie-hero-visual-frame" aria-hidden="true" />
          <span className="ellie-hero-side-mark" aria-hidden="true">E / M</span>
          <div className="ellie-hero-visual-caption">
            <span>01 / THE OPENING PORTRAIT</span>
            <span>ORIGINAL-SITE MEDIA</span>
          </div>
        </div>
      </section>

      <div className="ellie-marquee" aria-label="A considered, personal, independent editorial identity">
        <span>PERSONALITY</span><b aria-hidden="true">✦</b>
        <span>INDIVIDUALITY</span><b aria-hidden="true">✦</b>
        <span>PRESENCE</span><b aria-hidden="true">✦</b>
        <span>ON HER TERMS</span>
      </div>

      <section id="story" className="ellie-story" aria-labelledby="ellie-story-heading">
        <div className="ellie-section-head">
          <span>01 / THE INTRODUCTION</span>
          <span>ELLIE MAY · EDITION NO. 01</span>
        </div>
        <div className="ellie-story-grid">
          <div>
            <span className="ellie-flourish" aria-hidden="true">✳</span>
            <h2 id="ellie-story-heading">Not here to <em>blend in.</em></h2>
          </div>
          <div className="ellie-story-copy">
            <p className="ellie-story-lead">Some personalities need more than a profile. They deserve a world of their own.</p>
            <p>Ellie May’s new digital home is designed as a more personal introduction: expressive, confident and thoughtfully considered from the first frame.</p>
            <p>This is the editorial chapter. Her complete commercial information, if approved for publication, will be handled separately.</p>
            <a href="#editorial" className="ellie-underlined-link">
              Explore the collection <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section id="editorial" className="ellie-collection" aria-labelledby="ellie-gallery-title">
        <div className="ellie-collection-inner">
          <div className="ellie-section-head ellie-section-head-dark">
            <span>02 / VISUAL DIARY</span><span>APPROVED ORIGINAL-SITE ASSETS</span>
          </div>
          <div className="ellie-collection-intro">
            <h2 id="ellie-gallery-title">In her <em>element.</em></h2>
            <p>One original portrait, three original video pieces. Preserved as supplied, presented in a more considered setting.</p>
          </div>
          <div className="ellie-collection-actions">
            <button
              className="ellie-button ellie-button-outline"
              type="button"
              onClick={() => setShowMedia((shown) => !shown)}
              aria-expanded={showMedia}
              aria-controls="ellie-gallery-grid"
            >
              {showMedia ? "Hide original media" : "Reveal 1 portrait + 3 clips"}
              <ArrowUpRight size={17} aria-hidden="true" />
            </button>
            <p>Original media reveal is optional. It does not perform age verification.</p>
          </div>
          <div id="ellie-gallery-grid" className="ellie-gallery-grid">
            <div className={"ellie-image-tile " + (showMedia ? "ellie-media-open" : "ellie-media-covered")}>
              <img
                src={media.heroImage}
                loading="lazy"
                decoding="async"
                alt={showMedia ? "Authorised original-site editorial image" : "Original image, details intentionally softened until revealed"}
              />
              <div className="ellie-tile-footer">
                <div><small>01 / PORTRAIT</small><strong>Behind the frame</strong></div>
                <span className="ellie-tile-arrow" aria-hidden="true">↗</span>
              </div>
            </div>
            {films.map((film, index) => (
              <button
                type="button"
                className={"ellie-film-tile ellie-film-" + index}
                key={film.number}
                onClick={() => showMedia && openFilm(index)}
                disabled={!showMedia}
                aria-label={showMedia ? "Play " + film.label : "Reveal original media to play videos"}
              >
                <div className="ellie-film-backdrop" aria-hidden="true">
                  {showMedia && <img src={media.heroImage} alt="" loading="lazy" decoding="async" />}
                  {!showMedia && <span>{film.number}</span>}
                </div>
                <span className="ellie-film-play" aria-hidden="true"><Play size={21} fill="currentColor" /></span>
                <span className="ellie-film-footer"><small>{film.number} / {film.caption}</small><strong>{film.label}</strong></span>
              </button>
            ))}
          </div>
          <p className="ellie-media-note">Original source imagery is authorised for this project. Publication clearance, permitted advertising contexts and any AI-image disclosures must still be assessed separately.</p>
        </div>
      </section>

      <section id="approach" className="ellie-approach" aria-labelledby="ellie-approach-title">
        <div className="ellie-section-head ellie-section-head-dark">
          <span>03 / THE APPROACH</span><span>MORE THAN A TEMPLATE</span>
        </div>
        <div className="ellie-approach-heading">
          <h2 id="ellie-approach-title">Every detail <em>matters.</em></h2>
          <p>A visual identity that puts the creator first, with a clear distinction between expression, privacy and commercial approval.</p>
        </div>
        <div className="ellie-values">
          <article>
            <span aria-hidden="true" className="ellie-value-icon">✳</span>
            <span className="ellie-value-number">I /</span>
            <h3>A little personality</h3>
            <p>Individuality over convention. A site with a point of view, rather than another interchangeable profile.</p>
          </article>
          <article>
            <span aria-hidden="true" className="ellie-value-icon">◇</span>
            <span className="ellie-value-number">II /</span>
            <h3>Room to express</h3>
            <p>Editorial photography, original moving images and storytelling, presented with intention.</p>
          </article>
          <article>
            <span aria-hidden="true" className="ellie-value-icon">✧</span>
            <span className="ellie-value-number">III /</span>
            <h3>Always on her terms</h3>
            <p>Creator-led approvals, privacy by design and a thoughtful approach to what goes public.</p>
          </article>
        </div>
      </section>

      {showRateEstimator && (
        <EllieRateCalculator
          previewOnly={estimatorPreviewOnly}
          directContactUrl={directContactUrl}
        />
      )}

      <section id="finale" className="ellie-finale" aria-labelledby="ellie-finale-title">
        <div className="ellie-finale-text">
          <p className="ellie-eyebrow">04 / THE NEXT CHAPTER</p>
          <h2 id="ellie-finale-title">More to <em>come.</em></h2>
          <p>The next edition is taking shape. Public enquiries and commercial offerings are not active in this editorial preview.</p>
          <a href="#home" className="ellie-button ellie-button-dark">
            Back to the beginning <ArrowUpRight size={19} aria-hidden="true" />
          </a>
        </div>
        <div className="ellie-finale-card">
          <span className="ellie-finale-orbit" aria-hidden="true">e.</span>
          <span>PRIVATE EDITION / IN DEVELOPMENT</span>
          <div><Film size={20} aria-hidden="true" /> CREATOR-LED ORIGINAL MEDIA</div>
        </div>
      </section>

      <footer className="ellie-footer">
        <div className="ellie-footer-brand"><span>Ellie <em>May.</em></span><p>Considered. Personal. Entirely her own.</p></div>
        <div className="ellie-footer-right">
          <span>18+ EDITORIAL PREVIEW</span>
          <p>Non-commercial concept. No bookings or offers are available through this page. Rights and content reviews remain part of publication approval.</p>
        </div>
        <div className="ellie-footer-line">
          <span>© {new Date().getFullYear()} ELLIE MAY</span>
          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </footer>

      {activeFilm !== null && showMedia && (
        <div className="ellie-film-modal" role="dialog" aria-modal="true" aria-label={films[activeFilm].label} onClick={closeFilm}>
          <button type="button" className="ellie-film-close" onClick={closeFilm} aria-label="Close video viewer"><X size={25} /></button>
          <div className="ellie-film-frame" onClick={(event) => event.stopPropagation()}>
            <video
              src={films[activeFilm].src}
              poster={media.heroImage}
              controls
              playsInline
              preload="metadata"
              autoPlay
              aria-label={films[activeFilm].label}
            />
            <p>{films[activeFilm].label} · Original-site film</p>
          </div>
        </div>
      )}
    </main>
  );
}
