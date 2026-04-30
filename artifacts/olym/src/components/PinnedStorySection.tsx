import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PinnedStorySectionProps {
  id: string;
  lines: string[];
  /**
   * One image URL per line. The image at index i is shown while line i is visible.
   * If imageSrcs has fewer entries than lines, the last image repeats.
   * Falls back to imageSrc (single) for backward compatibility.
   * Replace each URL with your own — e.g. /images/story1-a.jpg
   */
  imageSrcs?: string[];
  /** Single image fallback (used if imageSrcs is not provided) */
  imageSrc?: string;
  imagePosition?: string;
  testId?: string;
}

export default function PinnedStorySection({
  id,
  lines,
  imageSrcs,
  imageSrc,
  imagePosition = "center",
  testId = "section-pinned-story",
}: PinnedStorySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Build resolved image list: one per line
  const FALLBACK = "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1920&q=80&fit=crop";
  const resolvedImages: string[] = lines.map((_, i) => {
    if (imageSrcs && imageSrcs.length > 0) {
      return imageSrcs[Math.min(i, imageSrcs.length - 1)];
    }
    return imageSrc || FALLBACK;
  });

  const n = lines.length;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${n * 340}`,
          scrub: 1.8,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Overlay breathes slightly as user scrolls
      if (overlayRef.current) {
        tl.fromTo(
          overlayRef.current,
          { opacity: 0.52 },
          { opacity: 0.74, duration: 1 },
          0
        );
      }

      // Text lines and image crossfades are tied to the same stage position.
      // Line i becomes active at stageStart = i / n.
      // Image i crossfades in at the same moment so they stay in sync.
      const fadeDuration = 0.28 / n;

      lineRefs.current.forEach((el, i) => {
        if (!el) return;
        const stageStart = i / n;

        // Animate text line in
        tl.fromTo(
          el,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.42 / n, ease: "power2.out" },
          stageStart
        );

        // On every stage after the first, crossfade to the matching image
        if (i > 0) {
          // Fade out previous image
          if (imageRefs.current[i - 1]) {
            tl.to(
              imageRefs.current[i - 1]!,
              { opacity: 0, duration: fadeDuration, ease: "power1.inOut" },
              stageStart
            );
          }
          // Fade in current image
          if (imageRefs.current[i]) {
            tl.fromTo(
              imageRefs.current[i]!,
              { opacity: 0 },
              { opacity: 1, duration: fadeDuration, ease: "power1.inOut" },
              stageStart
            );
          }
        }
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => {
          if (t.vars.trigger === section) t.kill();
        });
      };
    });

    return () => mm.revert();
  }, [n]);

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
      {/* One background div per image, stacked — crossfaded by GSAP */}
      {resolvedImages.map((src, i) => (
        <div
          key={i}
          ref={(el) => { imageRefs.current[i] = el; }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: imagePosition,
            backgroundRepeat: "no-repeat",
            // First image starts visible; rest start hidden
            opacity: i === 0 ? 1 : 0,
            willChange: "opacity",
          }}
        />
      ))}

      {/* Dark gradient overlay */}
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(10,10,10,0.7) 0%, rgba(59,10,15,0.45) 100%)",
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
          maxWidth: "900px",
        }}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              display: "block",
              overflow: "visible",
              marginBottom: i < lines.length - 1 ? "0.6rem" : 0,
            }}
          >
            <span
              ref={(el) => { lineRefs.current[i] = el; }}
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
