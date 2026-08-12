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
  direction = 1,
  speed = 0.05,
  className = "",
}: KineticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let xPercent = 0;
    let animationFrameId: number;

    const animate = () => {
      if (xPercent < -100) {
        xPercent = 0;
      } else if (xPercent > 0) {
        xPercent = -100;
      }

      if (textRef1.current && textRef2.current) {
        gsap.set(textRef1.current, { xPercent });
        gsap.set(textRef2.current, { xPercent });
      }

      xPercent += speed * direction;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Scroll velocity tracking to alter speed and direction
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // Increase speed drastically on scroll, depending on velocity
        const velocity = self.getVelocity();
        // If scrolling down, move left. If scrolling up, move right.
        direction = velocity > 0 ? -1 : 1;
        // Clamp speed boost
        speed = Math.max(0.05, Math.min(Math.abs(velocity) / 500, 2));
      },
    });

    // Decay the speed back to normal after scrolling stops
    const decay = setInterval(() => {
      if (speed > 0.05) {
        speed = Math.max(0.05, speed * 0.9);
      }
    }, 50);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(decay);
      st.kill();
    };
  }, [direction, speed]);

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
