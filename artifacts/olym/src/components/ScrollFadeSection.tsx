import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: ReactNode;
  zIndex: number;
  /**
   * stickyPin=true: wraps children in a sticky inner div and adds a scroll
   * buffer so the section holds at the top while the next section fades in.
   * Use for sections that DON'T already self-pin via GSAP (everything except
   * PinnedStorySection).
   *
   * stickyPin=false (default): the wrapper div has NO opacity/transform/
   * will-change so it does NOT become a containing block—this is critical to
   * avoid breaking GSAP's position:fixed pin inside PinnedStorySection.
   * Opacity is applied directly to the first child element.
   */
  stickyPin?: boolean;
  /** Extra scroll height added for the pin hold. Default "32vh". */
  pinBuffer?: string;
}

export default function ScrollFadeSection({
  children,
  zIndex,
  stickyPin = false,
  pinBuffer = "32vh",
}: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // For stickyPin sections: animate the inner sticky wrapper.
    // For GSAP-pinned sections: animate firstElementChild (the <section>)
    // directly — the outer div MUST stay free of opacity/transform so it
    // doesn't become a containing block for position:fixed children.
    const target: HTMLElement | null = stickyPin
      ? innerRef.current
      : (outer.firstElementChild as HTMLElement | null);

    if (!target) return;

    gsap.set(target, { opacity: 0 });

    const tween = gsap.to(target, {
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: outer,
        start: "top 92%",
        end: "top 18%",
        scrub: 1.6,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(target, { clearProps: "opacity" });
    };
  }, [stickyPin]);

  /* ── stickyPin layout ──────────────────────────────────────────────────── */
  if (stickyPin) {
    return (
      <div
        ref={outerRef}
        style={{
          position: "relative",
          zIndex,
          // paddingBottom creates the extra scroll space during which the
          // sticky inner div holds at the top while the next section fades in.
          paddingBottom: pinBuffer,
        }}
      >
        <div
          ref={innerRef}
          style={{ position: "sticky", top: 0 }}
        >
          {children}
        </div>
      </div>
    );
  }

  /* ── non-sticky layout (for GSAP-pinned sections) ──────────────────────── */
  // Intentionally NO opacity / transform / will-change on this div.
  return (
    <div ref={outerRef} style={{ position: "relative", zIndex }}>
      {children}
    </div>
  );
}
