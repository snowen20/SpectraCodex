import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/issues/01", label: "Current Issue" },
  { href: "/issues", label: "Archive" },
  { href: "/framework", label: "Framework Features" },
  { href: "/essays", label: "Essays" },
  { href: "/glossary", label: "Glossary" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header style={{ backgroundColor: "var(--color-bg)" }}>
      {/* Masthead */}
      <div
        className="masthead-grid"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "1.5rem 2rem 1.25rem",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 2.8vw, 2.25rem)",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-ink)",
              lineHeight: 1,
              margin: 0,
            }}
          >
            Spectra Codex
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.625rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--color-muted)",
              marginTop: "0.35rem",
            }}
          >
            An Independent Fortean Publication
          </p>
        </Link>

        <div
          className="masthead-ornament"
          style={{
            color: "var(--color-accent-dim)",
            fontSize: "1.25rem",
            textAlign: "center",
            fontFamily: "var(--font-ornament)",
            opacity: 0.7,
          }}
        >
          ✦
        </div>

        <p
          className="masthead-quote"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.8rem",
            fontStyle: "italic",
            color: "var(--color-muted)",
            textAlign: "right",
            lineHeight: 1.55,
            marginLeft: "auto",
            maxWidth: "240px",
          }}
        >
          "We do not chase anomalies. We examine the structures that make them
          possible."
        </p>
      </div>

      {/* Nav bar */}
      <div
        style={{
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <nav
          className="header-nav"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1.5rem",
          }}
        >
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.625rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                textDecoration: "none",
                padding: "0.8rem 0.9rem",
                display: "block",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
