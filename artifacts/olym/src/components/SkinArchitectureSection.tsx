import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const scenes = [
  {
    eyebrow: "THE BIOLOGY OF MELANATED SKIN",
    phrases: ["What shows on the surface", "starts deeper."],
    explanation: "",
    align: "center",
  },
  {
    eyebrow: "VISIBLE DEHYDRATION",
    phrases: ["Visible.", "Earlier.", "Longer."],
    explanation:
      "On deeper skin, even slight dehydration can create micro texture that reads as ashiness, dullness, and uneven tone.",
    align: "left",
  },
  {
    eyebrow: "BARRIER REACTIVITY",
    phrases: ["Friction.", "Shaving.", "Environmental stress."],
    explanation:
      "When the barrier is disrupted, the visible result can appear more pronounced on melanated skin.",
    align: "right",
  },
  {
    eyebrow: "IMPROPER FORMULATIONS",
    phrases: ["Heavy formulas sit.", "Lighter formulas fade.", "Neither lasts."],
    explanation:
      "Hydration has to be sustained without buildup, residue, or a finish that disappears too quickly.",
    align: "center",
  },
  {
    eyebrow: "FRICTION SENSITIVITY",
    phrases: ["Elbows.", "Knees.", "Inner thighs."],
    explanation:
      "High-friction areas need comfort, moisture, and softness without a heavy film.",
    align: "left",
  },
  {
    eyebrow: "OLYM SKIN BEGINS THERE",
    phrases: ["This is why body care", "has to be designed differently."],
    explanation: "",
    align: "center",
  },
];

const isMobileBreakpoint =
  typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;

const isWebview =
  typeof navigator !== "undefined" &&
  /Instagram|FBAN|FBAV|Twitter|LinkedInApp/i.test(navigator.userAgent);

// Mobile: shorter scroll distance per scene; webview gets the most conservative value
const DESKTOP_VH_PER_SCENE = 155;
const MOBILE_VH_PER_SCENE = isWebview ? 90 : 105;
const DESKTOP_SCRUB = 1.35;
const MOBILE_SCRUB = isWebview ? 0.7 : 0.9;

export default function SkinArchitectureSection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement>(null);

  const vhPerScene = isMobileBreakpoint ? MOBILE_VH_PER_SCENE : DESKTOP_VH_PER_SCENE;
  const scrub = isMobileBreakpoint ? MOBILE_SCRUB : DESKTOP_SCRUB;

  useEffect(() => {
    const outer = outerRef.current;
    const pin = pinRef.current;
    if (!outer || !pin) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(sceneRefs.current, { autoAlpha: 0, y: 32 });
      gsap.set(bgRefs.current, { opacity: 0 });
      gsap.set(bgRefs.current[0], { opacity: 1 });

      const path = pathRef.current;
      let pathLength = 0;

      if (path) {
        pathLength = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          end: "bottom bottom",
          scrub,
          pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          pinSpacing: false,
        },
      });

      const totalScenes = scenes.length;

      scenes.forEach((_, i) => {
        const scene = sceneRefs.current[i];
        const bg = bgRefs.current[i];

        if (!scene) return;

        const nextOffset = pathLength - pathLength * ((i + 1) / totalScenes);

        if (bg) {
          tl.to(bgRefs.current, { opacity: 0, duration: 0.35, ease: "power1.inOut" });
          tl.to(bg, { opacity: 1, duration: 0.55, ease: "power1.inOut" }, "<");
        }

        tl.to(scene, { autoAlpha: 1, y: 0, duration: 0.65, ease: "power2.out" });
        if (path) {
          tl.to(path, { strokeDashoffset: nextOffset, duration: 0.65, ease: "power1.inOut" }, "<");
        }

        tl.to(scene, { autoAlpha: 1, y: 0, duration: 1.35, ease: "none" });

        if (i !== scenes.length - 1) {
          tl.to(scene, { autoAlpha: 0, y: -24, duration: 0.55, ease: "power2.inOut" });
        }
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(sceneRefs.current, { autoAlpha: 1, y: 0 });
      gsap.set(bgRefs.current, { opacity: 1 });
    });

    return () => mm.revert();
  }, [scrub]);

  const sectionHeight = `${scenes.length * vhPerScene}vh`;

  return (
    <section
      ref={outerRef}
      id="skin-architecture"
      style={{
        position: "relative",
        height: sectionHeight,
        background: "#0A0A0A",
      }}
    >
      <div
        ref={pinRef}
        style={{
          position: "relative",
          height: "100vh",
          minHeight: "100vh",
          overflow: "hidden",
          background: "#0A0A0A",
        }}
      >
        {scenes.map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              bgRefs.current[i] = el;
            }}
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0,
              background:
                i % 2 === 0
                  ? "radial-gradient(circle at 50% 30%, rgba(198,164,106,0.18), transparent 32%), linear-gradient(135deg, #0A0A0A 0%, #3B070A 100%)"
                  : "radial-gradient(circle at 70% 45%, rgba(244,239,233,0.10), transparent 35%), linear-gradient(135deg, #120204 0%, #3B070A 65%, #0A0A0A 100%)",
            }}
          />
        ))}

        <svg
          viewBox="0 0 390 844"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 2,
            pointerEvents: "none",
            opacity: 0.55,
          }}
        >
          <path
            ref={pathRef}
            d="M210 40 C120 180 285 260 165 390 C70 500 280 570 190 790"
            fill="none"
            stroke="#C6A46A"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>

        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.25), rgba(10,10,10,0.55))",
          }}
        />

        {scenes.map((scene, i) => {
          const isCenter = scene.align === "center";
          const isRight = scene.align === "right";

          return (
            <div
              key={i}
              ref={(el) => {
                sceneRefs.current[i] = el;
              }}
              style={{
                position: "absolute",
                zIndex: 10,
                top: isCenter ? "50%" : i === 4 ? "58%" : "50%",
                left: isRight ? "auto" : isCenter ? "50%" : "1.5rem",
                right: isRight ? "1.5rem" : "auto",
                transform: isCenter ? "translate(-50%, -50%)" : "translateY(-50%)",
                width: "min(88vw, 760px)",
                textAlign: isCenter ? "center" : isRight ? "right" : "left",
                opacity: 0,
                willChange: "opacity, transform",
              }}
            >
              <p
                style={{
                  margin: "0 0 1.1rem",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(0.68rem, 2.5vw, 0.85rem)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#C6A46A",
                }}
              >
                {scene.eyebrow}
              </p>

              {scene.phrases.map((phrase, phraseIndex) => (
                <h2
                  key={phrase}
                  style={{
                    margin: 0,
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "clamp(2.15rem, 10.5vw, 6.4rem)",
                    fontWeight: 300,
                    lineHeight: 0.96,
                    letterSpacing: "-0.03em",
                    color: "#F4EFE9",
                    fontStyle:
                      phraseIndex === scene.phrases.length - 1 && i !== 1
                        ? "italic"
                        : "normal",
                  }}
                >
                  {phrase}
                </h2>
              ))}

              {scene.explanation && (
                <p
                  style={{
                    margin: "1.4rem 0 0",
                    marginLeft: isRight ? "auto" : isCenter ? "auto" : 0,
                    marginRight: isCenter ? "auto" : 0,
                    maxWidth: "540px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(0.95rem, 3.4vw, 1.15rem)",
                    lineHeight: 1.65,
                    color: "rgba(244,239,233,0.82)",
                  }}
                >
                  {scene.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
