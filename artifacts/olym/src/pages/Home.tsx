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
import ScrollFadeSection from "@/components/ScrollFadeSection";

gsap.registerPlugin(ScrollTrigger);

// Prevent mobile resize jitter and lag accumulation from hurting scrub smoothness
ScrollTrigger.config({ ignoreMobileResize: true });
gsap.ticker.lagSmoothing(0);

export default function Home() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    console.log("%cOLYM scroll fix v1", "color:#C6A46A;font-weight:bold;font-size:14px");
    const id = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => clearTimeout(id);
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
          panels={[
            {
              lines: [
                "Most body care treats dryness like a surface issue.",
                "Melanated skin requires deeper design.",
              ],
              imageSrc: "/images/neck.png",
              desktopImageSrc: "/desktop/desktopimage1.png",
              imagePosition: "center",
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

      {/* ── Non-pinned sections: stickyPin creates CSS sticky hold ────────── */}
      <ScrollFadeSection zIndex={13} stickyPin pinBuffer="32vh">
        <RichTextSection
          title="Firming Barrier Treatment Cream"
          body="Absorbs instantly. Holds deeply. Leaves nothing behind but finish, and supports the skin barrier from within."
          ctaLabel="Discover the Treatment"
          onCta={() => scrollToSection("product")}
        />
      </ScrollFadeSection>

      <ScrollFadeSection zIndex={14} stickyPin pinBuffer="22vh">
        <ProductExperience />
      </ScrollFadeSection>

      {/* 
      <ScrollFadeSection zIndex={15} stickyPin pinBuffer="24vh">
        <HeroImageSection imageSrc="/images/heroimage1.png" />
      </ScrollFadeSection>
      */}

      <ScrollFadeSection zIndex={16} stickyPin pinBuffer="20vh">
        <FinalCTASection />
      </ScrollFadeSection>

      {/* ── Founder circle — self-pins internally; no ScrollFadeSection ───── */}
      <div style={{ position: "relative", zIndex: 17 }}>
        <FounderCircleSection imageSrc="/images/3womenredback.png" />
      </div>

      {/* ── Footer — simple fade-in ────────────────────────────────────────── */}
      <ScrollFadeSection zIndex={18}>
        <Footer />
      </ScrollFadeSection>
    </main>
  );
}
