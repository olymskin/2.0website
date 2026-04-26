import Header from "@/components/Header";
import HeroVideo from "@/components/HeroVideo";
import PinnedStorySection from "@/components/PinnedStorySection";
import RichTextSection from "@/components/RichTextSection";
import ProductExperience from "@/components/ProductExperience";
import HeroImageSection from "@/components/HeroImageSection";
import FounderCircleSection from "@/components/FounderCircleSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

export default function Home() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main style={{ backgroundColor: "#0A0A0A", overflowX: "hidden" }}>
      {/* 1. Floating Header */}
      <Header />

      {/* 2. Hero Video Section */}
      <HeroVideo onEnter={() => scrollToSection("story-1")} />

      {/* 3. Pinned Story Section One — 2 lines, 2 images */}
      {/* Replace each imageSrcs entry with your own file, e.g. /images/story-1a.jpg */}
      <PinnedStorySection
        id="story-1"
        testId="section-story-1"
        lines={["From surface moisture", "to lasting hydration"]}
        imageSrcs={[
          "/images/skin-1.png",
          "/images/skin-6.jpeg",
        ]}
        imagePosition="center"
      />

      {/* 4. Pinned Story Section Two — 3 lines, 3 images */}
      {/* Replace each imageSrcs entry with your own file, e.g. /images/story-2a.jpg */}
      <PinnedStorySection
        id="story-2"
        testId="section-story-2"
        lines={[
          "Without heaviness.",
          "Without hydration that fades.",
          "Without the excess.",
        ]}
        imageSrcs={[
          "https://images.unsplash.com/photo-1629044765536-ff09b1fbada5?w=1920&q=80&fit=crop",
          "https://images.unsplash.com/photo-1570194065650-d99fb4b38f72?w=1920&q=80&fit=crop",
          "https://images.unsplash.com/photo-1629109553059-a2e26b58f0b7?w=1920&q=80&fit=crop",
        ]}
        imagePosition="center 40%"
      />

      {/* 5. Pinned Story Section Three — 2 lines, 2 images */}
      {/* Replace each imageSrcs entry with your own file, e.g. /images/story-3a.jpg */}
      <PinnedStorySection
        id="story-3"
        testId="section-story-3"
        lines={[
          "Less layering. More function.",
          "One treatment that does what others can't.",
        ]}
        imageSrcs={[
          "https://images.unsplash.com/photo-1643185540009-fefca91db3be?w=1920&q=80&fit=crop",
          "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1920&q=80&fit=crop",
        ]}
        imagePosition="center 60%"
      />

      {/* 6. Rich Text Section */}
      <RichTextSection
        title="Firming Barrier Treatment Cream"
        body="A fast-absorbing treatment that moves like a gel, finishes like a cream, and supports the skin barrier from within."
        ctaLabel="Discover the Treatment"
        onCta={() => scrollToSection("product")}
      />

      {/* 7. Interactive Product Section — Three.js */}
      <ProductExperience />

      {/* 8. Hero Image Section */}
      {/* Replace imageSrc with your actual image, e.g. /images/for-us.jpg */}
      <HeroImageSection imageSrc="/images/skin-6.png" />

      {/* 9. Founder Circle Overlay Section */}
      {/* Replace imageSrc with your actual image, e.g. /images/founder.jpg */}
      <FounderCircleSection imageSrc="https://images.unsplash.com/photo-1629109553059-a2e26b58f0b7?w=1920&q=80&fit=crop" />

      {/* 10. Final Rich Text CTA Section */}
      <FinalCTASection />

      {/* 11. Footer */}
      <Footer />
    </main>
  );
}
