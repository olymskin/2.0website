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
   * Use for sections that DON'T already self-pin via GSAP.
   *
   * stickyPin=false: the wrapper div has NO opacity/transform/will-change,
   * which avoids breaking GSAP position:fixed pinning inside child sections.
   */
  stickyPin?: boolean;

  /**
   * Extra scroll height added for the pin hold.
   * Lowered from 32vh to reduce excess black space between sections.
   */
  pinBuffer?: string;
}

export default function ScrollFadeSection({
  children,
  zIndex,
  stickyPin = false,
  pinBuffer = "12vh",
}: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(target, { clearProps: "opacity" });
    };
  }, [stickyPin]);

  if (stickyPin) {
    return (
      <div
        ref={outerRef}
        style={{
          position: "relative",
          zIndex,
          paddingBottom: pinBuffer,
        }}
      >
        <div ref={innerRef} style={{ position: "sticky", top: 0 }}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div ref={outerRef} style={{ position: "relative", zIndex }}>
      {children}
    </div>
  );
}