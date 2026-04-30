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
        padding: "clamp(3rem, 7vw, 5.5rem) 1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "auto",
        textAlign: "center",
      }}
    >
      {/* Thin decorative line */}
      <div
        style={{
          width: "1px",
          height: "38px",
          background: "linear-gradient(to bottom, transparent, #C6A46A)",
          marginBottom: "2rem",
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
          marginBottom: "1.5rem",
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
          lineHeight: 1.75,
          letterSpacing: "0.04em",
          color: "#A89C92",
          maxWidth: "540px",
          marginBottom: "2.5rem",
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
          height: "38px",
          background: "linear-gradient(to top, transparent, #C6A46A)",
          marginTop: "2rem",
          opacity: 0.6,
        }}
      />
    </section>
  );
}