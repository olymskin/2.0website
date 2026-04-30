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

export default function FounderCircleSection({ imageSrc }: FounderCircleSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const buttonRef = useRef<HTMLAnchorElement | null>(null);

  const TALLY_URL = "https://tally.so";

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
          end: `+=${LINES.length * 320}`,
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      lineRefs.current.forEach((el, i) => {
        if (!el) return;
        const start = i / LINES.length;
        tl.fromTo(
          el,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          start
        );
      });

      if (buttonRef.current) {
        tl.fromTo(
          buttonRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
          0.75
        );
      }

      return () => {
        ScrollTrigger.getAll().forEach((t) => {
          if (t.vars.trigger === section) t.kill();
        });
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
        height: "100dvh",
        minHeight: "600px",
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
            "linear-gradient(135deg, rgba(10,10,10,0.78) 0%, rgba(59,10,15,0.6) 100%)",
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
        {LINES.map((line, i) => (
          <span
            key={i}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
            data-testid={`text-founder-line-${i}`}
            style={{
              display: "block",
              fontFamily:
                i === 2
                  ? "'Cormorant Garamond', Georgia, serif"
                  : "'Inter', sans-serif",
              fontSize:
                i === 2
                  ? "clamp(2rem, 4.5vw, 4rem)"
                  : "clamp(0.85rem, 1.6vw, 1rem)",
              fontWeight: i === 2 ? 300 : 300,
              lineHeight: 1.45,
              letterSpacing: i === 2 ? "0.05em" : "0.1em",
              color: i === 2 ? "#F4EFE9" : "#A89C92",
              opacity: 0,
              fontStyle: i === 2 ? "italic" : "normal",
              textTransform: i === 2 ? "none" : "uppercase",
            }}
          >
            {line}
          </span>
        ))}

        <a
          ref={buttonRef}
          href={TALLY_URL}
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