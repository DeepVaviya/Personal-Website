"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { useScrollStore } from "@/stores/scrollStore";
import * as THREE from "three";

export default function HeroObject() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.Material>(null!);
  const { viewport } = useThree();

  // Spring-based mouse tracking state
  const mouse = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });
  const lastProgress = useRef(0);
  const smoothVelocity = useRef(0);

  // Memoize geometry args to prevent re-creation
  const geometryArgs = useMemo(
    () => [1, 0.35, 200, 50] as [number, number, number, number],
    []
  );

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const { progress, heroProgress } = useScrollStore.getState();

    // --- Mouse tracking with spring physics ---
    const pointer = state.pointer;
    mouse.current.x = pointer.x * (viewport.width / 2);
    mouse.current.y = pointer.y * (viewport.height / 2);

    // Smooth lerp for spring-like following (lag)
    const lerpFactor = 1 - Math.pow(0.05, delta);
    smoothMouse.current.x +=
      (mouse.current.x * 0.3 - smoothMouse.current.x) * lerpFactor;
    smoothMouse.current.y +=
      (mouse.current.y * 0.3 - smoothMouse.current.y) * lerpFactor;

    // --- Scroll Velocity Calculation ---
    const rawVelocity = Math.abs(progress - lastProgress.current) / delta;
    lastProgress.current = progress;
    // Smooth the velocity so it doesn't jump instantly
    smoothVelocity.current += (rawVelocity - smoothVelocity.current) * 0.1;

    // --- Scroll-driven transforms ---
    // Base rotation (always slowly spinning)
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.1;

    // Scroll-driven rotation boost (spins faster when scrolling)
    meshRef.current.rotation.z += smoothVelocity.current * 0.5 * delta;
    meshRef.current.rotation.y += smoothVelocity.current * 0.5 * delta;

    // Scale: large at top, shrinks as user scrolls
    const targetScale = THREE.MathUtils.lerp(1.2, 0.4, Math.min(progress * 2, 1));
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      lerpFactor
    );

    // Position: centered in hero, drifts to right as user scrolls
    const targetX = THREE.MathUtils.lerp(0, 2.5, Math.min(progress * 3, 1));
    const targetY = THREE.MathUtils.lerp(0, -1, Math.min(progress * 2, 1));

    meshRef.current.position.x +=
      (targetX + smoothMouse.current.x - meshRef.current.position.x) *
      lerpFactor;
    meshRef.current.position.y +=
      (targetY + smoothMouse.current.y - meshRef.current.position.y) *
      lerpFactor;

    // Opacity based on hero progress (fade out when leaving hero)
    const opacity = THREE.MathUtils.lerp(1, 0, Math.max(0, heroProgress - 0.7) / 0.3);
    if (materialRef.current) {
      const mat = materialRef.current as any;
      if ("opacity" in mat) mat.opacity = opacity;
      
      // The "Crazy" part: Distort the glass material based on scroll speed!
      if ("distortion" in mat) {
        // Base distortion is 0.4, peaks at 2.5 when scrolling fast
        mat.distortion = THREE.MathUtils.lerp(0.2, 3.0, Math.min(smoothVelocity.current * 2, 1));
        // Chromatic aberration spikes when scrolling fast
        mat.chromaticAberration = THREE.MathUtils.lerp(0.06, 0.3, Math.min(smoothVelocity.current * 2, 1));
      }
    }
  });

  return (
    <mesh ref={meshRef} scale={1.2}>
      <torusKnotGeometry args={geometryArgs} />
      <MeshTransmissionMaterial
        ref={materialRef as React.RefObject<never>}
        backside
        samples={6}
        thickness={0.5}
        chromaticAberration={0.06}
        anisotropy={0.3}
        distortion={0.4}
        distortionScale={0.5}
        temporalDistortion={0.2}
        transmission={1}
        roughness={0.07}
        ior={1.5}
        color="#aaddff"
        transparent
      />
    </mesh>
  );
}
