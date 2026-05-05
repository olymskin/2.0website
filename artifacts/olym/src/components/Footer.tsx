import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Instagram } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TALLY_URL = "https://tally.so";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const wordmark = wordmarkRef.current;
    const content = contentRef.current;
    if (!footer || !wordmark || !content) return;

    const ctx = gsap.context(() => {
      // ── Enter: opacity + y (plays once on scroll-in, resets on scroll-out)
      gsap.fromTo(
        wordmark,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wordmark,
            start: "top 88%",
            toggleActions: "play none none reset",
          },
        }
      );

      // ── Enter: content block fades in after wordmark
      gsap.fromTo(
        content,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power2.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: wordmark,
            start: "top 88%",
            toggleActions: "play none none reset",
          },
        }
      );

      // ── Exit scrub: wordmark drifts up subtly as user scrolls through footer
      gsap.to(wordmark, {
        y: -28,
        opacity: 0.55,
        ease: "none",
        scrollTrigger: {
          trigger: footer,
          start: "center bottom",
          end: "bottom top",
          scrub: 1.8,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const thinDivider: React.CSSProperties = {
    borderTop: "1px solid rgba(198, 164, 106, 0.2)",
    margin: 0,
  };

  const navLinkStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.63rem",
    letterSpacing: "0.2em",
    color: "rgba(244, 239, 233, 0.55)",
    textDecoration: "none",
    textTransform: "uppercase",
    transition: "color 0.25s ease",
    cursor: "pointer",
  };

  return (
    <footer
      ref={footerRef}
      data-testid="footer"
      style={{
        background:
          "linear-gradient(to bottom, #140204 0%, #3D0508 6%, #4A0B12 18%, #4A0B12 100%)",
        padding:
          "clamp(5.5rem, 12vw, 10rem) clamp(1.5rem, 6vw, 4rem) clamp(2.5rem, 4vw, 3.5rem)",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* ── Large centered OLYM SKIN wordmark — ivory, hero-scale ── */}
        <div
          ref={wordmarkRef}
          data-testid="text-footer-logo"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(3rem, 11vw, 8.5rem)",
            fontWeight: 300,
            letterSpacing: "0.4em",
            color: "#F4EFE9",
            lineHeight: 1,
            textTransform: "uppercase",
            marginBottom: "clamp(1.6rem, 3.5vw, 2.6rem)",
            opacity: 0,
            userSelect: "none",
            willChange: "transform, opacity",
          }}
        >
          OLYM SKIN
        </div>

        {/* ── Content block ── */}
        <div ref={contentRef} style={{ opacity: 0, width: "100%" }}>

          {/* ── Tagline ── */}
          <p
            data-testid="text-footer-tagline"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.58rem, 1.1vw, 0.68rem)",
              letterSpacing: "0.3em",
              color: "#C6A46A",
              textTransform: "uppercase",
              margin: "0 0 1.6rem 0",
              opacity: 0.9,
            }}
          >
            Sculpted Skin. Intentional Care.
          </p>

          {/* ── Supporting copy ── */}
          <p
            data-testid="text-footer-message"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.78rem, 1.5vw, 0.88rem)",
              fontWeight: 300,
              lineHeight: 1.9,
              letterSpacing: "0.03em",
              color: "rgba(244, 239, 233, 0.55)",
              margin: "0 auto 2.8rem auto",
              maxWidth: "500px",
            }}
          >
            Performance-driven body care designed to support the skin barrier
            and elevate your everyday.
          </p>

          {/* ── CTA button — no brackets, thin gold border, subtle hover ── */}
          <div style={{ marginBottom: "clamp(3.5rem, 7vw, 6rem)" }}>
            <a
              href={TALLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-footer-cta"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.58rem",
                letterSpacing: "0.3em",
                color: "#C6A46A",
                textDecoration: "none",
                textTransform: "uppercase",
                border: "1px solid rgba(198, 164, 106, 0.5)",
                padding: "0.9rem 2.6rem",
                display: "inline-block",
                backgroundColor: "transparent",
                transition:
                  "background-color 0.3s ease, border-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = "rgba(198, 164, 106, 0.07)";
                el.style.borderColor = "rgba(198, 164, 106, 0.75)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = "transparent";
                el.style.borderColor = "rgba(198, 164, 106, 0.5)";
              }}
            >
              Discover the Founder Circle
            </a>
          </div>

          {/* ── Divider ── */}
          <div style={thinDivider} />

          {/* ── Nav + Instagram row ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "clamp(1.4rem, 3.5vw, 2.8rem)",
              padding: "clamp(1.6rem, 3vw, 2.4rem) 0",
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
                  data-testid={`link-footer-nav-${link.label
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  style={navLinkStyle}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "#C6A46A")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color =
                      "rgba(244, 239, 233, 0.55)")
                  }
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  data-testid={`link-footer-nav-${link.label
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  style={navLinkStyle}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#C6A46A")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "rgba(244, 239, 233, 0.55)")
                  }
                >
                  {link.label}
                </Link>
              )
            )}

            <a
              href="https://www.instagram.com/olymskin"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-footer-instagram"
              aria-label="OLYM SKIN on Instagram"
              style={{
                color: "rgba(244, 239, 233, 0.45)",
                textDecoration: "none",
                transition: "color 0.25s ease",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#C6A46A")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "rgba(244, 239, 233, 0.45)")
              }
            >
              <Instagram size={15} strokeWidth={1.3} />
            </a>
          </div>

          {/* ── Divider above legal ── */}
          <div style={thinDivider} />

          {/* ── Legal + copyright ── */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "1.8rem",
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
                data-testid={`link-footer-legal-${link.label
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                style={{
                  ...navLinkStyle,
                  fontSize: "0.56rem",
                  letterSpacing: "0.16em",
                  color: "rgba(244, 239, 233, 0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#C6A46A";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "rgba(244, 239, 233, 0.3)";
                }}
              >
                {link.label}
              </Link>
            ))}

            <p
              data-testid="text-footer-copyright"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.56rem",
                letterSpacing: "0.14em",
                color: "rgba(244, 239, 233, 0.3)",
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
