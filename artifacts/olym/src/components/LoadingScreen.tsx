import { useEffect, useState } from "react";

type Phase = "visible" | "exit" | "done";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("visible");

  useEffect(() => {
    const MIN_SHOW = 1800;   // minimum ms the loader stays visible
    const MAX_WAIT = 6000;   // hard cap — never block longer than this
    const start = Date.now();
    let dismissed = false;

    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_SHOW - elapsed);
      window.setTimeout(() => setPhase("exit"), wait);
    };

    // Hard cap so a slow network never locks the user out
    const hardTimeout = window.setTimeout(dismiss, MAX_WAIT);

    // Primary signal: hero video/image is ready to display
    window.addEventListener("olym:hero-ready", dismiss, { once: true });

    // Fallback: window.load fires when all sub-resources finish
    const onLoad = () => window.setTimeout(dismiss, 300);
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      clearTimeout(hardTimeout);
      window.removeEventListener("olym:hero-ready", dismiss);
      window.removeEventListener("load", onLoad);
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
