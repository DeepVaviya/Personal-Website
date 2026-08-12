"use client";

import { useEffect } from "react";
import { useScrollStore } from "@/stores/scrollStore";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollProgress() {
  const {
    setProgress,
    setHeroProgress,
    setAboutProgress,
    setWorkProgress,
    setVelocity,
    setActiveSection,
  } = useScrollStore();

  useEffect(() => {
    // Overall page scroll progress
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setProgress(self.progress);
        setVelocity(self.getVelocity() / 1000);
      },
    });

    // Hero section progress
    ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => setHeroProgress(self.progress),
      onEnter: () => setActiveSection("hero"),
      onEnterBack: () => setActiveSection("hero"),
    });

    // About section progress
    ScrollTrigger.create({
      trigger: "#about",
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => setAboutProgress(self.progress),
      onEnter: () => setActiveSection("about"),
      onEnterBack: () => setActiveSection("about"),
    });

    // Work section progress
    ScrollTrigger.create({
      trigger: "#work",
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => setWorkProgress(self.progress),
      onEnter: () => setActiveSection("work"),
      onEnterBack: () => setActiveSection("work"),
    });

    // Education
    ScrollTrigger.create({
      trigger: "#education",
      start: "top center",
      end: "bottom center",
      onEnter: () => setActiveSection("education"),
      onEnterBack: () => setActiveSection("education"),
    });

    // Contact
    ScrollTrigger.create({
      trigger: "#contact",
      start: "top center",
      end: "bottom bottom",
      onEnter: () => setActiveSection("contact"),
      onEnterBack: () => setActiveSection("contact"),
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [
    setProgress,
    setHeroProgress,
    setAboutProgress,
    setWorkProgress,
    setVelocity,
    setActiveSection,
  ]);
}
