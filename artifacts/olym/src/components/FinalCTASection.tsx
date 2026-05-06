export default function FinalCTASection() {
  const TALLY_URL = "https://circle.olymskin.com/";

  return (
    <section
      id="apply"
      data-testid="section-final-cta"
      style={{
        backgroundColor: "#0A0A0A",
        padding: "clamp(3.5rem, 8vw, 6rem) 1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "auto",
        textAlign: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "1px",
          background: "#C6A46A",
          marginBottom: "2.25rem",
          opacity: 0.5,
        }}
      />

      <p
        data-testid="text-cta-availability"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(0.7rem, 1.4vw, 0.8rem)",
          letterSpacing: "0.3em",
          color: "#A89C92",
          textTransform: "uppercase",
          marginBottom: "1.25rem",
          opacity: 0.7,
        }}
      >
        Not available—yet.
      </p>

      <h2
        data-testid="text-cta-headline"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(2rem, 5vw, 4.5rem)",
          fontWeight: 300,
          lineHeight: 1.12,
          letterSpacing: "0.02em",
          color: "#F4EFE9",
          fontStyle: "italic",
          marginBottom: "1.75rem",
          maxWidth: "580px",
        }}
      >
        Reserved for the
        <br />
        Founder Circle.
      </h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          marginBottom: "2.25rem",
        }}
      >
        <div style={{ width: "60px", height: "1px", background: "#C6A46A", opacity: 0.4 }} />
        <div
          style={{
            width: "5px",
            height: "5px",
            border: "1px solid #C6A46A",
            transform: "rotate(45deg)",
            opacity: 0.6,
          }}
        />
        <div style={{ width: "60px", height: "1px", background: "#C6A46A", opacity: 0.4 }} />
      </div>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(0.78rem, 1.5vw, 0.9rem)",
          fontWeight: 300,
          letterSpacing: "0.12em",
          color: "#A89C92",
          textTransform: "uppercase",
          marginBottom: "2rem",
          opacity: 0.8,
        }}
      >
        Applications are reviewed privately.
      </p>

      <a
        href="https://circle.olymskin.com/"
        target="_blank"
        rel="noopener noreferrer"
        data-testid="link-apply-cta"
        className="olym-btn-gold"
        style={{
          textDecoration: "none",
          display: "inline-block",
          fontSize: "0.72rem",
          letterSpacing: "0.22em",
          padding: "1rem 3rem",
        }}
      >
        Apply for access
      </a>
    </section>
  );
}