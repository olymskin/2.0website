import { Suspense, useRef, Component, ErrorInfo, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Cylinder } from "@react-three/drei";
import * as THREE from "three";

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {}

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function JarProduct() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.004;
      groupRef.current.position.y =
        Math.sin(state.clock.getElapsedTime() * 0.6) * 0.04;
    }
  });

  const jarMaterial = new THREE.MeshStandardMaterial({
    color: "#1a0a0c",
    metalness: 0.35,
    roughness: 0.35,
    envMapIntensity: 1.4,
  });

  const lidMaterial = new THREE.MeshStandardMaterial({
    color: "#2a1010",
    metalness: 0.55,
    roughness: 0.25,
    envMapIntensity: 1.6,
  });

  const ringMaterial = new THREE.MeshStandardMaterial({
    color: "#C6A46A",
    metalness: 0.85,
    roughness: 0.15,
    envMapIntensity: 2.0,
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Cylinder args={[0.85, 0.78, 1.1, 64]} material={jarMaterial} position={[0, 0, 0]} />
      <Cylinder args={[0.88, 0.88, 0.22, 64]} material={lidMaterial} position={[0, 0.66, 0]} />
      <Cylinder args={[0.9, 0.9, 0.04, 64]} material={ringMaterial} position={[0, 0.55, 0]} />
      <Cylinder args={[0.82, 0.82, 0.04, 64]} material={ringMaterial} position={[0, -0.57, 0]} />
      <Cylinder args={[0.6, 0.6, 0.06, 64]} material={ringMaterial} position={[0, 0.78, 0]} />
    </group>
  );
}

function ProductScene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[3, 4, 3]} intensity={1.2} color="#fdf0dc" />
      <directionalLight position={[-4, 1, -2]} intensity={0.4} color="#c6a46a" />
      <pointLight position={[0, 3, 2]} intensity={0.8} color="#ffe8c0" distance={8} />
      <pointLight position={[2, -2, 1]} intensity={0.4} color="#6E0F1A" distance={6} />
      <JarProduct />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.7}
        rotateSpeed={0.5}
        dampingFactor={0.08}
        enableDamping
      />
      <Environment preset="night" />
    </>
  );
}

function StaticJarFallback() {
  return (
    <div
      style={{
        width: "180px",
        height: "220px",
        margin: "0 auto",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* CSS jar silhouette fallback */}
      <div
        style={{
          width: "120px",
          height: "130px",
          background:
            "linear-gradient(135deg, #2a1010 0%, #1a0a0c 60%, #3B0A0F 100%)",
          borderRadius: "12px 12px 16px 16px",
          border: "1px solid rgba(198,164,106,0.3)",
          position: "relative",
          boxShadow:
            "0 0 40px rgba(198,164,106,0.08), inset 0 1px 0 rgba(198,164,106,0.1)",
        }}
      >
        {/* Gold lid */}
        <div
          style={{
            position: "absolute",
            top: "-22px",
            left: "-4px",
            right: "-4px",
            height: "26px",
            background:
              "linear-gradient(135deg, #3a2010 0%, #2a1810 100%)",
            borderRadius: "10px 10px 4px 4px",
            border: "1px solid rgba(198,164,106,0.4)",
          }}
        />
        {/* Gold ring */}
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            left: "0",
            right: "0",
            height: "1px",
            background: "rgba(198,164,106,0.5)",
          }}
        />
      </div>
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
      }}
    >
      {/* Subtle background glow */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(110,15,26,0.18) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      {/* Canvas 3D with WebGL error boundary */}
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "clamp(320px, 55vw, 520px)",
          position: "relative",
        }}
        data-testid="canvas-product"
      >
        <WebGLErrorBoundary fallback={<StaticJarFallback />}>
          <Canvas
            camera={{ position: [0, 0.3, 3.2], fov: 38 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false }}
            style={{ background: "transparent" }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
            }}
          >
            <Suspense fallback={null}>
              <ProductScene />
            </Suspense>
          </Canvas>
        </WebGLErrorBoundary>
      </div>

      {/* Text overlay */}
      <div
        style={{
          textAlign: "center",
          padding: "0 1.5rem",
          marginTop: "2rem",
          position: "relative",
          zIndex: 10,
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
            opacity: 0.7,
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
          }}
        >
          Engineered for performance.
        </h2>
      </div>
    </section>
  );
}
