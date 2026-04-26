import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import HeroVideo from "@/components/HeroVideo";
import PinnedStorySection from "@/components/PinnedStorySection";
import RichTextSection from "@/components/RichTextSection";
import ProductExperience from "@/components/ProductExperience";
import HeroImageSection from "@/components/HeroImageSection";
import FounderCircleSection from "@/components/FounderCircleSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import ScrollFadeSection from "@/components/ScrollFadeSection";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Refresh ScrollTrigger after all sections have mounted and set up their
  // own triggers (PinnedStorySections add spacers that change total height).
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => clearTimeout(id);
  }, []);

  return (
    <main style={{ backgroundColor: "#0A0A0A", overflowX: "hidden" }}>
      {/* 1. Floating Header — never wrapped, always on top */}
      <Header />

      {/* 2. Hero Video — scrolls normally, no crossfade */}
      <HeroVideo onEnter={() => scrollToSection("story-1")} />

      {/* ── Post-hero sections: each fades in cinematically ──────────────── */}

      {/* 3. Pinned Story One
            stickyPin=false — GSAP's own pin handles the "hold" behaviour.
            Wrapper has NO opacity/transform so GSAP's position:fixed pin
            is not broken by a rogue containing block. */}
      <ScrollFadeSection zIndex={10}>
        <PinnedStorySection
          id="story-1"
          testId="section-story-1"
          lines={["From surface moisture", "to lasting hydration"]}
          imageSrcs={[
            "/images/skin-1.png?v=2",
            "/images/skin-2.png?v=2",
          ]}
          imagePosition="center"
        />
      </ScrollFadeSection>

      {/* 4. Pinned Story Two */}
      <ScrollFadeSection zIndex={11}>
        <PinnedStorySection
          id="story-2"
          testId="section-story-2"
          lines={[
            "Without heaviness.",
            "Without hydration that fades.",
            "Without the excess.",
          ]}
          imageSrcs={[
            "/images/skin-3.jpeg?v=2",
            "/images/skin-4.png?v=2",
            "/images/skin-5.png?v=2",
          ]}
          imagePosition="center 40%"
        />
      </ScrollFadeSection>

      {/* 5. Pinned Story Three */}
      <ScrollFadeSection zIndex={12}>
        <PinnedStorySection
          id="story-3"
          testId="section-story-3"
          lines={[
            "Less layering. More function.",
            "One treatment that does what others can't.",
          ]}
          imageSrcs={[
            "/images/allwomenfirst.png?v=2",
            "/images/womenallred.png?v=2",
          ]}
          imagePosition="center 60%"
        />
      </ScrollFadeSection>

      {/* 6. Rich Text — stickyPin adds 32 vh hold + sticky so it dissolves
            into ProductExperience while appearing to stay in place */}
      <ScrollFadeSection zIndex={13} stickyPin pinBuffer="32vh">
        <RichTextSection
          title="Firming Barrier Treatment Cream"
          body="A fast-absorbing treatment that moves like a gel, finishes like a cream, and supports the skin barrier from within."
          ctaLabel="Discover the Treatment"
          onCta={() => scrollToSection("product")}
        />
      </ScrollFadeSection>

      {/* 7. Interactive Product Section */}
      <ScrollFadeSection zIndex={14} stickyPin pinBuffer="30vh">
        <ProductExperience />
      </ScrollFadeSection>

      {/* 8. Hero Image */}
      <ScrollFadeSection zIndex={15} stickyPin pinBuffer="30vh">
        <HeroImageSection imageSrc="/images/skin-6.png?v=2" />
      </ScrollFadeSection>

      {/* 9. Founder Circle */}
      <ScrollFadeSection zIndex={16} stickyPin pinBuffer="28vh">
        <FounderCircleSection imageSrc="/images/augustinus.jpeg?v=2" />
      </ScrollFadeSection>

      {/* 10. Final CTA */}
      <ScrollFadeSection zIndex={17} stickyPin pinBuffer="24vh">
        <FinalCTASection />
      </ScrollFadeSection>

      {/* 11. Footer — simple fade-in, no hold needed at page end */}
      <ScrollFadeSection zIndex={18}>
        <Footer />
      </ScrollFadeSection>
    </main>
  );
}
