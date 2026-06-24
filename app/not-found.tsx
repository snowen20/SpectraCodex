import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        maxWidth: "680px",
        margin: "8rem auto",
        padding: "0 1.5rem",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.75rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--color-dim)",
          marginBottom: "1.5rem",
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2.5rem",
          fontWeight: 400,
          color: "var(--color-ink)",
          marginBottom: "1rem",
        }}
      >
        Page Not Found
      </h1>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "1rem",
          color: "var(--color-muted)",
          marginBottom: "2rem",
        }}
      >
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.8125rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--color-accent)",
          textDecoration: "none",
        }}
      >
        Return to the publication
      </Link>
    </div>
  );
}
