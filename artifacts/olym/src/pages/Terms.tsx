import { Link } from "wouter";

export default function Terms() {
  return (
    <main
      style={{
        backgroundColor: "#0A0A0A",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.68rem",
          letterSpacing: "0.3em",
          color: "#C6A46A",
          textTransform: "uppercase",
          marginBottom: "2rem",
          opacity: 0.8,
        }}
      >
        Legal
      </p>

      <h1
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(2rem, 5vw, 4rem)",
          fontWeight: 300,
          lineHeight: 1.15,
          letterSpacing: "0.03em",
          color: "#F4EFE9",
          fontStyle: "italic",
          marginBottom: "2.5rem",
        }}
      >
        Terms of Service
      </h1>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(0.8rem, 1.6vw, 0.95rem)",
          fontWeight: 300,
          lineHeight: 1.8,
          color: "#A89C92",
          maxWidth: "500px",
          marginBottom: "3rem",
        }}
      >
        Terms of Service for OLYM Skin will be available soon. For questions,
        contact{" "}
        <a
          href="mailto:hello@olymskin.com"
          style={{ color: "#C6A46A", textDecoration: "none" }}
        >
          hello@olymskin.com
        </a>
        .
      </p>

      <Link
        href="/"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.65rem",
          letterSpacing: "0.22em",
          color: "#A89C92",
          textDecoration: "none",
          textTransform: "uppercase",
          opacity: 0.6,
          transition: "opacity 0.25s ease, color 0.25s ease",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.opacity = "1";
          el.style.color = "#C6A46A";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.opacity = "0.6";
          el.style.color = "#A89C92";
        }}
      >
        ← Back to OLYM
      </Link>
    </main>
  );
}
