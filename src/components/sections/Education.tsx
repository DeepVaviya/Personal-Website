"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education } from "@/lib/data";
import KineticText from "@/components/ui/KineticText";

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const entries = sectionRef.current?.querySelectorAll(".edu-entry");
      if (!entries) return;

      entries.forEach((entry, i) => {
        gsap.fromTo(
          entry,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: entry,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.1,
          }
        );
      });

      // Animate the connecting line
      const line = sectionRef.current?.querySelector(".timeline-line");
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 60%",
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative py-32 md:py-48 px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Scroll-Reactive Kinetic Background Text */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full pointer-events-none select-none z-0 opacity-[0.03]">
        <KineticText speed={0.07} direction={-1} className="font-serif text-[25vw] tracking-tighter">
          ACADEMIC BACKGROUND — CONTINUOUS LEARNING —
        </KineticText>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section label */}
      <div className="mb-16 md:mb-24">
        <span
          className="font-sans text-xs uppercase tracking-[0.3em]"
          style={{ color: "rgba(237,237,237,0.35)" }}
        >
          03 / Education
        </span>
        <h2
          className="font-serif text-4xl md:text-6xl lg:text-7xl mt-4 tracking-tight"
          style={{ color: "#ededed" }}
        >
          Background
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto">
        {/* Connecting line */}
        <div
          className="timeline-line absolute left-0 md:left-8 top-0 bottom-0 w-px origin-top"
          style={{ backgroundColor: "rgba(237,237,237,0.12)" }}
        />

        {education.map((edu, i) => (
          <div
            key={i}
            className="edu-entry relative pl-8 md:pl-20 pb-16 last:pb-0"
          >
            {/* Timeline dot */}
            <div
              className="absolute left-0 md:left-8 top-1 w-2 h-2 rounded-full -translate-x-[3px]"
              style={{ backgroundColor: "rgba(237,237,237,0.4)" }}
            />

            {/* Period */}
            <span
              className="font-mono text-xs block mb-2"
              style={{ color: "rgba(237,237,237,0.35)" }}
            >
              {edu.period}
            </span>

            {/* Degree */}
            <h3
              className="font-serif text-xl md:text-2xl tracking-tight mb-1"
              style={{ color: "#ededed" }}
            >
              {edu.degree}
            </h3>

            {/* Institution */}
            <p
              className="font-sans text-sm mb-1"
              style={{ color: "rgba(237,237,237,0.5)" }}
            >
              {edu.institution}
            </p>

            {/* Detail/score */}
            <span
              className="font-mono text-xs"
              style={{ color: "rgba(237,237,237,0.3)" }}
            >
              {edu.detail}
            </span>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
