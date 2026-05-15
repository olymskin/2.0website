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
   * Viewport-height units of scroll travel allocated per line.
   * e.g. 58 means each story beat consumes 58vh of scroll distance.
   */
  vhPerLine?: number;
  /**
   * When true, only one line is visible at a time — previous lines fade fully
   * to opacity 0 before the next appears, giving a clean cinematic sequence.
   * When false (default) previous lines dim to 0.18 and remain faintly visible.
   */
  oneAtATime?: boolean;
}

export default function StorySequence({ panels, vhPerLine = 44, oneAtATime = false }: Props) {
  const sequenceRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  // Resolve at first render so only the matching asset URL is ever injected
  // into the style — the browser will never request the other file.
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
      // Each line gets 1 "unit" of timeline time.
      // oneAtATime: previous lines fade fully to 0 for a clean one-at-a-time feel.
      // Default: previous lines dim to 0.18 (faintly visible stack).
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

        // Text fade in
        tl.to(
          lineEl,
          { opacity: 1, y: 0, duration: fadeIn, ease: "power2.out" },
          stageStart
        );

        // Fade/dim previous line just before this one fades in
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

        // Last line stays fully visible — no dim
        if (!isLastLine) {
          tl.to(
            lineEl,
            { opacity: dimOpacity, y: dimY, duration: dimDuration, ease: "power2.in" },
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
  }, [totalLines, oneAtATime]);

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
        {/* One background div per panel, stacked — crossfaded by GSAP.
            Active image URL is chosen at render time so the browser never
            fetches the non-matching asset.
            backgroundColor fallback ensures the section is never solid black
            while the background image is still loading.
            <img> is used (instead of background-image) so we can fire
            ScrollTrigger.refresh() on mobile after the first image loads —
            background-image provides no onLoad hook. Desktop visuals are
            identical: object-fit:cover matches background-size:cover. */}
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
                onLoad={
                  i === 0
                    ? () => {
                        if (!isDesktop) ScrollTrigger.refresh();
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

        {/* All text lines stacked in the centre.
            maxHeight + overflow:hidden prevents stacked invisible lines from
            pushing the flex container taller than the viewport on desktop,
            which would cause the flex centering to push visible lines out of frame. */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            padding: "4vh 1.5rem",
            maxWidth: "980px",
            maxHeight: "calc(100dvh - 4rem)",
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
