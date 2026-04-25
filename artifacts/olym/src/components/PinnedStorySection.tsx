import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PinnedStorySectionProps {
  id: string;
  lines: string[];
  /* Replace with your image URL — e.g. /images/story1.jpg */
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
  testId?: string;
}

export default function PinnedStorySection({
  id,
  lines,
  imageSrc,
  imageAlt = "OLYM skincare",
  imagePosition = "center",
  testId = "section-pinned-story",
}: PinnedStorySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const matchMedia = gsap.matchMedia();

    matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${lines.length * 300}`,
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      if (overlayRef.current) {
        tl.fromTo(
          overlayRef.current,
          { opacity: 0.5 },
          { opacity: 0.72, duration: 0.4 },
          0
        );
      }

      lineRefs.current.forEach((el, i) => {
        if (!el) return;
        const start = i / lines.length;
        tl.fromTo(
          el,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          start
        );
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => {
          if (t.vars.trigger === section) t.kill();
        });
      };
    });

    return () => matchMedia.revert();
  }, [lines]);

  const placeholder = `https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1920&q=80&fit=crop`;

  return (
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
      {/* Background image — replace imageSrc prop to customize */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${imageSrc || placeholder})`,
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
            "linear-gradient(135deg, rgba(10,10,10,0.7) 0%, rgba(59,10,15,0.45) 100%)",
        }}
      />

      {/* Text lines */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 1.5rem",
          maxWidth: "900px",
        }}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            style={{ display: "block", overflow: "visible", marginBottom: i < lines.length - 1 ? "0.6rem" : 0 }}
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
              }}
            >
              {line}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
