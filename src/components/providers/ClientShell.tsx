"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Preloader from "@/components/ui/Preloader";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";

// Dynamically import the 3D Scene with SSR disabled
const Scene = dynamic(() => import("@/components/canvas/Scene"), {
  ssr: false,
  loading: () => null,
});

export default function ClientShell() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Preloader />
      <CustomCursor />
      <Navbar />
      <Scene />
    </>
  );
}
