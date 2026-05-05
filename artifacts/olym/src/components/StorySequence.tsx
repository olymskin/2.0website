import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface StoryPanel {
  id?: string;
  lines: string[];
  imageSrc: string;
  imagePosition?: string;
}

interface Props {
  panels: StoryPanel[];
  /**
   * Viewport-height units of scroll travel allocated per line.
   * e.g. 58 means each story beat consumes 58vh of scroll distance.
   */
  vhPerLine?: number;
}

export default function StorySequence({ panels, vhPerLine = 58 }: Props) {
  const sequenceRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Flatten panels into a single ordered line list with metadata
  const allLines = panels.flatMap((panel, panelIdx) =>
    panel.lines.map((text, lineIdxInPanel) => ({
      text,
      panelIdx,
      isFirstInPanel: lineIdxInPanel === 0,
    }))
  );
  const totalLines = allLines.length;

  useEffect(() => {
    const sequence = sequenceRef.current;
    const pin = pinRef.current;
    if (!sequence || !pin) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // ── Initial states ──────────────────────────────────────────────────
      lineRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 32 });
      });
      imageRefs.current.forEach((el, i) => {
        if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0 });
      });

      // ── One timeline, one pin ────────────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sequence,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          pin: pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Subtle overlay breathe
      if (overlayRef.current) {
        tl.fromTo(
          overlayRef.current,
          { opacity: 0.56 },
          { opacity: 0.74, duration: totalLines, ease: "none" },
          0
        );
      }

      // ── Animate each line and its matching image ─────────────────────────
      // Each line gets 1 "unit" of timeline time.
      // At line i's stage: fade text in, optionally crossfade image.
      // Before line i+1: dim line i.
      allLines.forEach(({ panelIdx, isFirstInPanel }, i) => {
        const stageStart = i;        // absolute timeline second
        const fadeIn = 0.38;
        const hold = 0.30;
        const dimStart = stageStart + fadeIn + hold;
        const dimDuration = 0.32;
        const isLastLine = i === totalLines - 1;

        const lineEl = lineRefs.current[i];
        if (!lineEl) return;

        // Text fade in
        tl.to(
          lineEl,
          { opacity: 1, y: 0, duration: fadeIn, ease: "power2.out" },
          stageStart
        );

        // Dim previous line just before this one fades in
        if (i > 0) {
          const prev = lineRefs.current[i - 1];
          if (prev) {
            tl.to(
              prev,
              { opacity: 0.18, y: -14, duration: 0.28, ease: "power2.in" },
              stageStart - 0.1
            );
          }
        }

        // Last line stays fully visible — no dim
        if (!isLastLine) {
          tl.to(
            lineEl,
            { opacity: 0.18, y: -14, duration: dimDuration, ease: "power2.in" },
            dimStart
          );
        }

        // Image crossfade: happens when the first line of a new panel enters
        if (i > 0 && isFirstInPanel) {
          const prevImg = imageRefs.current[panelIdx - 1];
          const nextImg = imageRefs.current[panelIdx];
          const crossDuration = 0.55;

          if (prevImg) {
            tl.to(
              prevImg,
              { opacity: 0, duration: crossDuration, ease: "power1.inOut" },
              stageStart
            );
          }
          if (nextImg) {
            tl.to(
              nextImg,
              { opacity: 1, duration: crossDuration, ease: "power1.inOut" },
              stageStart
            );
          }
        }
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      lineRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 1, y: 0 });
      });
      imageRefs.current.forEach((el, i) => {
        if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0 });
      });
    });

    return () => mm.revert();
  }, [totalLines]);

  // Scroll container height: totalLines × vhPerLine gives the scroll travel,
  // plus 100vh so the pin ends exactly at the viewport bottom.
  const seqHeight = `${totalLines * vhPerLine + 100}vh`;

  return (
    <div
      ref={sequenceRef}
      style={{ position: "relative", height: seqHeight }}
    >
      {/* ── Pinned visual stage ─────────────────────────────────────────── */}
      <div
        ref={pinRef}
        style={{
          height: "100dvh",
          minHeight: "600px",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* One background div per panel, stacked — crossfaded by GSAP */}
        {panels.map((panel, i) => (
          <div
            key={i}
            ref={(el) => {
              imageRefs.current[i] = el;
            }}
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${panel.imageSrc})`,
              backgroundSize: "cover",
              backgroundPosition: panel.imagePosition ?? "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        ))}

        {/* Dark cinematic overlay */}
        <div
          ref={overlayRef}
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(10,10,10,0.72) 0%, rgba(59,10,15,0.42) 100%)",
            zIndex: 1,
          }}
        />

        {/* All text lines stacked in the centre */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            padding: "0 1.5rem",
            maxWidth: "980px",
          }}
        >
          {allLines.map(({ text }, i) => (
            <div
              key={i}
              style={{
                display: "block",
                overflow: "visible",
                marginBottom: i < allLines.length - 1 ? "0.8rem" : 0,
              }}
            >
              <span
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
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
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
