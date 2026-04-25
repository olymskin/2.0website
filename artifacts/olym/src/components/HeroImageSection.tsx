interface HeroImageSectionProps {
  /* Replace with your image URL — e.g. /images/hero-for-us.jpg */
  imageSrc?: string;
}

export default function HeroImageSection({ imageSrc }: HeroImageSectionProps) {
  const placeholder =
    "https://images.unsplash.com/photo-1643185540009-fefca91db3be?w=1920&q=80&fit=crop";

  return (
    <section
      id="for-us"
      data-testid="section-hero-image"
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        minHeight: "600px",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
      }}
    >
      {/* Background image — replace imageSrc prop to customize */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${imageSrc || placeholder})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Dark gradient overlay at bottom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.1) 60%, transparent 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "0 clamp(2rem, 6vw, 6rem) clamp(3rem, 7vw, 6rem)",
        }}
      >
        <h2
          data-testid="text-hero-image-headline"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: "0.02em",
            color: "#F4EFE9",
            fontStyle: "italic",
            maxWidth: "600px",
          }}
        >
          For us.
          <br />
          Done right.
        </h2>
      </div>
    </section>
  );
}
