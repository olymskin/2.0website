import { useEffect, useRef, useState } from "react";

const rotationFrames = [
  "/jar/frame1.png",
  "/jar/frame2.png",
  "/jar/frame3.png",
  "/jar/frame4.png",
  "/jar/frame5.png",
  "/jar/frame6.png",
  "/jar/frame7.png",
];

const detailFrames = ["/jar/frame8.png", "/jar/frame9.png"];
const allFrames = [...rotationFrames, ...detailFrames];

function JarImageViewer() {
  const [frame, setFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isDetailView, setIsDetailView] = useState(false);

  const startX = useRef(0);
  const startY = useRef(0);
  const lastX = useRef(0);
  const dragging = useRef(false);

  useEffect(() => {
    allFrames.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const beginDrag = (x: number, y: number) => {
    dragging.current = true;
    startX.current = x;
    startY.current = y;
    lastX.current = x;
    setIsDragging(true);
  };

  const moveDrag = (x: number, y: number) => {
    if (!dragging.current) return;

    const totalY = y - startY.current;
    const deltaX = x - lastX.current;

    if (totalY < -55) {
      setIsDetailView(true);
      setFrame(rotationFrames.length);
      return;
    }

    if (totalY > 45 && isDetailView) {
      setIsDetailView(false);
      setFrame(0);
      return;
    }

    if (isDetailView) {
      if (Math.abs(deltaX) > 24) {
        setFrame((prev) =>
          prev === rotationFrames.length
            ? rotationFrames.length + 1
            : rotationFrames.length
        );
        lastX.current = x;
      }
      return;
    }

    if (Math.abs(deltaX) > 14) {
      setFrame((prev) =>
        deltaX > 0
          ? (prev - 1 + rotationFrames.length) % rotationFrames.length
          : (prev + 1) % rotationFrames.length
      );
      lastX.current = x;
    }
  };

  const endDrag = () => {
    dragging.current = false;
    setIsDragging(false);
  };

  return (
    <div
      data-testid="jar-image-viewer"
      style={{
        width: "100%",
        maxWidth: "640px",
        height: "clamp(340px, 58vw, 560px)",
        margin: "0 auto",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        touchAction: "none",
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
      onMouseDown={(e) => beginDrag(e.clientX, e.clientY)}
      onMouseMove={(e) => moveDrag(e.clientX, e.clientY)}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onTouchStart={(e) => {
        const touch = e.touches[0];
        beginDrag(touch.clientX, touch.clientY);
      }}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        moveDrag(touch.clientX, touch.clientY);
      }}
      onTouchEnd={endDrag}
    >
      <style>
        {`
          @keyframes olymJarFloat {
            0% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-14px) scale(1.01); }
            100% { transform: translateY(0px) scale(1); }
          }

          @keyframes olymGlowPulse {
            0% { opacity: 0.65; transform: scale(1); }
            50% { opacity: 0.95; transform: scale(1.05); }
            100% { opacity: 0.65; transform: scale(1); }
          }
        `}
      </style>

      <div
        style={{
          position: "absolute",
          width: "76%",
          height: "42%",
          bottom: "8%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(110,15,26,0.42) 0%, rgba(110,15,26,0.15) 45%, transparent 72%)",
          filter: "blur(22px)",
          pointerEvents: "none",
          animation: "olymGlowPulse 4.8s ease-in-out infinite",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: isDragging ? "62%" : "54%",
          height: isDragging ? "10%" : "8%",
          bottom: "12%",
          borderRadius: "50%",
          background: "rgba(0,0,0,0.58)",
          filter: "blur(18px)",
          pointerEvents: "none",
          transition: "width 180ms ease, height 180ms ease",
        }}
      />

      <img
        src={allFrames[frame]}
        alt="OLYM Skin body cream jar"
        draggable={false}
        style={{
          position: "relative",
          zIndex: 2,
          width: "min(94vw, 620px)",
          maxHeight: "100%",
          objectFit: "contain",
          display: "block",
          pointerEvents: "none",
          animation: isDragging ? "none" : "olymJarFloat 5.2s ease-in-out infinite",
          transform: isDragging ? "translateY(-8px) scale(1.035)" : undefined,
          transition: "opacity 120ms ease, transform 180ms ease",
          filter: "drop-shadow(0 32px 52px rgba(0,0,0,0.55))",
        }}
      />

      <button
        type="button"
        onClick={() => {
          setIsDetailView((prev) => !prev);
          setFrame(isDetailView ? 0 : rotationFrames.length);
        }}
        style={{
          display: "none",
          position: "absolute",
          right: "clamp(1rem, 5vw, 3rem)",
          bottom: "1rem",
          zIndex: 5,
          border: "1px solid rgba(198,164,106,0.45)",
          background: "rgba(10,10,10,0.42)",
          color: "#C6A46A",
          borderRadius: "999px",
          padding: "0.65rem 0.9rem",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.62rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          backdropFilter: "blur(10px)",
          cursor: "pointer",
        }}
      >
        {isDetailView ? "Front View" : "View Details"}
      </button>
    </div>
  );
}

export default function ProductExperience() {
  return (
    <section
      id="product"
      data-testid="section-product"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100dvh",
        background:
          "radial-gradient(ellipse at center, #1a0508 0%, #0A0A0A 70%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "5rem 0 4.5rem",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(110,15,26,0.24) 0%, rgba(110,15,26,0.09) 38%, transparent 70%)",
          top: "48%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ width: "100%", position: "relative", zIndex: 3 }} data-testid="canvas-product">
        <JarImageViewer />
      </div>

      <div
        style={{
          textAlign: "center",
          padding: "0 1.5rem",
          marginTop: "1.5rem",
          position: "relative",
          zIndex: 10,
          maxWidth: "640px",
        }}
      >
        <p
          data-testid="text-product-label"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            color: "#C6A46A",
            textTransform: "uppercase",
            marginBottom: "1rem",
            opacity: 0.72,
          }}
        >
          Drag to rotate
        </p>

        <h2
          data-testid="text-product-headline"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1.6rem, 4vw, 3rem)",
            fontWeight: 300,
            letterSpacing: "0.06em",
            color: "#F4EFE9",
            fontStyle: "italic",
            marginBottom: "1.25rem",
          }}
        >
          Engineered to Perform
        </h2>

        <p
          data-testid="text-product-description"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.82rem, 1.7vw, 1rem)",
            fontWeight: 300,
            lineHeight: 1.8,
            letterSpacing: "0.04em",
            color: "#A89C92",
            maxWidth: "560px",
            margin: "0 auto",
          }}
        >
          An advanced body treatment designed for melanated skin — fast-absorbing,
          barrier-supporting, and made to leave skin supple, smooth, and deeply
          hydrated without heaviness.
        </p>
      </div>
    </section>
  );
}