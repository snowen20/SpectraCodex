"use client";

export default function EmailCapture({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            color: "var(--color-muted)",
            marginBottom: "1.25rem",
            lineHeight: 1.65,
          }}
        >
          Subscribe for new issue announcements, essays, and updates from the
          editorial desk. We respect your privacy. Unsubscribe at any time.
        </p>
        <form
          action="https://buttondown.com/api/emails/embed-subscribe/spectracodex"
          method="post"
          target="popupwindow"
          style={{ display: "flex", gap: "0.6rem" }}
        >
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            required
            style={{
              flex: "1",
              padding: "0.6rem 0.9rem",
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border-light)",
              color: "var(--color-ink)",
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "0.6rem 1rem",
              backgroundColor: "var(--color-accent)",
              border: "none",
              color: "var(--color-bg)",
              fontFamily: "var(--font-body)",
              fontSize: "0.625rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontWeight: 600,
            }}
          >
            Subscribe
          </button>
        </form>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.6875rem",
            color: "var(--color-dim)",
            marginTop: "0.75rem",
          }}
        >
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        textAlign: "center",
        padding: "3rem 1.5rem",
        maxWidth: "480px",
        margin: "0 auto",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.5rem",
          fontStyle: "italic",
          color: "var(--color-ink)",
          marginBottom: "0.5rem",
        }}
      >
        Each issue, by email.
      </p>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.875rem",
          color: "var(--color-muted)",
          marginBottom: "1.5rem",
          lineHeight: 1.6,
        }}
      >
        Receive new issues and occasional notes from the investigation.
        No frequency commitment. Unsubscribe at any time.
      </p>
      <form
        action="https://buttondown.com/api/emails/embed-subscribe/spectracodex"
        method="post"
        target="popupwindow"
        style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}
      >
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          style={{
            flex: "1",
            maxWidth: "280px",
            padding: "0.6rem 1rem",
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border-light)",
            color: "var(--color-ink)",
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.6rem 1.25rem",
            backgroundColor: "transparent",
            border: "1px solid var(--color-accent)",
            color: "var(--color-accent)",
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
