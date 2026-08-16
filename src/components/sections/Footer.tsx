"use client";

import { personalInfo, socialLinks } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative py-6 sm:py-8 lg:py-12 px-4 sm:px-6 md:px-16 lg:px-24 border-t"
      style={{ borderColor: "rgba(237,237,237,0.08)" }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <p
          className="font-sans text-[10px] sm:text-xs text-center sm:text-left"
          style={{ color: "rgba(237,237,237,0.3)" }}
        >
          © {year} {personalInfo.name}. All rights reserved.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="interactive font-sans text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.15em] transition-opacity duration-300 hover:opacity-100"
              style={{ color: "rgba(237,237,237,0.3)" }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
