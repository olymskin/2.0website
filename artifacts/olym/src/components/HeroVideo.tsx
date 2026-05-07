import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

interface HeroVideoProps {
  onEnter: () => void;
}

export default function HeroVideo({ onEnter }: HeroVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const heroReadyFiredRef = useRef(false);

  const [isDesktop, setIsDesktop] = useState<boolean>(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Signal to LoadingScreen that the hero is ready to be revealed.
  // Called either when the video can play or after a timeout fallback.
  const signalHeroReady = useCallback(() => {
    if (heroReadyFiredRef.current) return;
    heroReadyFiredRef.current = true;
    window.dispatchEvent(new Event("olym:hero-ready"));
  }, []);

  useEffect(() => {
    // Fallback: if video never fires canplay, unblock the loader after 3s
    const fallback = window.setTimeout(signalHeroReady, 3000);
    return () => clearTimeout(fallback);
  }, [signalHeroReady]);

  // Start text animation — kept separate so it runs regardless of video state
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        opacity: 0,
        y: 30,
        duration: 2.2,
        delay: 0.6,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const videoStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center center",
    opacity: 0.55,
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      data-testid="section-hero"
      style={{
        position: "relative",
        height: "100dvh",
        minHeight: "600px",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Fallback so the section is never blank black while video buffers
        backgroundColor: "#1a0204",
      }}
    >
      {isDesktop ? (
        <video
          key="desktop"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/desktop/desktopimage1.png"
          data-testid="video-hero"
          style={videoStyle}
          onCanPlay={signalHeroReady}
          onError={signalHeroReady}
        >
          <source src="/desktop/herovideodesktop.mp4" type="video/mp4" />
        </video>
      ) : (
        <video
          key="mobile"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          data-testid="video-hero"
          style={videoStyle}
          onCanPlay={signalHeroReady}
          onError={signalHeroReady}
        >
          <source src="/images/Video.mov" type="video/mp4" />
        </video>
      )}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.05) 0%, rgba(10,10,10,0.25) 100%)",
        }}
      />

      <div
        ref={textRef}
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 1.5rem",
          maxWidth: "800px",
        }}
      >
        <h1
          data-testid="text-hero-headline"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            fontWeight: 300,
            lineHeight: 1.08,
            letterSpacing: "0.02em",
            color: "#F4EFE9",
            marginBottom: "1.5rem",
            fontStyle: "italic",
          }}
        >
          Body Care,
          <br />
          Rebuilt for Melanin.
        </h1>

        <p
          data-testid="text-hero-subtext"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.8rem, 1.8vw, 0.95rem)",
            fontWeight: 300,
            letterSpacing: "0.12em",
            color: "#A89C92",
            marginBottom: "3rem",
            textTransform: "uppercase",
          }}
        >
          Private access. Limited release. Built for melanated skin.
        </p>

        <button
          onClick={onEnter}
          data-testid="button-enter"
          className="olym-btn-gold"
        >
          Enter
        </button>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          opacity: 0.4,
        }}
      >
        <div
          style={{
            width: "1px",
            height: "48px",
            background: "linear-gradient(to bottom, transparent, #C6A46A)",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
