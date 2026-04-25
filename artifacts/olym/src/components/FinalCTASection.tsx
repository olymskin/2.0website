export default function FinalCTASection() {
  /* Replace this URL with your actual Tally form link */
  const TALLY_URL = "https://tally.so";

  return (
    <section
      id="apply"
      data-testid="section-final-cta"
      style={{
        backgroundColor: "#0A0A0A",
        padding: "clamp(6rem, 15vw, 12rem) 1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Top decorative element */}
      <div
        style={{
          width: "40px",
          height: "1px",
          background: "#C6A46A",
          marginBottom: "3.5rem",
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
          marginBottom: "1.5rem",
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
          marginBottom: "2rem",
          maxWidth: "580px",
        }}
      >
        Reserved for the
        <br />
        Founder Circle.
      </h2>

      {/* Gold ornament line */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          marginBottom: "3.5rem",
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

      {/* Apply CTA — links to Tally form */}
      <a
        href={TALLY_URL}
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
