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

      window.setTimeout(() => {
        setPhase("exit");
      }, wait);
    };

    if (document.readyState === "complete") {
      trigger();
      return;
    }

    window.addEventListener("load", trigger, { once: true });

    return () => {
      window.removeEventListener("load", trigger);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`olym-loader${phase === "exit" ? " olym-loader--exit" : ""}`}
      onAnimationEnd={() => {
        if (phase === "exit") setPhase("done");
      }}
      aria-hidden="true"
    >
      {/* Mobile loading image — hidden on desktop */}
      <img
        src="/loadingscreen.png"
        className="olym-loader__image olym-loader__image--mobile"
        alt=""
      />
      {/* Desktop loading image — hidden on mobile */}
      <img
        src="/desktop/loadingscreendesktop.png"
        className="olym-loader__image olym-loader__image--desktop"
        alt=""
      />
    </div>
  );
}