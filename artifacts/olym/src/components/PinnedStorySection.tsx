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

const isMobileBreakpoint =
  typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;

const isWebview =
  typeof navigator !== "undefined" &&
  /Instagram|FBAN|FBAV|Twitter|LinkedInApp/i.test(navigator.userAgent);

const PX_PER_LINE_DESKTOP = 280;
const PX_PER_LINE_MOBILE = isWebview ? 160 : 190;
const SCRUB_DESKTOP = 1.6;
const SCRUB_MOBILE = isWebview ? 0.6 : 0.9;

const FALLBACK =
  "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1080&q=78&fit=crop";

export default function PinnedStorySection({
  id,
  lines,
  imageSrc,
  imagePosition = "center",
  testId = "section-pinned-story",
}: PinnedStorySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  const pxPerLine = isMobileBreakpoint ? PX_PER_LINE_MOBILE : PX_PER_LINE_DESKTOP;
  const scrub = isMobileBreakpoint ? SCRUB_MOBILE : SCRUB_DESKTOP;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(lineRefs.current, { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${lines.length * pxPerLine}`,
          scrub,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
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

        tl.to(line, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" });
        tl.to(line, { opacity: 1, y: 0, duration: 0.45, ease: "none" });

        if (index !== lineRefs.current.length - 1) {
          tl.to(line, { opacity: 0.28, y: -18, duration: 0.55, ease: "power2.inOut" });
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
  }, [lines.length, pxPerLine, scrub]);

  return (
    <section
      ref={sectionRef}
      id={id}
      data-testid={testId}
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
      {/* Background image — <img> so onLoad fires for ScrollTrigger.refresh() */}
      <img
        src={imageSrc || FALLBACK}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        onLoad={() => ScrollTrigger.refresh()}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: imagePosition,
          display: "block",
        }}
      />

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
  );
}
