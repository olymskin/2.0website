import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const tween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      if (tween.current) tween.current.kill();

      if (diff > 0 && currentY > 80) {
        tween.current = gsap.to(header, {
          autoAlpha: 0,
          y: -20,
          duration: 0.5,
          ease: "power2.inOut",
        });
      } else {
        tween.current = gsap.to(header, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }}
      data-testid="header"
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: "1.5rem 1.5rem",
          flexDirection: "column",
          gap: "0.3rem",
        }}
      >
        <div
          data-testid="text-logo"
          style={{
            display: "block",
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.7rem, 1.4vw, 0.82rem)",
            letterSpacing: "0.32em",
            color: "#F5EDE4",
            fontWeight: 300,
            textTransform: "uppercase",
            lineHeight: 1,
            textAlign: "center",
          }}
        >
          OLYM SKIN
        </div>
        <div
          data-testid="text-logo-sub"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.52rem, 1vw, 0.6rem)",
            letterSpacing: "0.32em",
            color: "#C6A46A",
            fontWeight: 300,
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          FOUNDER CIRCLE
        </div>
      </div>
    </header>
  );
}
