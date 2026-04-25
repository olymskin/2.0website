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
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.75rem 2.5rem",
        }}
      >
        {/* Menu icon — top left */}
        <button
          aria-label="Menu"
          data-testid="button-menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            padding: "4px",
          }}
        >
          <span
            style={{
              display: "block",
              width: "22px",
              height: "1px",
              backgroundColor: "#F4EFE9",
              opacity: 0.8,
            }}
          />
          <span
            style={{
              display: "block",
              width: "14px",
              height: "1px",
              backgroundColor: "#F4EFE9",
              opacity: 0.8,
            }}
          />
        </button>

        {/* Logo — top right */}
        <div
          data-testid="text-logo"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "1.05rem",
            letterSpacing: "0.35em",
            color: "#F4EFE9",
            fontWeight: 400,
            textTransform: "uppercase",
          }}
        >
          OLYM
        </div>
      </div>
    </header>
  );
}
