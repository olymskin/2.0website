import { useEffect, useState } from "react";

type Phase = "visible" | "exit" | "done";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("visible");

  useEffect(() => {
    const MIN_SHOW = 900;
    const start = Date.now();

    const trigger = () => {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_SHOW - elapsed);
      setTimeout(() => setPhase("exit"), wait);
    };

    if (document.readyState === "complete") {
      trigger();
    } else {
      window.addEventListener("load", trigger, { once: true });
      return () => window.removeEventListener("load", trigger);
    }
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`olym-loader${phase === "exit" ? " olym-loader--exit" : ""}`}
      onAnimationEnd={() => phase === "exit" && setPhase("done")}
      aria-hidden="true"
    >
      {/* Grain texture overlay */}
      <div className="olym-loader__grain" />

      {/* Vignette */}
      <div className="olym-loader__vignette" />

      {/* Center content */}
      <div className="olym-loader__center">
        <span className="olym-loader__logo">OLYM</span>
        <span className="olym-loader__divider" />
        <span className="olym-loader__sub">SKIN</span>
      </div>
    </div>
  );
}
