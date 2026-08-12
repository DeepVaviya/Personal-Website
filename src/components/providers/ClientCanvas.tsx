"use client";

import dynamic from "next/dynamic";

// Dynamically import the 3D Scene with SSR disabled (Three.js cannot run server-side)
const Scene = dynamic(() => import("@/components/canvas/Scene"), {
  ssr: false,
  loading: () => null,
});

export default function ClientCanvas() {
  return <Scene />;
}
