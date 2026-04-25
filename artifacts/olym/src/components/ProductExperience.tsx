import { Suspense, useRef, useMemo, Component, ErrorInfo, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Cylinder, Text } from "@react-three/drei";
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

  // ── Materials ──────────────────────────────────────────────────────────────
  const glassMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#6E0F1A",
        transparent: true,
        opacity: 0.88,
        metalness: 0.15,
        roughness: 0.16,
        envMapIntensity: 2.1,
        side: THREE.DoubleSide,
      }),
    []
  );

  const lidMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#C6A46A",
        metalness: 0.92,
        roughness: 0.2,
        envMapIntensity: 2.2,
      }),
    []
  );

  const gapMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#060304",
        metalness: 0.05,
        roughness: 0.95,
      }),
    []
  );

  const emblemMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#A8863A",
        metalness: 0.88,
        roughness: 0.28,
        envMapIntensity: 1.8,
      }),
    []
  );

  const highlightMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: 0.055,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    []
  );

  return (
    <group ref={groupRef} position={[0, 0, 0]}>

      {/* ── Glass body — main wide cylinder ── */}
      <Cylinder args={[0.95, 1.15, 0.65, 96]} material={glassMat} position={[0, -0.15, 0]} />

      {/* ── Heavy rounded base bulge ── */}
      <Cylinder args={[1.2, 1.25, 0.25, 96]} material={glassMat} position={[0, -0.45, 0]} />

      {/* ── Upper shoulder / neck taper ── */}
      <Cylinder args={[0.9, 0.95, 0.25, 96]} material={glassMat} position={[0, 0.2, 0]} />

      {/* ── Lid ── */}
      <Cylinder args={[1.05, 1.05, 0.28, 96]} material={lidMat} position={[0, 0.6, 0]} />

      {/* ── Lid top cap face ── */}
      <mesh position={[0, 0.745, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.05, 96]} />
        <meshStandardMaterial
          color="#C6A46A"
          metalness={0.92}
          roughness={0.2}
          envMapIntensity={2.2}
        />
      </mesh>

      {/* ── Dark shadow gap between lid and body ── */}
      <Cylinder args={[1.04, 1.04, 0.035, 96]} material={gapMat} position={[0, 0.43, 0]} />

      {/* ── Gold base rim ── */}
      <Cylinder args={[1.18, 1.18, 0.035, 96]} material={lidMat} position={[0, -0.585, 0]} />

      {/* ── Lid emblem: outer torus ring ── */}
      <mesh position={[0, 0.748, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.4, 0.016, 16, 96]} />
        <meshStandardMaterial
          color="#A8863A"
          metalness={0.88}
          roughness={0.28}
          envMapIntensity={1.8}
        />
      </mesh>

      {/* ── Lid emblem: inner torus ring ── */}
      <mesh position={[0, 0.748, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.24, 0.012, 16, 96]} />
        <meshStandardMaterial
          color="#A8863A"
          metalness={0.88}
          roughness={0.28}
          envMapIntensity={1.8}
        />
      </mesh>

      {/* ── Lid emblem: "O | M" text (flat on lid top) ── */}
      <Text
        position={[0, 0.758, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.1}
        letterSpacing={0.14}
        color="#A8863A"
        anchorX="center"
        anchorY="middle"
      >
        O | M
      </Text>

      {/* ── Front label: OLYM ── */}
      <Text
        position={[0, -0.04, 1.18]}
        fontSize={0.145}
        letterSpacing={0.3}
        color="#E8D19A"
        anchorX="center"
        anchorY="middle"
        material={emblemMat}
      >
        OLYM
      </Text>

      {/* ── Front label: BODY CREAM ── */}
      <Text
        position={[0, -0.23, 1.165]}
        fontSize={0.063}
        letterSpacing={0.18}
        color="#D4B87E"
        anchorX="center"
        anchorY="middle"
      >
        BODY CREAM
      </Text>

      {/* ── Front label: 200 ML / fl oz ── */}
      <Text
        position={[0, -0.36, 1.15]}
        fontSize={0.048}
        letterSpacing={0.1}
        color="#C4A86E"
        anchorX="center"
        anchorY="middle"
      >
        {"200 ML  e  6.7 FL OZ"}
      </Text>

      {/* ── Specular highlight strip — front left ── */}
      <mesh position={[-0.52, 0.0, 1.08]} rotation={[0, Math.PI * 0.14, 0]}>
        <planeGeometry args={[0.055, 0.72]} />
        <primitive object={highlightMat} attach="material" />
      </mesh>

      {/* ── Specular highlight strip — front right ── */}
      <mesh position={[0.52, 0.0, 1.08]} rotation={[0, -Math.PI * 0.14, 0]}>
        <planeGeometry args={[0.055, 0.72]} />
        <primitive object={highlightMat} attach="material" />
      </mesh>

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
      <div
        style={{
          width: "140px",
          height: "100px",
          background:
            "linear-gradient(135deg, #4a0810 0%, #2a0508 60%, #3B0A0F 100%)",
          borderRadius: "8px 8px 14px 14px",
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
            top: "-24px",
            left: "-5px",
            right: "-5px",
            height: "28px",
            background:
              "linear-gradient(135deg, #D1AD6F 0%, #C6A46A 50%, #A8863A 100%)",
            borderRadius: "6px 6px 2px 2px",
            border: "1px solid rgba(198,164,106,0.5)",
          }}
        />
        {/* Gold base rim */}
        <div
          style={{
            position: "absolute",
            bottom: "-4px",
            left: "-5px",
            right: "-5px",
            height: "4px",
            background: "#C6A46A",
            borderRadius: "0 0 14px 14px",
            opacity: 0.8,
          }}
        />
        {/* Label text */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "0.75rem",
            letterSpacing: "0.3em",
            color: "#E8D19A",
            textAlign: "center",
          }}
        >
          OLYM
        </div>
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
