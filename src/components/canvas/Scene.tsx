"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Preload } from "@react-three/drei";
import { EffectComposer, Noise, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import HeroObject from "./HeroObject";
import Lighting from "./Lighting";

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
      >
        <Suspense fallback={null}>
          <Lighting />
          <HeroObject />
          
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
