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
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1.6,
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
          duration: 1.2,
          ease: "power2.out",
          delay: 0.25,
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

  const goldDivider: React.CSSProperties = {
    borderTop: "1px solid rgba(198, 164, 106, 0.3)",
    margin: 0,
  };

  const navLinkStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.65rem",
    letterSpacing: "0.2em",
    color: "#C8BAA8",
    textDecoration: "none",
    textTransform: "uppercase",
    transition: "color 0.25s ease",
    cursor: "pointer",
  };

  return (
    <footer
      data-testid="footer"
      style={{
        backgroundColor: "#4A0B12",
        padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 4rem) clamp(2.5rem, 4vw, 3.5rem)",
      }}
    >
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* ── Large centered OLYM SKIN wordmark ── */}
        <div
          ref={wordmarkRef}
          data-testid="text-footer-logo"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(2.2rem, 7vw, 5.5rem)",
            fontWeight: 300,
            letterSpacing: "0.38em",
            color: "#C6A46A",
            lineHeight: 1,
            textTransform: "uppercase",
            marginBottom: "clamp(1.4rem, 3vw, 2rem)",
            opacity: 0,
            userSelect: "none",
          }}
        >
          OLYM SKIN
        </div>

        {/* ── Body content ── */}
        <div ref={contentRef} style={{ opacity: 0, width: "100%" }}>

          {/* ── Tagline ── */}
          <p
            data-testid="text-footer-tagline"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.62rem, 1.3vw, 0.72rem)",
              letterSpacing: "0.28em",
              color: "#C6A46A",
              textTransform: "uppercase",
              margin: "0 0 1.4rem 0",
              opacity: 0.85,
            }}
          >
            Sculpted Skin. Intentional Care.
          </p>

          {/* ── Body copy ── */}
          <p
            data-testid="text-footer-message"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.78rem, 1.5vw, 0.88rem)",
              fontWeight: 300,
              lineHeight: 1.85,
              letterSpacing: "0.03em",
              color: "#C8BAA8",
              margin: "0 auto 2.5rem auto",
              maxWidth: "520px",
              opacity: 0.75,
            }}
          >
            Performance-driven body care designed to support the skin barrier
            and elevate your everyday.
          </p>

          {/* ── CTA button ── */}
          <div style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
            <a
              href={TALLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-footer-cta"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.28em",
                color: "#C6A46A",
                textDecoration: "none",
                textTransform: "uppercase",
                border: "1px solid rgba(198, 164, 106, 0.55)",
                padding: "0.85rem 2.4rem",
                display: "inline-block",
                transition: "border-color 0.25s ease, opacity 0.25s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "#C6A46A";
                el.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(198, 164, 106, 0.55)";
                el.style.opacity = "0.9";
              }}
            >
              [ Discover the Founder Circle ]
            </a>
          </div>

          {/* ── Gold divider ── */}
          <div style={goldDivider} />

          {/* ── Nav + Instagram row ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "clamp(1.5rem, 4vw, 3rem)",
              padding: "clamp(1.8rem, 3.5vw, 2.5rem) 0",
              position: "relative",
            }}
          >
            {/* Nav links */}
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
                  style={navLinkStyle}
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
                  style={navLinkStyle}
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

            {/* Instagram icon — right side on larger screens */}
            <a
              href="https://www.instagram.com/olymskin"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-footer-instagram"
              aria-label="OLYM SKIN on Instagram"
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
              <Instagram size={16} strokeWidth={1.4} />
            </a>
          </div>

          {/* ── Gold divider above legal ── */}
          <div style={goldDivider} />

          {/* ── Legal + copyright row ── */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "1.5rem",
              paddingTop: "1.8rem",
            }}
          >
            {[
              { label: "Terms of Service", href: "/terms" },
              { label: "Privacy Policy", href: "/privacy" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                data-testid={`link-footer-legal-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                style={{
                  ...navLinkStyle,
                  fontSize: "0.58rem",
                  letterSpacing: "0.14em",
                  opacity: 0.5,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "#C6A46A";
                  el.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "#C8BAA8";
                  el.style.opacity = "0.5";
                }}
              >
                {link.label}
              </Link>
            ))}

            <p
              data-testid="text-footer-copyright"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.58rem",
                letterSpacing: "0.12em",
                color: "#C8BAA8",
                opacity: 0.45,
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              © OLYM SKIN 2026
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
