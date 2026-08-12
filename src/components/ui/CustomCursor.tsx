"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

const TRAIL_COUNT = 12;

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const mousePos = useRef({ x: -100, y: -100 });
  const trailPositions = useRef<{ x: number; y: number }[]>(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 }))
  );
  const rafId = useRef<number>(0);

  const animateTrail = useCallback(() => {
    // Each trail particle follows the one ahead with a delay
    for (let i = TRAIL_COUNT - 1; i > 0; i--) {
      trailPositions.current[i].x +=
        (trailPositions.current[i - 1].x - trailPositions.current[i].x) * 0.25;
      trailPositions.current[i].y +=
        (trailPositions.current[i - 1].y - trailPositions.current[i].y) * 0.25;
    }
    // First particle follows mouse
    trailPositions.current[0].x +=
      (mousePos.current.x - trailPositions.current[0].x) * 0.35;
    trailPositions.current[0].y +=
      (mousePos.current.y - trailPositions.current[0].y) * 0.35;

    // Apply positions
    trailRefs.current.forEach((el, i) => {
      if (el) {
        el.style.transform = `translate(${trailPositions.current[i].x}px, ${trailPositions.current[i].y}px) translate(-50%, -50%)`;
      }
    });

    rafId.current = requestAnimationFrame(animateTrail);
  }, []);

  useEffect(() => {
    // Hide cursor on touch devices
    if ("ontouchstart" in window) return;

    // Activate custom cursor (hides native cursor via CSS class)
    document.body.classList.add("custom-cursor-active");

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // GSAP quickTo for ultra-smooth ring following
    const xTo = gsap.quickTo(cursor, "x", {
      duration: 0.5,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(cursor, "y", {
      duration: 0.5,
      ease: "power3.out",
    });
    const dotXTo = gsap.quickTo(dot, "x", {
      duration: 0.1,
      ease: "power2.out",
    });
    const dotYTo = gsap.quickTo(dot, "y", {
      duration: 0.1,
      ease: "power2.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      xTo(e.clientX);
      yTo(e.clientY);
      dotXTo(e.clientX);
      dotYTo(e.clientY);
    };

    // Detect interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    // Start trail animation loop
    rafId.current = requestAnimationFrame(animateTrail);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(rafId.current);
    };
  }, [animateTrail]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      {/* Trailing particles */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={`trail-${i}`}
          ref={(el) => {
            trailRefs.current[i] = el;
          }}
          className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
          style={{
            width: `${Math.max(3, 8 - i * 0.5)}px`,
            height: `${Math.max(3, 8 - i * 0.5)}px`,
            backgroundColor: `rgba(150, 120, 255, ${0.6 - i * 0.045})`,
            boxShadow:
              i < 4
                ? `0 0 ${6 - i}px rgba(150, 120, 255, ${0.3 - i * 0.06})`
                : "none",
            transition: "width 0.3s, height 0.3s",
          }}
        />
      ))}

      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: isHovering ? "64px" : "40px",
          height: isHovering ? "64px" : "40px",
          border: `1.5px solid ${isHovering ? "#ededed" : "rgba(237,237,237,0.5)"}`,
          mixBlendMode: isHovering ? "difference" : "normal",
          transition: "width 0.3s ease-out, height 0.3s ease-out, border-color 0.3s",
        }}
      />

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: isHovering ? "4px" : "7px",
          height: isHovering ? "4px" : "7px",
          backgroundColor: "#ededed",
          transition: "width 0.2s ease-out, height 0.2s ease-out",
        }}
      />
    </>
  );
}
