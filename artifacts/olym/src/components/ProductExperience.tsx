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

  // Opaque deep ruby/cherry wine glass — glossy, dense, solid
  const glassMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#5A0A14",
        metalness: 0.06,
        roughness: 0.16,
        envMapIntensity: 1.8,
      }),
    []
  );

  // Darker, denser lower base — heavier glass feel
  const baseMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#3D0008",
        metalness: 0.08,
        roughness: 0.2,
        envMapIntensity: 1.6,
      }),
    []
  );

  // Brushed champagne gold lid
  const lidMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#D1AD6F",
        metalness: 0.95,
        roughness: 0.22,
        envMapIntensity: 2.0,
      }),
    []
  );

  // Near-black shadow gap ring between lid and body
  const gapMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#050203",
        metalness: 0.02,
        roughness: 0.98,
      }),
    []
  );

  // Darker embossed gold for emblem detail
  const emblemMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#9A7830",
        metalness: 0.9,
        roughness: 0.3,
        envMapIntensity: 1.6,
      }),
    []
  );

  // Very subtle specular edge highlights — nearly invisible
  const highlightMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: 0.04,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    []
  );

  // ── Geometry stack (bottom → top) ─────────────────────────────────────────
  //   bottom cap disc       y = -0.60
  //   heavy base bulge      center y = -0.43, h = 0.32   top at -0.27
  //   main body             center y = -0.09, h = 0.64   top at  0.23
  //   upper shoulder taper  center y =  0.32, h = 0.20   top at  0.42
  //   shadow gap            center y =  0.435, h = 0.022
  //   gold lid              center y =  0.558, h = 0.24  top at  0.678
  //   lid top cap disc      y =  0.680

  return (
    <group ref={groupRef} position={[0, 0, 0]}>

      {/* ── Bottom face cap — seals the base ── */}
      <mesh position={[0, -0.60, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.26, 96]} />
        <meshStandardMaterial color="#280005" metalness={0.1} roughness={0.35} />
      </mesh>

      {/* ── Heavy rounded base bulge ── */}
      <Cylinder args={[1.22, 1.26, 0.32, 96]} material={baseMat} position={[0, -0.43, 0]} />

      {/* ── Main wide glass body ── */}
      <Cylinder args={[1.0, 1.22, 0.64, 96]} material={glassMat} position={[0, -0.09, 0]} />

      {/* ── Upper shoulder — inward taper toward lid ── */}
      <Cylinder args={[0.86, 1.0, 0.20, 96]} material={glassMat} position={[0, 0.32, 0]} />

      {/* ── Thin black shadow gap between body and lid ── */}
      <Cylinder args={[0.98, 0.98, 0.022, 96]} material={gapMat} position={[0, 0.435, 0]} />

      {/* ── Gold lid — sits flush directly above gap ── */}
      <Cylinder args={[1.02, 1.02, 0.24, 96]} material={lidMat} position={[0, 0.558, 0]} />

      {/* ── Lid top face cap ── */}
      <mesh position={[0, 0.679, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.02, 96]} />
        <meshStandardMaterial
          color="#D1AD6F"
          metalness={0.95}
          roughness={0.22}
          envMapIntensity={2.0}
        />
      </mesh>

      {/* ── Lid emblem: outer torus ring ── */}
      <mesh position={[0, 0.682, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.38, 0.013, 16, 96]} />
        <primitive object={emblemMat} attach="material" />
      </mesh>

      {/* ── Lid emblem: inner torus ring ── */}
      <mesh position={[0, 0.682, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.22, 0.009, 16, 96]} />
        <primitive object={emblemMat} attach="material" />
      </mesh>

      {/* ── Lid emblem: "O | M" flat on lid top ── */}
      <Text
        position={[0, 0.69, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.088}
        letterSpacing={0.14}
        color="#9A7830"
        anchorX="center"
        anchorY="middle"
      >
        O | M
      </Text>

      {/* ── Front label: OLYM — floats just in front of glass surface ── */}
      <Text
        position={[0, -0.04, 1.22]}
        fontSize={0.14}
        letterSpacing={0.32}
        color="#E8D19A"
        anchorX="center"
        anchorY="middle"
      >
        OLYM
      </Text>

      {/* ── Front label: BODY CREAM ── */}
      <Text
        position={[0, -0.21, 1.19]}
        fontSize={0.06}
        letterSpacing={0.18}
        color="#D4B87E"
        anchorX="center"
        anchorY="middle"
      >
        BODY CREAM
      </Text>

      {/* ── Front label: volume line ── */}
      <Text
        position={[0, -0.33, 1.17]}
        fontSize={0.044}
        letterSpacing={0.1}
        color="#C4A86E"
        anchorX="center"
        anchorY="middle"
      >
        {"200 ML  e  6.7 FL OZ"}
      </Text>

      {/* ── Soft specular edge glow — left ── */}
      <mesh position={[-0.60, 0.02, 0.96]} rotation={[0, Math.PI * 0.22, 0]}>
        <planeGeometry args={[0.028, 0.6]} />
        <primitive object={highlightMat} attach="material" />
      </mesh>

      {/* ── Soft specular edge glow — right ── */}
      <mesh position={[0.60, 0.02, 0.96]} rotation={[0, -Math.PI * 0.22, 0]}>
        <planeGeometry args={[0.028, 0.6]} />
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
