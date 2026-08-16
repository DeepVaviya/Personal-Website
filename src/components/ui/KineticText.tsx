"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface KineticTextProps {
  children: React.ReactNode;
  direction?: 1 | -1;
  speed?: number;
  className?: string;
}

export default function KineticText({
  children,
  direction: initialDirection = 1,
  speed: initialSpeed = 0.05,
  className = "",
}: KineticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let xPercent = 0;
    let animationFrameId: number | null = null;
    let currentSpeed = initialSpeed;
    let currentDirection = initialDirection;
    let isVisible = false; // IO-pause gate

    const animate = () => {
      // PERF: IO-pause — only animate when section is visible
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      if (xPercent < -100) {
        xPercent = 0;
      } else if (xPercent > 0) {
        xPercent = -100;
      }

      if (textRef1.current && textRef2.current) {
        gsap.set(textRef1.current, { xPercent });
        gsap.set(textRef2.current, { xPercent });
      }

      xPercent += currentSpeed * currentDirection;
      animationFrameId = requestAnimationFrame(animate);
    };

    // PERF: IntersectionObserver gate — pause RAF when off-screen
    // This is the exact Phase 2 pattern from the optimization plan
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          animationFrameId = requestAnimationFrame(animate);
        }
      },
      { rootMargin: "100px" }
    );

    if (containerRef.current) {
      io.observe(containerRef.current);
    }

    // Scroll velocity tracking
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        currentDirection = velocity > 0 ? -1 : 1;
        currentSpeed = Math.max(0.05, Math.min(Math.abs(velocity) / 500, 2));
      },
    });

    // PERF: Decay interval — increased from 50ms to 100ms (half the CPU wake-ups)
    const decay = setInterval(() => {
      if (currentSpeed > 0.05) {
        currentSpeed = Math.max(0.05, currentSpeed * 0.9);
      }
    }, 100);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      clearInterval(decay);
      st.kill();
      io.disconnect();
    };
  }, [initialDirection, initialSpeed]);

  return (
    <div
      ref={containerRef}
      className={`relative flex overflow-hidden whitespace-nowrap ${className}`}
    >
      <div ref={textRef1} className="flex-shrink-0 pr-16">
        {children}
      </div>
      <div ref={textRef2} className="flex-shrink-0 pr-16 absolute left-[100%]">
        {children}
      </div>
    </div>
  );
}
