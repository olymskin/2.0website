import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import HeroVideo from "@/components/HeroVideo";
import StorySequence from "@/components/StorySequence";
import PinnedStorySection from "@/components/PinnedStorySection";
import SkinArchitectureSection from "@/components/SkinArchitectureSection";
import RichTextSection from "@/components/RichTextSection";
import ProductExperience from "@/components/ProductExperience";
import HeroImageSection from "@/components/HeroImageSection";
import FounderCircleSection from "@/components/FounderCircleSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
gsap.registerPlugin(ScrollTrigger);

// Prevent mobile resize jitter and lag accumulation from hurting scrub smoothness
ScrollTrigger.config({ ignoreMobileResize: true });
gsap.ticker.lagSmoothing(500, 33);

export default function Home() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // First refresh after ~400ms — catches early layout shifts from fonts/images.
    // Second refresh on window.load — catches anything that settles later
    // (large images, web fonts, video metadata). Using readyState guard so we
    // don't miss the event if it already fired before React mounted.
    const id = setTimeout(() => ScrollTrigger.refresh(), 400);

    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      clearTimeout(id);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <main style={{ backgroundColor: "#0A0A0A", overflowX: "hidden" }}>
      <Header />

      {/* 1. Hero — normal scroll */}
      <HeroVideo onEnter={() => scrollToSection("story-1")} />

      {/* ── Story sequence A: stories 1 + 2 pinned together ──────────────
          ONE ScrollTrigger covers both panels.
          No ScrollFadeSection wrapper — it would set opacity:0 on the pin
          element and fight the GSAP pin/scrub. */}
      <div id="story-1" style={{ position: "relative", zIndex: 10 }}>
        <StorySequence
          oneAtATime
          panels={[
            {
              lines: [
                "Most body care treats dryness like a surface issue.",
                "Melanated skin requires deeper design.",
              ],
              imageSrc: "/images/neck.png",
              desktopImageSrc: "/desktop/desktopimage1.png",
              imagePosition: "center",
              mobileImagePosition: "center 35%",
            },
            {
              lines: [
                "Without heaviness.",
                "Without hydration that fades.",
                "Without compromise.",
                "Without waiting for the industry to catch up.",
              ],
              imageSrc: "/images/sideboob.png",
              desktopImageSrc: "/desktop/desktopimage2.png",
              imagePosition: "center 40%",
            },
          ]}
        />
      </div>

      {/* ── Skin architecture — self-pins internally; no ScrollFadeSection ── */}
      <div style={{ position: "relative", zIndex: 11 }}>
        <SkinArchitectureSection />
      </div>

      {/* ── Story 3 — self-pins internally; no ScrollFadeSection ─────────── */}
      <div id="story-3" style={{ position: "relative", zIndex: 12 }}>
        <PinnedStorySection
          id="story-3-inner"
          testId="section-story-3"
          lines={[
            "Fewer steps. Deeper results.",
            "Private release. Available through access only.",
            "One treatment that does what others can't.",
          ]}
          imageSrc="/images/cutesyphoto.png"
          imagePosition="center 60%"
        />
      </div>

      {/* ── Non-pinned sections: plain wrappers while debugging mobile scroll ── */}
      <div style={{ position: "relative", zIndex: 13 }}>
        <RichTextSection
          title="Firming Barrier Treatment Cream"
          body="Absorbs instantly. Holds deeply. Leaves nothing behind but finish, and supports the skin barrier from within."
          ctaLabel="Discover the Treatment"
          onCta={() => scrollToSection("product")}
        />
      </div>

      <div style={{ position: "relative", zIndex: 14 }}>
        <ProductExperience />
      </div>

      {/* 
      <div style={{ position: "relative", zIndex: 15 }}>
        <HeroImageSection imageSrc="/images/heroimage1.png" />
      </div>
      */}

      <div style={{ position: "relative", zIndex: 16 }}>
        <FinalCTASection />
      </div>

      {/* ── Founder circle — self-pins internally ─────────────────────────── */}
      <div style={{ position: "relative", zIndex: 17 }}>
        <FounderCircleSection imageSrc="/images/3womenredback.png" />
      </div>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 18 }}>
        <Footer />
      </div>
    </main>
  );
}
