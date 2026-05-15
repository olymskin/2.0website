import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface StoryPanel {
  id?: string;
  lines: string[];
  imageSrc: string;
  desktopImageSrc?: string;
  /** object-position used on all viewports (and desktop always uses this). */
  imagePosition?: string;
  /** Overrides imagePosition on mobile (< 1024px) only. Desktop ignores this. */
  mobileImagePosition?: string;
}

interface Props {
  panels: StoryPanel[];
  /**
   * Viewport-height units of scroll travel allocated per line on desktop.
   * Mobile always uses a reduced value (mobileVhPerLine) for performance.
   */
  vhPerLine?: number;
  /**
   * When true, only one line is visible at a time — previous lines fade fully
   * to opacity 0 before the next appears, giving a clean cinematic sequence.
   * When false (default) previous lines dim to 0.18 and remain faintly visible.
   */
  oneAtATime?: boolean;
}

// Detected once at module level — stable across re-renders, no resize listener needed
// (page must reload to change between mobile/desktop breakpoints in practice).
const isMobileBreakpoint =
  typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;

// Instagram / Facebook in-app browser UA detection for extra-conservative tuning
const isWebview =
  typeof navigator !== "undefined" &&
  /Instagram|FBAN|FBAV|Twitter|LinkedInApp/i.test(navigator.userAgent);

const MOBILE_VH_PER_LINE = isWebview ? 26 : 30;
const MOBILE_SCRUB = isWebview ? 0.6 : 0.8;
const DESKTOP_SCRUB = 1.2;

export default function StorySequence({ panels, vhPerLine = 44, oneAtATime = false }: Props) {
  const sequenceRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = useState<boolean>(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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

  // Use reduced scroll distance on mobile for performance
  const effectiveVhPerLine = isMobileBreakpoint ? MOBILE_VH_PER_LINE : vhPerLine;
  const effectiveScrub = isMobileBreakpoint ? MOBILE_SCRUB : DESKTOP_SCRUB;

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
          scrub: effectiveScrub,
          pin: pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          pinSpacing: false,
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
      const dimOpacity = oneAtATime ? 0 : 0.18;
      const dimY = oneAtATime ? 0 : -14;

      allLines.forEach(({ panelIdx, isFirstInPanel }, i) => {
        const stageStart = i;
        const fadeIn = 0.38;
        const hold = 0.30;
        const dimStart = stageStart + fadeIn + hold;
        const dimDuration = oneAtATime ? 0.28 : 0.32;
        const isLastLine = i === totalLines - 1;

        const lineEl = lineRefs.current[i];
        if (!lineEl) return;

        tl.to(
          lineEl,
          { opacity: 1, y: 0, duration: fadeIn, ease: "power2.out" },
          stageStart
        );

        if (i > 0) {
          const prev = lineRefs.current[i - 1];
          if (prev) {
            tl.to(
              prev,
              { opacity: dimOpacity, y: dimY, duration: 0.28, ease: "power2.in" },
              stageStart - 0.1
            );
          }
        }

        if (!isLastLine) {
          tl.to(
            lineEl,
            { opacity: dimOpacity, y: dimY, duration: dimDuration, ease: "power2.in" },
            dimStart
          );
        }

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
  }, [totalLines, oneAtATime, effectiveScrub]);

  // Outer scroll-container height: scroll travel = totalLines × vhPerLine,
  // plus 100vh so the pin ends exactly at the viewport bottom.
  const seqHeight = `${totalLines * effectiveVhPerLine + 100}vh`;

  return (
    <div
      ref={sequenceRef}
      style={{ position: "relative", height: seqHeight }}
    >
      {/* ── Pinned visual stage ─────────────────────────────────────────── */}
      <div
        ref={pinRef}
        style={{
          height: "100vh",
          minHeight: "100vh",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {panels.map((panel, i) => {
          const activeSrc =
            isDesktop && panel.desktopImageSrc
              ? panel.desktopImageSrc
              : panel.imageSrc;
          return (
            <div
              key={i}
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "#1a0204",
              }}
            >
              <img
                src={activeSrc}
                alt=""
                aria-hidden="true"
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                onLoad={
                  i === 0
                    ? () => {
                        ScrollTrigger.refresh();
                      }
                    : undefined
                }
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition:
                    !isDesktop && panel.mobileImagePosition
                      ? panel.mobileImagePosition
                      : (panel.imagePosition ?? "center center"),
                }}
              />
            </div>
          );
        })}

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

        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            padding: "4vh 1.5rem",
            maxWidth: "980px",
            maxHeight: "calc(100vh - 4rem)",
            overflow: "hidden",
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
                  fontSize: "clamp(2rem, 5.5vw, 3.2rem)",
                  fontWeight: 300,
                  lineHeight: 1.12,
                  letterSpacing: "0.01em",
                  color: "#F4EFE9",
                  opacity: 0,
                  fontStyle: i % 2 === 0 ? "normal" : "italic",
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
