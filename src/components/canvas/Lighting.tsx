"use client";

import { Environment } from "@react-three/drei";

export default function Lighting() {
  return (
    <>
      {/* Key light - warm from top-right */}
      <spotLight
        position={[5, 5, 5]}
        angle={0.5}
        penumbra={1}
        intensity={2}
        color="#fff5e6"
        castShadow
      />

      {/* Fill light - cool blue from left */}
      <pointLight position={[-5, 2, -2]} intensity={0.8} color="#4488ff" />

      {/* Rim light - accent from behind */}
      <pointLight position={[0, -3, -5]} intensity={1.2} color="#9966ff" />

      {/* Subtle ambient for base illumination */}
      <ambientLight intensity={0.15} color="#ffffff" />

      {/* Environment map for realistic reflections on transmission material */}
      <Environment preset="city" environmentIntensity={0.4} />
    </>
  );
}
