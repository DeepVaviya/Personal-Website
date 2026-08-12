"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo, skills, experience } from "@/lib/data";
import TextReveal from "@/components/ui/TextReveal";
import KineticText from "@/components/ui/KineticText";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Photo parallax
      gsap.fromTo(
        photoRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: photoRef.current,
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
          },
        }
      );

      // Skills stagger
      if (skillsRef.current) {
        const badges = skillsRef.current.querySelectorAll(".skill-badge");
        gsap.fromTo(
          badges,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.04,
            ease: "power3.out",
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Experience
      gsap.fromTo(
        expRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: expRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex flex-col justify-center py-16 md:py-20 px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Scroll-Reactive Kinetic Background Text */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full pointer-events-none select-none z-0 opacity-[0.03]">
        <KineticText speed={0.05} direction={1} className="font-serif text-[20vw] tracking-tighter">
          CREATIVE DEVELOPER — INTERACTIVE DESIGNER —
        </KineticText>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Section label */}
        <div className="mb-8 md:mb-10">
          <span
            className="font-sans text-xs uppercase tracking-[0.3em]"
            style={{ color: "rgba(237,237,237,0.35)" }}
          >
            01 / About
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Text side */}
        <div className="lg:col-span-7">
          <TextReveal
            className="font-sans text-base md:text-lg lg:text-xl leading-relaxed"
            triggerStart="top 85%"
          >
            {personalInfo.about}
          </TextReveal>

          {/* Skills — Animated Marquee */}
          <div ref={skillsRef} className="mt-8 overflow-hidden">
            <h3
              className="font-sans text-xs uppercase tracking-[0.25em] mb-5"
              style={{ color: "rgba(237,237,237,0.4)" }}
            >
              Technologies
            </h3>
            {/* Marquee container with gradient masks */}
            <div className="relative">
              {/* Left fade */}
              <div
                className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, #0a0a0a 0%, transparent 100%)",
                }}
              />
              {/* Right fade */}
              <div
                className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to left, #0a0a0a 0%, transparent 100%)",
                }}
              />

              {/* Row 1 — scrolls left */}
              <div className="flex gap-3 mb-3 animate-marquee-left">
                {[...skills, ...skills].map((skill, i) => (
                  <span
                    key={`r1-${i}`}
                    className="skill-badge flex-shrink-0 font-sans text-xs px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 hover:scale-110"
                    style={{
                      color: "rgba(237,237,237,0.85)",
                      background:
                        "linear-gradient(135deg, rgba(150,102,255,0.12) 0%, rgba(68,136,255,0.08) 100%)",
                      border: "1px solid rgba(150,102,255,0.2)",
                      boxShadow: "0 0 12px rgba(150,102,255,0.06)",
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.boxShadow =
                        "0 0 20px rgba(150,102,255,0.3), 0 0 40px rgba(150,102,255,0.1)";
                      (e.target as HTMLElement).style.borderColor =
                        "rgba(150,102,255,0.5)";
                      (e.target as HTMLElement).style.color = "#ffffff";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.boxShadow =
                        "0 0 12px rgba(150,102,255,0.06)";
                      (e.target as HTMLElement).style.borderColor =
                        "rgba(150,102,255,0.2)";
                      (e.target as HTMLElement).style.color =
                        "rgba(237,237,237,0.85)";
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Row 2 — scrolls right */}
              <div className="flex gap-3 animate-marquee-right">
                {[...skills.slice().reverse(), ...skills.slice().reverse()].map(
                  (skill, i) => (
                    <span
                      key={`r2-${i}`}
                      className="skill-badge flex-shrink-0 font-sans text-xs px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 hover:scale-110"
                      style={{
                        color: "rgba(237,237,237,0.85)",
                        background:
                          "linear-gradient(135deg, rgba(68,136,255,0.12) 0%, rgba(150,102,255,0.08) 100%)",
                        border: "1px solid rgba(68,136,255,0.2)",
                        boxShadow: "0 0 12px rgba(68,136,255,0.06)",
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.boxShadow =
                          "0 0 20px rgba(68,136,255,0.3), 0 0 40px rgba(68,136,255,0.1)";
                        (e.target as HTMLElement).style.borderColor =
                          "rgba(68,136,255,0.5)";
                        (e.target as HTMLElement).style.color = "#ffffff";
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.boxShadow =
                          "0 0 12px rgba(68,136,255,0.06)";
                        (e.target as HTMLElement).style.borderColor =
                          "rgba(68,136,255,0.2)";
                        (e.target as HTMLElement).style.color =
                          "rgba(237,237,237,0.85)";
                      }}
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Experience */}
          <div ref={expRef} className="mt-8">
            <h3
              className="font-sans text-xs uppercase tracking-[0.25em] mb-4"
              style={{ color: "rgba(237,237,237,0.4)" }}
            >
              Experience
            </h3>
            {experience.map((exp, i) => (
              <div key={i} className="border-t pt-4" style={{ borderColor: "rgba(237,237,237,0.1)" }}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h4
                    className="font-sans text-sm font-medium"
                    style={{ color: "#ededed" }}
                  >
                    {exp.role}
                  </h4>
                  <span
                    className="font-mono text-xs mt-1 sm:mt-0"
                    style={{ color: "rgba(237,237,237,0.4)" }}
                  >
                    {exp.period}
                  </span>
                </div>
                <p
                  className="font-sans text-xs mb-2"
                  style={{ color: "rgba(237,237,237,0.5)" }}
                >
                  {exp.company}
                </p>
                <ul className="space-y-0.5">
                  {exp.highlights.map((h, j) => (
                    <li
                      key={j}
                      className="font-sans text-xs pl-3 relative"
                      style={{ color: "rgba(237,237,237,0.5)" }}
                    >
                      <span
                        className="absolute left-0 top-1.5 w-1 h-1 rounded-full"
                        style={{ backgroundColor: "rgba(237,237,237,0.3)" }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Photo side */}
        <div className="lg:col-span-5 flex items-start justify-center lg:justify-end">
          <div ref={photoRef} className="relative">
            <div
              className="relative overflow-hidden"
              style={{
                width: "clamp(200px, 20vw, 300px)",
                aspectRatio: "3/4",
              }}
            >
              <Image
                src="/images/me_photo.jpg"
                alt="Deep Vaviya"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 768px) 60vw, 20vw"
                priority={false}
              />
            </div>
            {/* Decorative frame */}
            <div
              className="absolute -bottom-3 -right-3 w-full h-full border -z-10"
              style={{ borderColor: "rgba(237,237,237,0.1)" }}
            />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
