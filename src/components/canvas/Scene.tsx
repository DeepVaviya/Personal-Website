"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import { Preload } from "@react-three/drei";
import { useScrollStore } from "@/stores/scrollStore";
import HeroObject from "./HeroObject";
import Lighting from "./Lighting";

/**
 * PERF: Invalidation controller — tells R3F to only render frames
 * when the hero section is visible. When scrolled past, the canvas
 * stops rendering entirely (0 GPU draw calls, 0 CPU).
 */
function FrameGate() {
  const { invalidate } = useThree();

  useFrame(() => {
    const { heroProgress } = useScrollStore.getState();
    // Only request the next frame if the hero is still visible
    if (heroProgress < 0.98) {
      invalidate();
    }
  });

  return null;
}

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0" id="canvas-container">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent" }}
        frameloop="demand" /* PERF: Only render when invalidate() is called */
      >
        <Suspense fallback={null}>
          <Lighting />
          <HeroObject />
          <FrameGate />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
