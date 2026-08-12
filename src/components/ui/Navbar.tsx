"use client";

import { useRef } from "react";
import gsap from "gsap";
import { personalInfo, socialLinks } from "@/lib/data";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const magneticRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const el = magneticRefs.current[index];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index: number) => {
    const el = magneticRefs.current[index];
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.5)" });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference">
      <nav className="flex items-center justify-between px-6 md:px-12 py-6">
        {/* Logo */}
        <a
          href="#hero"
          className="font-serif text-lg tracking-tight interactive"
          style={{ color: "#ededed" }}
        >
          {personalInfo.firstName}
          <span className="italic font-light ml-1">
            {personalInfo.lastName}
          </span>
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              ref={(el) => { magneticRefs.current[i] = el; }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
              className="font-sans text-xs uppercase tracking-[0.2em] interactive transition-opacity duration-300 hover:opacity-60"
              style={{ color: "#ededed" }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* GitHub Link */}
        <a
          href={socialLinks.find((s) => s.name === "GitHub")?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-xs uppercase tracking-[0.2em] interactive transition-opacity duration-300 hover:opacity-60"
          style={{ color: "#ededed" }}
        >
          GitHub ↗
        </a>
      </nav>
    </header>
  );
}
