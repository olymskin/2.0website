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
        { opacity: 0, y: 40, letterSpacing: "0.1em" },
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.26em",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wordmark,
            start: "top 90%",
            toggleActions: "play none none reset",
          },
        }
      );

      gsap.fromTo(
        content,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power2.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: wordmark,
            start: "top 90%",
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
    color: "#C8BAA8",
    textDecoration: "none",
    textTransform: "uppercase",
    transition: "color 0.25s ease",
    cursor: "pointer",
  };

  const goldDivider: React.CSSProperties = {
    borderTop: "1.5px solid rgba(198, 164, 106, 0.45)",
    margin: 0,
  };

  return (
    <footer
      data-testid="footer"
      style={{
        background:
          "radial-gradient(circle at 50% 30%, rgba(92, 10, 18, 0.85), rgba(24, 0, 4, 1) 70%), #1A0005",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 5rem) clamp(2.5rem, 4vw, 3.5rem)",
      }}
    >
      {/* ── Inner max-width container ── */}
      <div style={{ maxWidth: "900px" }}>

        {/* ── Large OLYM wordmark — left aligned ── */}
        <div
          ref={wordmarkRef}
          data-testid="text-footer-logo"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(4.5rem, 14vw, 11rem)",
            fontWeight: 300,
            letterSpacing: "0.26em",
            color: "#E8DED2",
            lineHeight: 1,
            textAlign: "left",
            marginBottom: "clamp(2rem, 4vw, 3.5rem)",
            opacity: 0,
            fontStyle: "italic",
            userSelect: "none",
          }}
        >
          OLYM
        </div>

        {/* ── Body content wrapper ── */}
        <div ref={contentRef} style={{ opacity: 0 }}>

          {/* ── Message — left aligned ── */}
          <p
            data-testid="text-footer-message"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.82rem, 1.6vw, 0.95rem)",
              fontWeight: 300,
              lineHeight: 1.8,
              letterSpacing: "0.04em",
              color: "#C8BAA8",
              textAlign: "left",
              maxWidth: "640px",
              margin: "0",
              marginBottom: "2rem",
            }}
          >
            For questions, private inquiries, or guidance before applying,
            contact us directly. Responses are sent as availability opens.
          </p>

          {/* ── Contact Us button — left aligned ── */}
          <div style={{ marginBottom: "1.4rem" }}>
            <Link
              href="/contact"
              data-testid="link-footer-contact-btn"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.66rem",
                letterSpacing: "0.26em",
                color: "#E8DED2",
                textDecoration: "none",
                textTransform: "uppercase",
                border: "1.5px solid rgba(198, 164, 106, 0.45)",
                padding: "0.72rem 2rem",
                display: "inline-block",
                transition: "color 0.25s ease, border-color 0.25s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "#C6A46A";
                el.style.borderColor = "rgba(198, 164, 106, 0.85)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "#E8DED2";
                el.style.borderColor = "rgba(198, 164, 106, 0.45)";
              }}
            >
              [ CONTACT US ]
            </Link>
          </div>

          {/* ── Email — left aligned ── */}
          <div style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
            <a
              href="mailto:hello@olymskin.com"
              data-testid="link-footer-email"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                letterSpacing: "0.14em",
                color: "#C6A46A",
                textDecoration: "none",
                transition: "opacity 0.25s ease",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLAnchorElement).style.opacity = "0.65")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLAnchorElement).style.opacity = "1")
              }
            >
              hello@olymskin.com
            </a>
          </div>

          {/* ── Gold divider ── */}
          <div style={goldDivider} />

          {/* ── Nav + Social row ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "2rem",
              padding: "clamp(2rem, 4vw, 3rem) 0",
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
                { label: "Home", href: "/", external: false },
                { label: "Contact", href: "/contact", external: false },
                { label: "Founder Circle", href: TALLY_URL, external: true },
              ].map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`link-footer-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    style={linkStyle}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color = "#C6A46A")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color = "#C8BAA8")
                    }
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    data-testid={`link-footer-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    style={linkStyle}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "#C6A46A")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "#C8BAA8")
                    }
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
                color: "#C8BAA8",
                textDecoration: "none",
                transition: "color 0.25s ease",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#C6A46A")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#C8BAA8")
              }
            >
              <Instagram size={18} strokeWidth={1.5} />
            </a>
          </div>

          {/* ── Gold divider above legal ── */}
          <div style={goldDivider} />

          {/* ── Legal row ── */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              paddingTop: "1.6rem",
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
                    el.style.color = "#C8BAA8";
                    el.style.opacity = "0.55";
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.25rem" }}>
              <p
                data-testid="text-footer-copyright"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.1em",
                  color: "#C8BAA8",
                  opacity: 0.45,
                  margin: 0,
                }}
              >
                © OLYM SKIN 2026
              </p>
              <p
                data-testid="text-footer-version"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.55rem",
                  letterSpacing: "0.08em",
                  color: "#C6A46A",
                  opacity: 0.5,
                  margin: 0,
                }}
              >
                scroll fix v1
              </p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
