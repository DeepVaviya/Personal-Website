"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useScrollStore } from "@/stores/scrollStore";

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const setIsLoaded = useScrollStore((s) => s.setIsLoaded);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoaded(true);
        // Remove the loading gate — reveals all page content
        document.documentElement.classList.remove('is-loading');
        setTimeout(() => setVisible(false), 500);
      },
    });

    // Counter animation 0 → 100
    const counter = { value: 0 };
    tl.to(counter, {
      value: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(counter.value).toString();
        }
      },
    });

    // Name reveal
    tl.fromTo(
      nameRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      0.3
    );

    // Name and counter fade out
    tl.to([nameRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.in",
      delay: 0.2,
    });

    // Slicing Curtains wipe away
    const slices = document.querySelectorAll(".curtain-slice");
    tl.to(slices, {
      yPercent: -100,
      stagger: 0.08,
      duration: 1,
      ease: "power4.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [setIsLoaded]);

  if (!visible) return null;

  return (
    <div
      className="preloader-overlay fixed inset-0 z-[10000] flex flex-col items-center justify-center pointer-events-none"
    >
      {/* Slicing Curtains */}
      <div className="absolute inset-0 flex w-full h-full z-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="curtain-slice flex-1 h-full"
            style={{ backgroundColor: "#0a0a0a" }}
          />
        ))}
      </div>

      <div ref={preloaderRef} className="absolute inset-0 z-10 flex flex-col items-center justify-center">
      <div ref={nameRef} className="text-center opacity-0">
        <h1
          className="font-serif text-5xl md:text-7xl tracking-tight"
          style={{ color: "#ededed" }}
        >
          Deep <span className="italic font-light">Vaviya</span>
        </h1>
        <div className="mt-8 flex items-center gap-4 justify-center">
          <div
            className="h-px flex-1 max-w-[80px]"
            style={{ backgroundColor: "rgba(237,237,237,0.2)" }}
          />
          <span
            ref={counterRef}
            className="font-mono text-sm tabular-nums"
            style={{ color: "rgba(237,237,237,0.5)" }}
          >
            0
          </span>
          <span
            className="font-mono text-sm"
            style={{ color: "rgba(237,237,237,0.3)" }}
          >
            %
          </span>
          <div
            className="h-px flex-1 max-w-[80px]"
            style={{ backgroundColor: "rgba(237,237,237,0.2)" }}
          />
        </div>
      </div>
    </div>
    </div>
  );
}
