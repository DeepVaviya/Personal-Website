"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/data";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card-wrapper");

      cards.forEach((card, index) => {
        // We don't animate the last card away
        if (index === cards.length - 1) return;

        // As the NEXT card comes up, scale and fade this card down
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.5,
          y: -20, // push slightly up
          ease: "none",
          scrollTrigger: {
            trigger: cards[index + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="relative w-full pb-[20vh] pt-24">
      {/* Background Title (Parallax) */}
      <div className="absolute top-24 left-0 w-full overflow-hidden flex justify-center pointer-events-none select-none -z-10">
        <h2
          className="font-serif text-[15vw] tracking-tighter opacity-10 whitespace-nowrap"
          style={{ color: "#ededed" }}
        >
          SELECTED WORK
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        {/* Section label */}
        <div className="mb-20">
          <span
            className="font-sans text-xs uppercase tracking-[0.3em]"
            style={{ color: "rgba(237,237,237,0.35)" }}
          >
            02 / Selected Work
          </span>
          <h2
            className="font-serif text-4xl md:text-6xl lg:text-7xl mt-4 tracking-tight"
            style={{ color: "#ededed" }}
          >
            Projects
          </h2>
        </div>

        {/* Stacked Cards Container */}
        <div ref={containerRef} className="relative w-full flex flex-col gap-12 md:gap-24">
          {projects.map((project, index) => {
            // Calculate a slight top offset so they stack nicely
            const topOffset = `calc(15vh + ${index * 30}px)`;

            return (
              <div
                key={project.id}
                className="project-card-wrapper sticky w-full"
                style={{ top: topOffset }}
              >
                {/* The Card */}
                <div
                  className="w-full flex flex-col lg:flex-row overflow-hidden rounded-[2rem] border backdrop-blur-xl group/card shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]"
                  style={{
                    backgroundColor: "#0f0f0f",
                    borderColor: "rgba(237, 237, 237, 0.08)",
                  }}
                >
                  {/* Left Side: Content */}
                  <div className="flex-1 flex flex-col p-8 md:p-12 lg:p-16">
                    {/* Card number */}
                    <div className="flex items-center gap-4 mb-8">
                      <span
                        className="font-mono text-xs"
                        style={{ color: "rgba(237,237,237,0.3)" }}
                      >
                        {String(index + 1).padStart(2, "0")} /{" "}
                        {String(projects.length).padStart(2, "0")}
                      </span>
                      <div
                        className="h-px w-12"
                        style={{ backgroundColor: "rgba(237,237,237,0.1)" }}
                      />
                    </div>

                    {/* Title & Description */}
                    <h3
                      className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight mb-6"
                      style={{ color: "#ededed" }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="font-sans text-sm md:text-base leading-relaxed mb-8 max-w-xl"
                      style={{ color: "rgba(237,237,237,0.6)" }}
                    >
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-12">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] md:text-xs uppercase tracking-wider px-4 py-1.5 border rounded-full transition-colors hover:bg-white/5"
                          style={{
                            color: "rgba(237,237,237,0.7)",
                            borderColor: "rgba(237,237,237,0.15)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-8 mt-auto">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="interactive group/link flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] transition-all duration-300"
                        style={{ color: "#ededed" }}
                      >
                        <span className="relative overflow-hidden">
                          <span className="inline-block transition-transform duration-300 group-hover/link:-translate-y-full">
                            GitHub
                          </span>
                          <span className="absolute left-0 top-0 inline-block translate-y-full transition-transform duration-300 group-hover/link:translate-y-0 text-[#9966ff]">
                            GitHub
                          </span>
                        </span>
                        <span className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
                          ↗
                        </span>
                      </a>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="interactive group/link flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] transition-all duration-300"
                          style={{ color: "#ededed" }}
                        >
                          <span className="relative overflow-hidden">
                            <span className="inline-block transition-transform duration-300 group-hover/link:-translate-y-full">
                              Live Demo
                            </span>
                            <span className="absolute left-0 top-0 inline-block translate-y-full transition-transform duration-300 group-hover/link:translate-y-0 text-[#4488ff]">
                              Live Demo
                            </span>
                          </span>
                          <span className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
                            ↗
                          </span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Side: Image */}
                  <div className="w-full lg:w-[55%] relative overflow-hidden min-h-[300px] lg:min-h-[500px]">
                    {/* Background glow behind image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#9966ff]/10 to-[#4488ff]/10 z-0" />

                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-center z-10 transition-transform duration-[1.5s] ease-out group-hover/card:scale-110"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                    />

                    {/* Inner shadow overlay for blending */}
                    <div
                      className="absolute inset-0 z-20 pointer-events-none"
                      style={{
                        boxShadow: "inset 0 0 40px rgba(10,10,10,0.3)",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


