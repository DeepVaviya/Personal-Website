"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
  triggerStart?: string;
}

export default function TextReveal({
  children,
  className = "",
  triggerStart = "top 80%",
}: TextRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll(".word");

    gsap.set(words, { opacity: 0.15 });

    gsap.to(words, {
      opacity: 1,
      stagger: 0.04,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: triggerStart,
        end: "bottom 60%",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === container) t.kill();
      });
    };
  }, [triggerStart]);

  // Split text into individual word spans
  const words = children.split(" ");

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span key={i} className="word inline-block mr-[0.3em]">
          {word}
        </span>
      ))}
    </p>
  );
}
