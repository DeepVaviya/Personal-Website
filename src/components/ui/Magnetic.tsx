"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface MagneticProps {
  children: React.ReactElement;
  strength?: number; // How much it pulls (higher = more movement)
}

export default function Magnetic({ children, strength = 0.5 }: MagneticProps) {
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices
    if ("ontouchstart" in window) return;

    const element = magneticRef.current;
    if (!element) return;

    // Use GSAP quickTo for highly performant, continuous updates
    const xTo = gsap.quickTo(element, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const yTo = gsap.quickTo(element, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      
      // Calculate mouse position relative to center of element
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Move element towards mouse
      xTo(x * strength);
      yTo(y * strength);
    };

    const handleMouseLeave = () => {
      // Snap back to origin with elastic bounce
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return React.cloneElement(children as React.ReactElement<any>, { ref: magneticRef });
}
