"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { personalInfo, socialLinks } from "@/lib/data";
import Magnetic from "@/components/ui/Magnetic";

const socialIcons: Record<string, string> = {
  github: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z",
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  instagram: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.897 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.897-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z",
  twitter: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.5 });

    // Stagger reveal heading characters
    if (headingRef.current) {
      const chars = headingRef.current.querySelectorAll(".char");
      tl.fromTo(
        chars,
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.04,
          duration: 1,
          ease: "power4.out",
        }
      );
    }

    // Subtitle
    tl.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );

    // CTA + socials
    tl.fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );

    // Scroll indicator
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 },
      "-=0.2"
    );

    // Pulse the scroll indicator
    gsap.to(scrollIndicatorRef.current, {
      y: 8,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: "sine.inOut",
      delay: 4,
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Split name into characters for stagger animation
  const nameChars = personalInfo.name.split("");

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24"
    >
      <div className="max-w-6xl">
        {/* Heading */}
        <h1
          ref={headingRef}
          className="font-serif leading-[0.95] tracking-tight pb-2"
          style={{
            fontSize: "clamp(3.5rem, 12vw, 11rem)",
            color: "#ededed",
          }}
        >
          {nameChars.map((char, i) => (
            <span key={i} className="inline-block overflow-hidden pb-4 -mb-4 pt-4 -mt-4">
              <span className="char inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
        >
          <div
            className="h-px w-16"
            style={{ backgroundColor: "rgba(237,237,237,0.3)" }}
          />
          <p
            className="font-sans text-sm md:text-base max-w-md leading-relaxed"
            style={{ color: "rgba(237,237,237,0.6)" }}
          >
            {personalInfo.tagline}
          </p>
        </div>

        {/* CTA + Socials */}
        <div
          ref={ctaRef}
          className="mt-12 md:mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-8"
        >
          <Magnetic strength={0.2}>
            <a
              href={personalInfo.resumeUrl}
              download
              className="interactive group relative font-sans text-xs uppercase tracking-[0.25em] px-8 py-4 border transition-all duration-500 hover:tracking-[0.35em] inline-block"
              style={{
                color: "#ededed",
                borderColor: "rgba(237,237,237,0.3)",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = "#ededed";
                (e.target as HTMLElement).style.color = "#0a0a0a";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = "transparent";
                (e.target as HTMLElement).style.color = "#ededed";
              }}
            >
              Download CV
            </a>
          </Magnetic>

          {/* Social icons */}
          <div className="flex items-center gap-5">
            {socialLinks.map((link) => (
              <Magnetic strength={0.4} key={link.name}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive opacity-40 hover:opacity-100 transition-opacity duration-300 p-2"
                  aria-label={link.name}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="#ededed"
                  >
                    <path d={socialIcons[link.name.toLowerCase()]} />
                  </svg>
                </a>
              </Magnetic>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <span
          className="font-sans text-[10px] uppercase tracking-[0.3em]"
          style={{ color: "rgba(237,237,237,0.3)" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-8"
          style={{ backgroundColor: "rgba(237,237,237,0.2)" }}
        />
      </div>
    </section>
  );
}
