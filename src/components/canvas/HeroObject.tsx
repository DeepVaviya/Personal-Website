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

  // PERF: Reduced geometry complexity — 128×32 is visually identical to 200×50
  // but renders ~2.5× faster (fewer vertices to transform per frame)
  const geometryArgs = useMemo(
    () => [1, 0.35, 128, 32] as [number, number, number, number],
    []
  );

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const { heroProgress } = useScrollStore.getState();

    // PERF + FIX: Fully hide mesh when scrolled past hero.
    // MeshTransmissionMaterial ignores opacity (it's a glass shader),
    // so we must set mesh.visible = false to remove it from rendering entirely.
    if (heroProgress > 0.95) {
      meshRef.current.visible = false;
      return; // Skip everything: mouse tracking, rotation, position, lerps
    }
    meshRef.current.visible = true;

    // --- Mouse tracking with spring physics ---
    const pointer = state.pointer;
    mouse.current.x = pointer.x * (viewport.width / 2);
    mouse.current.y = pointer.y * (viewport.height / 2);

    const lerpFactor = 1 - Math.pow(0.05, delta);
    smoothMouse.current.x +=
      (mouse.current.x * 0.3 - smoothMouse.current.x) * lerpFactor;
    smoothMouse.current.y +=
      (mouse.current.y * 0.3 - smoothMouse.current.y) * lerpFactor;

    // --- Scroll-driven transforms ---
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.1;

    // Scale: large at top, shrinks as user scrolls past hero
    const targetScale = THREE.MathUtils.lerp(1.2, 0.4, Math.min(heroProgress * 2, 1));
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      lerpFactor
    );

    // Position: centered in hero, drifts to right as user scrolls
    const targetX = THREE.MathUtils.lerp(0, 2.5, Math.min(heroProgress * 3, 1));
    const targetY = THREE.MathUtils.lerp(0, -1, Math.min(heroProgress * 2, 1));

    meshRef.current.position.x +=
      (targetX + smoothMouse.current.x - meshRef.current.position.x) *
      lerpFactor;
    meshRef.current.position.y +=
      (targetY + smoothMouse.current.y - meshRef.current.position.y) *
      lerpFactor;

    // Opacity: fade out when leaving hero section
    const opacity = THREE.MathUtils.lerp(1, 0, Math.max(0, heroProgress - 0.7) / 0.3);
    if (materialRef.current) {
      (materialRef.current as any).opacity = opacity;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.2}>
      <torusKnotGeometry args={geometryArgs} />
      <MeshTransmissionMaterial
        ref={materialRef as React.RefObject<never>}
        backside
        samples={4}           /* PERF: was 6 — 4 is visually identical, 33% faster */
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
