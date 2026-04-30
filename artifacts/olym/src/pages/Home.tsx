import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import HeroVideo from "@/components/HeroVideo";
import PinnedStorySection from "@/components/PinnedStorySection";
import SkinArchitectureSection from "@/components/SkinArchitectureSection";
import RichTextSection from "@/components/RichTextSection";
import ProductExperience from "@/components/ProductExperience";
import HeroImageSection from "@/components/HeroImageSection";
import FounderCircleSection from "@/components/FounderCircleSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import ScrollFadeSection from "@/components/ScrollFadeSection"

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => clearTimeout(id);
  }, []);

  return (
    <main style={{ backgroundColor: "#0A0A0A", overflowX: "hidden" }}>
      <Header />

      <HeroVideo onEnter={() => scrollToSection("story-1")} />

      <ScrollFadeSection zIndex={10}>
        <PinnedStorySection
          id="story-1"
          testId="section-story-1"
          lines={[
            "Most body care treats dryness like a surface issue.",
            "Melanated skin requires deeper design.",
          ]}
          imageSrcs={["/images/introshot.png", "/images/neck.png"]}
          imagePosition="center"
        />
      </ScrollFadeSection>

      <ScrollFadeSection zIndex={11}>
        <PinnedStorySection
          id="story-2"
          testId="section-story-2"
          lines={[
            "Without heaviness.",
            "Without hydration that fades.",
            "Without compromise.",
          ]}
          imageSrcs={[
            "/images/firsttransition.png",
            "/images/secondtransition.png",
            "/images/lasttransition.png",
          ]}
          imagePosition="center 40%"
        />
      </ScrollFadeSection>

      <ScrollFadeSection zIndex={12}>
        <SkinArchitectureSection />
      </ScrollFadeSection>

      <ScrollFadeSection zIndex={13}>
        <PinnedStorySection
          id="story-3"
          testId="section-story-3"
          lines={[
            "Fewer steps. Deeper results.",
            "One treatment that does what others can't",
          ]}
          imageSrcs={["/images/sideboob.png", "/images/cutesyphoto.png"]}
          imagePosition="center 60%"
        />
      </ScrollFadeSection>

      <ScrollFadeSection zIndex={14} stickyPin pinBuffer="32vh">
        <RichTextSection
          title="Firming Barrier Treatment Cream"
          body="Absorbs instantly. Holds deeply. Leaves nothing behind but finish, and supports the skin barrier from within."
          ctaLabel="Discover the Treatment"
          onCta={() => scrollToSection("product")}
        />
      </ScrollFadeSection>

      <ScrollFadeSection zIndex={15} stickyPin pinBuffer="22vh">
        <ProductExperience />
      </ScrollFadeSection>

      <ScrollFadeSection zIndex={16} stickyPin pinBuffer="24vh">
        <HeroImageSection imageSrc="/images/heroimage1.png" />
      </ScrollFadeSection>

      <ScrollFadeSection zIndex={17} stickyPin pinBuffer="20vh">
        <FinalCTASection />
      </ScrollFadeSection>

      <ScrollFadeSection zIndex={18} stickyPin pinBuffer="28vh">
        <FounderCircleSection imageSrc="/images/3womenredback.png" />
      </ScrollFadeSection>

      <ScrollFadeSection zIndex={19}>
        <Footer />
      </ScrollFadeSection>
    </main>
  );
}