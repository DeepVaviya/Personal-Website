"use client";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function Home() {
  // Initialize the scroll progress tracking
  useScrollProgress();

  return (
    <>
      {/* Main Content (Sits above the footer and slides up to reveal it on desktop) */}
      <main className="relative z-10 bg-[#0a0a0a] md:mb-[100vh]">
        <Hero />
        <About />
        <Work />
        <Education />
      </main>

      {/* Footer Container (Relative min-h-screen on mobile to perfectly frame content, Fixed reveal on desktop) */}
      <div className="relative md:fixed md:bottom-0 left-0 w-full min-h-[100vh] md:h-[100vh] z-0 flex flex-col bg-[#050505]">
        <Contact />
        <Footer />
      </div>
    </>
  );
}
