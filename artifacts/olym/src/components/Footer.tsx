import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Instagram } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TALLY_URL = "https://tally.so";

export default function Footer() {
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wordmark = wordmarkRef.current;
    const content = contentRef.current;
    if (!wordmark || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordmark,
        { opacity: 0, y: 40, letterSpacing: "0.12em" },
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.28em",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wordmark,
            start: "top 88%",
            toggleActions: "play none none reset",
          },
        }
      );

      gsap.fromTo(
        content,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power2.out",
          delay: 0.25,
          scrollTrigger: {
            trigger: wordmark,
            start: "top 88%",
            toggleActions: "play none none reset",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const linkStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.7rem",
    letterSpacing: "0.16em",
    color: "#A89C92",
    textDecoration: "none",
    textTransform: "uppercase",
    transition: "color 0.25s ease",
    cursor: "pointer",
  };

  return (
    <footer
      data-testid="footer"
      style={{
        backgroundColor: "#050505",
        borderTop: "1px solid rgba(198,164,106,0.1)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 5rem) clamp(2.5rem, 4vw, 3.5rem)",
      }}
    >
      {/* ── Large OLYM wordmark ── */}
      <div
        ref={wordmarkRef}
        data-testid="text-footer-logo"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(4.5rem, 14vw, 11rem)",
          fontWeight: 300,
          letterSpacing: "0.28em",
          color: "#E8DED2",
          lineHeight: 1,
          textAlign: "center",
          marginBottom: "clamp(2.5rem, 5vw, 4rem)",
          opacity: 0,
          fontStyle: "italic",
          userSelect: "none",
        }}
      >
        OLYM
      </div>

      {/* ── Body content wrapper ── */}
      <div
        ref={contentRef}
        style={{ opacity: 0 }}
      >
        {/* ── Message ── */}
        <p
          data-testid="text-footer-message"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.78rem, 1.5vw, 0.9rem)",
            fontWeight: 300,
            lineHeight: 1.75,
            letterSpacing: "0.04em",
            color: "#A89C92",
            textAlign: "center",
            maxWidth: "520px",
            margin: "0 auto",
            marginBottom: "2.2rem",
          }}
        >
          For questions, private inquiries, or guidance before applying, contact
          us directly. Responses are sent as availability opens.
        </p>

        {/* ── Contact Us button ── */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <Link
            href="/contact"
            data-testid="link-footer-contact-btn"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.68rem",
              letterSpacing: "0.24em",
              color: "#E8DED2",
              textDecoration: "none",
              textTransform: "uppercase",
              border: "1px solid rgba(198,164,106,0.35)",
              padding: "0.75rem 2.2rem",
              display: "inline-block",
              transition: "color 0.25s ease, border-color 0.25s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "#C6A46A";
              el.style.borderColor = "rgba(198,164,106,0.75)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "#E8DED2";
              el.style.borderColor = "rgba(198,164,106,0.35)";
            }}
          >
            [ Contact Us ]
          </Link>
        </div>

        {/* ── Email ── */}
        <div style={{ textAlign: "center", marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
          <a
            href="mailto:hello@olymskin.com"
            data-testid="link-footer-email"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.68rem",
              letterSpacing: "0.14em",
              color: "#C6A46A",
              textDecoration: "none",
              transition: "opacity 0.25s ease",
            }}
            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.opacity = "0.7")}
            onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.opacity = "1")}
          >
            hello@olymskin.com
          </a>
        </div>

        {/* ── Nav + Social row ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "2rem",
            marginBottom: "clamp(2.5rem, 5vw, 4rem)",
            borderTop: "1px solid rgba(198,164,106,0.08)",
            paddingTop: "clamp(2rem, 4vw, 3rem)",
          }}
        >
          {/* Left: Nav links */}
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {[
              { label: "Home", href: "/" },
              { label: "Contact", href: "/contact" },
              { label: "Founder Circle", href: TALLY_URL, external: true },
            ].map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`link-footer-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                  style={linkStyle}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#C6A46A")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#A89C92")}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  data-testid={`link-footer-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                  style={linkStyle}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#C6A46A")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#A89C92")}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right: Instagram */}
          <a
            href="https://www.instagram.com/olymskin"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-footer-instagram"
            aria-label="OLYM on Instagram"
            style={{
              color: "#A89C92",
              textDecoration: "none",
              transition: "color 0.25s ease",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#C6A46A")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#A89C92")}
          >
            <Instagram size={18} strokeWidth={1.5} />
          </a>
        </div>

        {/* ── Legal row ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            borderTop: "1px solid rgba(198,164,106,0.08)",
            paddingTop: "1.5rem",
          }}
        >
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {[
              { label: "Terms of Service", href: "/terms" },
              { label: "Privacy Policy", href: "/privacy" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                data-testid={`link-footer-legal-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                style={{
                  ...linkStyle,
                  fontSize: "0.62rem",
                  letterSpacing: "0.12em",
                  opacity: 0.55,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "#C6A46A";
                  el.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "#A89C92";
                  el.style.opacity = "0.55";
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p
            data-testid="text-footer-copyright"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.1em",
              color: "#A89C92",
              opacity: 0.45,
              margin: 0,
            }}
          >
            © OLYM SKIN 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
