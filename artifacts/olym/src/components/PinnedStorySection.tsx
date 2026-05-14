import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PinnedStorySectionProps {
  id: string;
  lines: string[];
  imageSrc?: string;
  imagePosition?: string;
  testId?: string;
}

export default function PinnedStorySection({
  id,
  lines,
  imageSrc,
  imagePosition = "center",
  testId = "section-pinned-story",
}: PinnedStorySectionProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  const FALLBACK =
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1920&q=80&fit=crop";

  const outerHeight = `${lines.length * 70 + 100}vh`;

  useEffect(() => {
    const outer = outerRef.current;
    const section = sectionRef.current;
    if (!outer || !section) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(lineRefs.current, { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.6,
          pin: section,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          pinSpacing: false,
        },
      });

      if (overlayRef.current) {
        tl.fromTo(
          overlayRef.current,
          { opacity: 0.58 },
          { opacity: 0.72, duration: 0.8, ease: "none" },
          0
        );
      }

      lineRefs.current.forEach((line, index) => {
        if (!line) return;

        tl.to(line, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        });

        tl.to(line, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "none",
        });

        if (index !== lineRefs.current.length - 1) {
          tl.to(line, {
            opacity: 0.28,
            y: -18,
            duration: 0.55,
            ease: "power2.inOut",
          });
        }
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(lineRefs.current, { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, [lines.length]);

  return (
    <div
      ref={outerRef}
      style={{ position: "relative", height: outerHeight }}
    >
      <section
        ref={sectionRef}
        id={id}
        data-testid={testId}
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
        {/* Single stable background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${imageSrc || FALLBACK})`,
            backgroundSize: "cover",
            backgroundPosition: imagePosition,
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Dark gradient overlay */}
        <div
          ref={overlayRef}
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(10,10,10,0.74) 0%, rgba(59,10,15,0.42) 100%)",
            zIndex: 1,
          }}
        />

        {/* Text lines */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            padding: "0 1.5rem",
            maxWidth: "980px",
          }}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                display: "block",
                overflow: "visible",
                marginBottom: i < lines.length - 1 ? "0.8rem" : 0,
              }}
            >
              <span
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                data-testid={`text-story-line-${i}`}
                style={{
                  display: "block",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(2rem, 5.5vw, 5rem)",
                  fontWeight: 300,
                  lineHeight: 1.12,
                  letterSpacing: "0.01em",
                  color: "#F4EFE9",
                  opacity: 0,
                  fontStyle: i % 2 === 0 ? "normal" : "italic",
                  willChange: "opacity, transform",
                }}
              >
                {line}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
