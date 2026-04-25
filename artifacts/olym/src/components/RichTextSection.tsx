interface RichTextSectionProps {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref?: string;
  onCta?: () => void;
  testId?: string;
}

export default function RichTextSection({
  title,
  body,
  ctaLabel,
  ctaHref = "#",
  onCta,
  testId = "section-rich-text",
}: RichTextSectionProps) {
  return (
    <section
      id="treatment"
      data-testid={testId}
      style={{
        backgroundColor: "#0A0A0A",
        padding: "clamp(5rem, 12vw, 10rem) 1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        textAlign: "center",
      }}
    >
      {/* Thin decorative line */}
      <div
        style={{
          width: "1px",
          height: "60px",
          background: "linear-gradient(to bottom, transparent, #C6A46A)",
          marginBottom: "3rem",
          opacity: 0.6,
        }}
      />

      <h2
        data-testid="text-treatment-title"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)",
          fontWeight: 400,
          letterSpacing: "0.22em",
          color: "#C6A46A",
          textTransform: "uppercase",
          marginBottom: "2rem",
        }}
      >
        {title}
      </h2>

      <p
        data-testid="text-treatment-body"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)",
          fontWeight: 300,
          lineHeight: 1.85,
          letterSpacing: "0.04em",
          color: "#A89C92",
          maxWidth: "540px",
          marginBottom: "3.5rem",
        }}
      >
        {body}
      </p>

      {onCta ? (
        <button
          onClick={onCta}
          data-testid="button-treatment-cta"
          className="olym-btn-gold"
        >
          {ctaLabel}
        </button>
      ) : (
        <a
          href={ctaHref}
          data-testid="link-treatment-cta"
          className="olym-btn-gold"
          style={{ textDecoration: "none", display: "inline-block" }}
        >
          {ctaLabel}
        </a>
      )}

      <div
        style={{
          width: "1px",
          height: "60px",
          background: "linear-gradient(to top, transparent, #C6A46A)",
          marginTop: "3rem",
          opacity: 0.6,
        }}
      />
    </section>
  );
}
