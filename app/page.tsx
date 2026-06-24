import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import { getAllIssueNumbers, getIssueMeta, getIssueArticles } from "@/lib/content";

const frameworkFeatures = [
  {
    title: "The Library of Levers",
    slug: "the-library-of-levers",
    description: "The mechanics of influence and the architecture of effect.",
    href: "/framework#the-library-of-levers",
  },
  {
    title: "The Invitation Requirement",
    slug: "the-invitation-requirement",
    description: "The threshold, the consent, and the grammar of contact.",
    href: "/issues/01/the-invitation-requirement",
  },
  {
    title: "The Serpent Anomaly",
    slug: "the-serpent-anomaly",
    description: "Specific form, or perennial mask? A cross-traditional survey.",
    href: "/framework#the-serpent-anomaly",
  },
  {
    title: "The Replacement Problem",
    slug: "the-replacement-problem",
    description: "Substitution events and the question of identity.",
    href: "/framework#the-replacement-problem",
  },
  {
    title: "The Bound-Lords Hierarchy",
    slug: "the-bound-lords-hierarchy",
    description: "Orders, jurisdictions, and the limits of the unseen.",
    href: "/framework#the-bound-lords-hierarchy",
  },
  {
    title: "The Substrate Floor",
    slug: "the-substrate-floor",
    description: "On underlying substance and operating limits.",
    href: "/framework#the-substrate-floor",
  },
];

const readingList = [
  { title: "Passport to Magonia", author: "Jacques Vallée", year: "1969" },
  { title: "Daimonic Reality", author: "Patrick Harpur", year: "1994" },
  { title: "A Trojan Feast", author: "Joshua Cutchin", year: "2015" },
  { title: "The Cryptoterrestrials", author: "Mac Tonnies", year: "2010" },
];

const s = {
  label: {
    fontFamily: "var(--font-body)" as const,
    fontSize: "0.625rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "var(--color-dim)",
  },
  accentLabel: {
    fontFamily: "var(--font-body)" as const,
    fontSize: "0.625rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "var(--color-accent)",
  },
  readLink: {
    fontFamily: "var(--font-body)" as const,
    fontSize: "0.6875rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "var(--color-accent)",
    textDecoration: "none",
  },
  mutedLink: {
    fontFamily: "var(--font-body)" as const,
    fontSize: "0.6875rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "var(--color-muted)",
    textDecoration: "none",
  },
};

export default function HomePage() {
  const issueNumbers = getAllIssueNumbers();
  const hasIssues = issueNumbers.length > 0;
  const latestNumber = hasIssues ? issueNumbers[issueNumbers.length - 1] : null;
  const latestMeta = latestNumber ? getIssueMeta(latestNumber) : null;
  const articles = latestNumber ? getIssueArticles(latestNumber) : [];
  const feature = articles.find((a) => a.type === "feature");

  return (
    <>
      {/* ── Hero: Current Issue ── */}
      <section
        style={{
          borderBottom: "1px solid var(--color-border)",
          padding: "3.5rem 2rem",
        }}
      >
        <div
          className="hero-grid"
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "260px 1fr",
            gap: "3.5rem",
            alignItems: "center",
          }}
        >
          {/* Cover image */}
          <img
            src="/issues/01/cover.png"
            alt="Spectra Codex Issue 01 cover"
            style={{
              width: "100%",
              aspectRatio: "3/4",
              objectFit: "cover",
              display: "block",
              border: "1px solid var(--color-border)",
            }}
          />

          {/* Issue details */}
          <div>
            <p style={{ ...s.accentLabel, marginBottom: "0.5rem" }}>
              Current Issue
            </p>
            {latestMeta ? (
              <>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.85rem",
                    color: "var(--color-muted)",
                    letterSpacing: "0.08em",
                    marginBottom: "0.6rem",
                  }}
                >
                  Issue No. {String(latestMeta.number).padStart(3, "0")}
                </p>
                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 4vw, 3.25rem)",
                    fontWeight: 400,
                    lineHeight: 1.1,
                    color: "var(--color-ink)",
                    marginBottom: "1rem",
                  }}
                >
                  {feature?.title ?? latestMeta.tagline ?? `Issue ${latestMeta.number}`}
                </h1>
                {feature?.summary && (
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9375rem",
                      lineHeight: 1.75,
                      color: "var(--color-muted)",
                      maxWidth: "520px",
                      marginBottom: "2rem",
                    }}
                  >
                    {feature.summary}
                  </p>
                )}
                <div
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    flexWrap: "wrap",
                    marginBottom: "1.5rem",
                  }}
                >
                  <Link
                    href={`/issues/${latestNumber}/${feature?.slug ?? ""}`}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.6875rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--color-bg)",
                      backgroundColor: "var(--color-accent)",
                      padding: "0.55rem 1.1rem",
                      textDecoration: "none",
                    }}
                  >
                    Read Online
                  </Link>
                  {latestMeta.pdfUrl ? (
                    <a
                      href={latestMeta.pdfUrl}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.6875rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--color-muted)",
                        border: "1px solid var(--color-border-light)",
                        padding: "0.55rem 1.1rem",
                        textDecoration: "none",
                      }}
                    >
                      Download PDF ↓
                    </a>
                  ) : (
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.6875rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--color-dim)",
                        border: "1px solid var(--color-border)",
                        padding: "0.55rem 1.1rem",
                      }}
                    >
                      PDF Coming Soon
                    </span>
                  )}
                </div>
                <Link
                  href={`/issues/${latestNumber}`}
                  style={s.mutedLink}
                >
                  View Issue Details →
                </Link>
              </>
            ) : (
              <>
                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 4vw, 3.25rem)",
                    fontWeight: 400,
                    lineHeight: 1.1,
                    color: "var(--color-ink)",
                    marginBottom: "1rem",
                  }}
                >
                  Issue One — Coming Soon
                </h1>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9375rem",
                    lineHeight: 1.75,
                    color: "var(--color-muted)",
                    maxWidth: "520px",
                  }}
                >
                  The first issue of Spectra Codex is in preparation. Subscribe below to be notified on publication.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── Tagline Strip ── */}
      <section
        style={{
          backgroundColor: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
          padding: "2.5rem 2rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            fontStyle: "italic",
            fontWeight: 300,
            lineHeight: 1.65,
            color: "var(--color-muted)",
            maxWidth: "760px",
            margin: "0 auto",
          }}
        >
          Spectra Codex investigates structural invariants across anomalous
          phenomena and the traditions that report them. We compare cases —
          not to explain them away, but to understand what persists.
        </p>
      </section>

      {/* ── Framework Features ── */}
      <section
        style={{
          borderBottom: "1px solid var(--color-border)",
          padding: "3.5rem 2rem",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "2rem",
              borderBottom: "1px solid var(--color-border)",
              paddingBottom: "1rem",
            }}
          >
            <p style={s.label}>Framework Features</p>
            <Link href="/framework" style={s.mutedLink}>
              View All →
            </Link>
          </div>

          <div
            className="framework-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1px",
              backgroundColor: "var(--color-border)",
            }}
          >
            {frameworkFeatures.map((f) => (
              <Link
                key={f.slug}
                href={f.href}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    backgroundColor: "var(--color-bg)",
                    padding: "0",
                    height: "100%",
                  }}
                >
                  {/* Image placeholder */}
                  <div
                    className="feature-img-placeholder"
                    style={{ height: "160px" }}
                  />
                  {/* Card body */}
                  <div style={{ padding: "1.1rem 1.1rem 1.25rem" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        lineHeight: 1.2,
                        color: "var(--color-ink)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {f.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.8125rem",
                        lineHeight: 1.6,
                        color: "var(--color-muted)",
                        marginBottom: "0.85rem",
                      }}
                    >
                      {f.description}
                    </p>
                    <span style={s.readLink}>Read Feature →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── From the Editor + Illustration ── */}
      <section
        style={{
          borderBottom: "1px solid var(--color-border)",
          padding: "3.5rem 2rem",
        }}
      >
        <div
          className="two-col"
          style={{ maxWidth: "1100px", margin: "0 auto" }}
        >
          <div>
            <p style={{ ...s.label, marginBottom: "1rem" }}>From the Editor</p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 400,
                color: "var(--color-ink)",
                marginBottom: "1.5rem",
              }}
            >
              Editor&apos;s Letter
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9375rem",
                lineHeight: 1.85,
                color: "var(--color-muted)",
                marginBottom: "0.9rem",
              }}
            >
              We begin with structure. Not belief, not dismissal — structure. Across
              traditions and centuries, witnesses describe different things, and yet
              certain parameters recur with stubborn regularity. Our task is not to
              explain the impossible, but to map its grammar.
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.875rem",
                fontStyle: "italic",
                color: "var(--color-dim)",
                marginBottom: "1.5rem",
              }}
            >
              — The Editor
            </p>
            {latestNumber && (
              <Link href={`/issues/${latestNumber}`} style={s.readLink}>
                Read Full Letter →
              </Link>
            )}
          </div>

          {/* Illustration placeholder */}
          <div
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "260px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(196,148,58,0.07) 0%, transparent 70%)",
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-ornament)",
                fontSize: "5rem",
                color: "var(--color-border-light)",
                userSelect: "none",
                position: "relative",
              }}
            >
              ✦
            </p>
          </div>
        </div>
      </section>

      {/* ── Issue Archive ── */}
      <section
        style={{
          backgroundColor: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
          padding: "3.5rem 2rem",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "2rem",
              borderBottom: "1px solid var(--color-border)",
              paddingBottom: "1rem",
            }}
          >
            <p style={s.label}>Issue Archive</p>
            <Link href="/issues" style={s.mutedLink}>
              View All Archives →
            </Link>
          </div>

          <div
            className="archive-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
            }}
          >
            {/* Issue 01 — real */}
            {latestMeta && latestNumber ? (
              <div>
                <Link href={`/issues/${latestNumber}`} style={{ display: "block", marginBottom: "1rem" }}>
                  <img
                    src="/issues/01/cover.png"
                    alt="Spectra Codex Issue 01 cover"
                    style={{
                      width: "100%",
                      aspectRatio: "3/4",
                      objectFit: "cover",
                      display: "block",
                      border: "1px solid var(--color-border)",
                    }}
                  />
                </Link>
                <p style={{ ...s.accentLabel, marginBottom: "0.3rem" }}>
                  Issue No. {String(latestMeta.number).padStart(3, "0")}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.9rem",
                    color: "var(--color-ink)",
                    lineHeight: 1.3,
                    marginBottom: "0.3rem",
                  }}
                >
                  {feature?.title ?? latestMeta.tagline}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    color: "var(--color-dim)",
                  }}
                >
                  {latestMeta.date}
                </p>
              </div>
            ) : null}

            {/* Issue 02 — cover image, forthcoming content */}
            <div style={{ opacity: 0.75 }}>
              <div style={{ marginBottom: "1rem" }}>
                <img
                  src="/issues/02/cover.png"
                  alt="Spectra Codex Issue 02 cover"
                  style={{
                    width: "100%",
                    aspectRatio: "3/4",
                    objectFit: "cover",
                    display: "block",
                    border: "1px solid var(--color-border)",
                  }}
                />
              </div>
              <p style={{ ...s.accentLabel, marginBottom: "0.3rem" }}>Issue No. 002</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", color: "var(--color-ink)", lineHeight: 1.3, marginBottom: "0.3rem", fontStyle: "italic" }}>
                The Silicon Idol
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--color-dim)" }}>
                Forthcoming
              </p>
            </div>

            {/* Issue 03 — placeholder */}
            {[
              { n: "003", label: "Witnessing, Resisted, Transmitted", date: "Forthcoming" },
            ].map(({ n, label, date }) => (
              <div key={n} style={{ opacity: 0.45 }}>
                <div
                  className="cover-placeholder"
                  style={{
                    aspectRatio: "3/4",
                    marginBottom: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "1rem",
                    borderStyle: "dashed",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.5rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--color-dim)",
                    }}
                  >
                    Spectra Codex
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.75rem",
                      color: "var(--color-dim)",
                      fontStyle: "italic",
                    }}
                  >
                    Forthcoming
                  </p>
                </div>
                <p style={{ ...s.label, marginBottom: "0.3rem" }}>
                  Issue No. {n}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.9rem",
                    color: "var(--color-muted)",
                    lineHeight: 1.3,
                    marginBottom: "0.3rem",
                    fontStyle: "italic",
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    color: "var(--color-dim)",
                  }}
                >
                  {date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We're Reading + Email ── */}
      <section style={{ padding: "3.5rem 2rem" }}>
        <div
          className="two-col"
          style={{ maxWidth: "1100px", margin: "0 auto" }}
        >
          {/* Reading list */}
          <div>
            <p style={{ ...s.label, marginBottom: "1.5rem", borderBottom: "1px solid var(--color-border)", paddingBottom: "0.75rem" }}>
              What We&apos;re Reading
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {readingList.map((book) => (
                <div
                  key={book.title}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    padding: "0.7rem 0",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "0.9375rem",
                        fontStyle: "italic",
                        color: "var(--color-ink)",
                      }}
                    >
                      {book.title}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.8125rem",
                        color: "var(--color-muted)",
                        marginLeft: "0.6rem",
                      }}
                    >
                      — {book.author}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.75rem",
                      color: "var(--color-dim)",
                      flexShrink: 0,
                      marginLeft: "1rem",
                    }}
                  >
                    {book.year}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "1.25rem" }}>
              {latestNumber && (
                <Link href={`/issues/${latestNumber}`} style={s.mutedLink}>
                  View Full Bibliography →
                </Link>
              )}
            </div>
          </div>

          {/* Email signup */}
          <div>
            <p style={{ ...s.label, marginBottom: "1.5rem", borderBottom: "1px solid var(--color-border)", paddingBottom: "0.75rem" }}>
              Receive New Issues &amp; Essays
            </p>
            <EmailCapture compact />
          </div>
        </div>
      </section>
    </>
  );
}
