import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINES = [
  "Before it becomes public, it's refined.",
  "A private development circle for women shaping the future of skin.",
  "Inside the Founder Circle.",
];

interface FounderCircleSectionProps {
  imageSrc?: string;
}

export default function FounderCircleSection({
  imageSrc,
}: FounderCircleSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const buttonRef = useRef<HTMLAnchorElement | null>(null);

  const placeholder =
    "https://images.unsplash.com/photo-1629109553059-a2e26b58f0b7?w=1920&q=80&fit=crop";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const matchMedia = gsap.matchMedia();

    matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${LINES.length * 260}`,
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      lineRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.fromTo(
          el,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          0.18 + i / LINES.length
        );
      });

      if (buttonRef.current) {
        tl.fromTo(
          buttonRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
          0.82
        );
      }

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => matchMedia.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="founder-circle"
      data-testid="section-founder-circle"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${imageSrc || placeholder})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(10,10,10,0.82) 0%, rgba(74,11,18,0.55) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 1.5rem",
          maxWidth: "760px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.2rem",
        }}
      >
        {LINES.map((line, i) => {
          const isStatement = i >= 2;

          return (
            <span
              key={i}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              data-testid={`text-founder-line-${i}`}
              style={{
                display: "block",
                fontFamily: isStatement
                  ? "'Cormorant Garamond', Georgia, serif"
                  : "'Inter', sans-serif",
                fontSize: isStatement
                  ? "clamp(2rem, 4.5vw, 4rem)"
                  : "clamp(0.85rem, 1.6vw, 1rem)",
                fontWeight: 300,
                lineHeight: isStatement ? 1.15 : 1.45,
                letterSpacing: isStatement ? "0.05em" : "0.1em",
                color: isStatement ? "#F4EFE9" : "#A89C92",
                opacity: 0,
                fontStyle: isStatement ? "italic" : "normal",
                textTransform: isStatement ? "none" : "uppercase",
              }}
            >
              {line}
            </span>
          );
        })}

        <a
          ref={buttonRef}
          href="https://circle.olymskin.com/"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="link-founder-apply"
          className="olym-btn-gold"
          style={{
            textDecoration: "none",
            display: "inline-block",
            fontSize: "0.72rem",
            letterSpacing: "0.22em",
            padding: "1rem 3rem",
            marginTop: "2rem",
            opacity: 0,
          }}
        >
          Apply for access
        </a>
      </div>
    </section>
  );
}
