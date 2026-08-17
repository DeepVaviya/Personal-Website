"use client";

import { useState, useEffect } from "react";

/**
 * Detects whether the device is mobile / low-GPU-power.
 * Uses screen width + coarse pointer as heuristics.
 * Returns `true` server-side (safe default — no 3D on SSR).
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(true); // Safe default: assume mobile

  useEffect(() => {
    const check = () => {
      const isSmallScreen = window.innerWidth < breakpoint;
      const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(isSmallScreen || isCoarsePointer);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}
