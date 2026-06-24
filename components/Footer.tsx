import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        backgroundColor: "var(--color-surface)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "1.25rem 2rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
          <a
            href="mailto:editor@spectracodex.com"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "var(--color-muted)",
              textDecoration: "none",
            }}
          >
            editor@spectracodex.com
          </a>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "var(--color-dim)",
            }}
          >
            ISSN pending
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "var(--color-dim)",
            }}
          >
            © {new Date().getFullYear()} Spectra Codex
          </span>
        </div>

        <nav style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
          {[
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6875rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-dim)",
                textDecoration: "none",
              }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
