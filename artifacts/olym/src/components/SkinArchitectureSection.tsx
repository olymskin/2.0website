import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const facts = [
  [
    "VISIBLE DEHYDRATION",
    "On deeper skin, even slight dehydration creates micro texture appearing as ashiness, dullness, and uneven tone.",
  ],
  [
    "BARRIER REACTIVITY",
    "Friction, shaving, and environmental stress can make barrier disruption more visible on melanated skin.",
  ],
  [
    "IMPROPER FORMULATIONS",
    "Heavy formulas sit. Lighter formulas fade. Neither sustains hydration in a way that preserves appearance.",
  ],
  [
    "FRICTION SENSITIVITY",
    "Elbows, knees, and inner thighs are more prone to pigment imbalance and need hydration without buildup or residue.",
  ],
];

export default function SkinArchitectureSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const videoWrapRef = useRef<HTMLDivElement | null>(null);
  const factRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const videoWrap = videoWrapRef.current;

    if (!section || !heading || !videoWrap) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(heading, {
        opacity: 0,
        y: 28,
      });

      gsap.set(videoWrap, {
        scale: 0.68,
        y: 50,
        rotateX: 2,
        transformOrigin: "center center",
      });

      factRefs.current.forEach((fact) => {
        if (!fact) return;

        gsap.set(fact, { opacity: 0, y: 18 });
        gsap.set(fact.querySelector(".skin-callout-dot"), { scale: 0 });
        gsap.set(fact.querySelector(".skin-callout-line"), { scaleX: 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=4200",
          scrub: 1.35,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(heading, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      tl.to(
        videoWrap,
        {
          scale: 0.95,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          ease: "power2.out",
        },
        "<0.15"
      );

      tl.to(videoWrap, {
        scale: 1.05,
        y: -26,
        duration: 0.8,
        ease: "sine.inOut",
      });

      facts.forEach((_, i) => {
        const fact = factRefs.current[i];
        if (!fact) return;

        tl.to(
          videoWrap,
          {
            scale: 1.05 + i * 0.025,
            y: -26 - i * 8,
            rotateZ: i % 2 === 0 ? 0.35 : -0.35,
            duration: 0.75,
            ease: "sine.inOut",
          },
          "+=0.1"
        );

        tl.to(fact, { opacity: 1, y: 0, duration: 0.35 }, "<");

        tl.to(
          fact.querySelector(".skin-callout-dot"),
          { scale: 1, duration: 0.22, ease: "back.out(2)" },
          "<"
        );

        tl.to(
          fact.querySelector(".skin-callout-line"),
          { scaleX: 1, duration: 0.45, ease: "power2.out" },
          "<0.08"
        );

        tl.to(fact, { opacity: 0, y: -12, duration: 0.35 }, "+=0.8");
      });

      tl.to(videoWrap, {
        scale: 1,
        y: -20,
        rotateZ: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skin-architecture"
      style={{
        position: "relative",
        height: "100dvh",
        minHeight: "680px",
        width: "100%",
        overflow: "hidden",
        background: "#140003",
        color: "#F4EFE9",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "radial-gradient(circle at 50% 58%, rgba(120,20,30,0.22), rgba(20,0,3,0.08) 58%, rgba(10,10,10,0.12) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        ref={headingRef}
        style={{
          position: "absolute",
          top: "clamp(5rem, 8vh, 7rem)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 6,
          width: "min(88vw, 900px)",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1.6rem, 4vw, 3rem)",
            fontWeight: 300,
            letterSpacing: "0.06em",
            color: "#F4EFE9",
            fontStyle: "bold",
          }}
        >
          The Biology of Melanated Skin
        </h2>
      </div>

      <div
        ref={videoWrapRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          zIndex: 2,
          /* Mobile: ~300px (80vw at 375px). Tablet: ~55vw. Desktop: capped at 580px.
             Down from 980px — gives the visualization room to breathe on wide screens. */
          width: "clamp(280px, 55vw, 580px)",
          transform: "translate(-50%, -50%)",
          perspective: "1200px",
          willChange: "transform",
        }}
      >
        <video
          src="/skin/skinlayers.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            borderRadius: "0px",
            pointerEvents: "none",
            userSelect: "none",
            mixBlendMode: "lighten",
            opacity: 0.88,
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 50%, rgba(0,0,0,0.78) 64%, rgba(0,0,0,0.32) 82%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse at center, black 50%, rgba(0,0,0,0.78) 64%, rgba(0,0,0,0.32) 82%, transparent 100%)",
            filter:
              "drop-shadow(0 55px 110px rgba(0,0,0,0.62)) saturate(1.08) contrast(1.03)",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: "clamp(1.25rem, 7vw, 7rem)",
          bottom: "clamp(3rem, 12vh, 8rem)",
          zIndex: 5,
          width: "min(84vw, 430px)",
        }}
      >
        {facts.map(([title, body], i) => (
          <div
            key={title}
            ref={(el) => {
              factRefs.current[i] = el;
            }}
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <span
                className="skin-callout-dot"
                style={{
                  width: 7,
                  height: 7,
                  display: "block",
                  background: "#D6B56D",
                  boxShadow: "0 0 18px rgba(214,181,109,0.7)",
                }}
              />

              <span
                className="skin-callout-line"
                style={{
                  width: "150px",
                  height: 1,
                  display: "block",
                  background:
                    "linear-gradient(90deg, #D6B56D, rgba(214,181,109,0))",
                  transformOrigin: "left center",
                }}
              />
            </div>

            <h3
              style={{
                margin: 0,
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "clamp(0.72rem, 1vw, 0.9rem)",
                letterSpacing: "0.18em",
                fontWeight: 600,
                color: "#F4EFE9",
              }}
            >
              {title}
            </h3>

            <p
              style={{
                margin: "0.7rem 0 0",
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "clamp(0.88rem, 1.15vw, 1rem)",
                lineHeight: 1.55,
                color: "rgba(244,239,233,0.76)",
              }}
            >
              {body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}