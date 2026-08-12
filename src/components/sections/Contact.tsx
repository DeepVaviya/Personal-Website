"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo, socialLinks } from "@/lib/data";
import Magnetic from "@/components/ui/Magnetic";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll(".word");
        gsap.fromTo(
          words,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Form reveal
      gsap.fromTo(
        formRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
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
      id="contact"
      className="relative h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 max-w-[1920px] mx-auto w-full pt-16"
    >

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left side — Heading + Info */}
        <div className="flex flex-col justify-center">
          <h2
            ref={headingRef}
            className="font-serif text-[12vw] lg:text-[9vw] leading-[0.9] tracking-tighter overflow-hidden pb-4 -mb-4 pt-4 -mt-4"
            style={{ color: "#ededed" }}
          >
            {"Let's work together".split(" ").map((word, i) => (
              <span key={i} className="word inline-block mr-[0.25em]">
                {word}
              </span>
            ))}
          </h2>

          <div className="mt-8 md:mt-12 space-y-4 md:space-y-6">
            <div>
              <span
                className="font-sans text-xs uppercase tracking-[0.2em] block mb-2"
                style={{ color: "rgba(237,237,237,0.35)" }}
              >
                Email
              </span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="interactive font-sans text-base transition-opacity duration-300 hover:opacity-60"
                style={{ color: "#ededed" }}
              >
                {personalInfo.email}
              </a>
            </div>
            <div>
              <span
                className="font-sans text-xs uppercase tracking-[0.2em] block mb-2"
                style={{ color: "rgba(237,237,237,0.35)" }}
              >
                Phone
              </span>
              <a
                href={`tel:${personalInfo.phone}`}
                className="interactive font-sans text-base transition-opacity duration-300 hover:opacity-60"
                style={{ color: "#ededed" }}
              >
                {personalInfo.phone}
              </a>
            </div>
            <div>
              <span
                className="font-sans text-xs uppercase tracking-[0.2em] block mb-2"
                style={{ color: "rgba(237,237,237,0.35)" }}
              >
                Social
              </span>
              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive font-sans text-sm uppercase tracking-[0.15em] transition-opacity duration-300 hover:opacity-60"
                    style={{ color: "rgba(237,237,237,0.6)" }}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right side — Netlify Form */}
        <div className="flex flex-col justify-center">
          <form
            ref={formRef}
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="space-y-6"
          >
            {/* Netlify hidden fields */}
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don&apos;t fill this out: <input name="bot-field" />
              </label>
            </p>

            <div>
              <label
                htmlFor="name"
                className="font-sans text-xs uppercase tracking-[0.2em] block mb-3"
                style={{ color: "rgba(237,237,237,0.4)" }}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full bg-transparent border-b pb-3 font-sans text-base focus:outline-none transition-colors duration-300"
                style={{
                  color: "#ededed",
                  borderColor: "rgba(237,237,237,0.15)",
                }}
                onFocus={(e) =>
                  ((e.target as HTMLInputElement).style.borderColor =
                    "rgba(237,237,237,0.5)")
                }
                onBlur={(e) =>
                  ((e.target as HTMLInputElement).style.borderColor =
                    "rgba(237,237,237,0.15)")
                }
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="font-sans text-xs uppercase tracking-[0.2em] block mb-3"
                style={{ color: "rgba(237,237,237,0.4)" }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-transparent border-b pb-3 font-sans text-base focus:outline-none transition-colors duration-300"
                style={{
                  color: "#ededed",
                  borderColor: "rgba(237,237,237,0.15)",
                }}
                onFocus={(e) =>
                  ((e.target as HTMLInputElement).style.borderColor =
                    "rgba(237,237,237,0.5)")
                }
                onBlur={(e) =>
                  ((e.target as HTMLInputElement).style.borderColor =
                    "rgba(237,237,237,0.15)")
                }
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="font-sans text-xs uppercase tracking-[0.2em] block mb-2"
                style={{ color: "rgba(237,237,237,0.4)" }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={2}
                required
                className="w-full bg-transparent border-b pb-3 font-sans text-base focus:outline-none transition-colors duration-300 resize-none"
                style={{
                  color: "#ededed",
                  borderColor: "rgba(237,237,237,0.15)",
                }}
                onFocus={(e) =>
                  ((e.target as HTMLTextAreaElement).style.borderColor =
                    "rgba(237,237,237,0.5)")
                }
                onBlur={(e) =>
                  ((e.target as HTMLTextAreaElement).style.borderColor =
                    "rgba(237,237,237,0.15)")
                }
              />
            </div>

            <Magnetic strength={0.2}>
              <button
                type="submit"
                className="interactive font-sans text-xs uppercase tracking-[0.25em] px-10 py-4 border transition-all duration-500 hover:tracking-[0.35em] inline-block"
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
                Send Message
              </button>
            </Magnetic>
          </form>
        </div>
      </div>
    </section>
  );
}
