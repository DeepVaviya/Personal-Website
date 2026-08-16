import { create } from "zustand";

interface ScrollState {
  progress: number;
  heroProgress: number;
  aboutProgress: number;
  workProgress: number;
  showcaseProgress: number;
  velocity: number;
  activeSection: string;
  isLoaded: boolean;
  setProgress: (p: number) => void;
  setHeroProgress: (p: number) => void;
  setAboutProgress: (p: number) => void;
  setWorkProgress: (p: number) => void;
  setShowcaseProgress: (p: number) => void;
  setVelocity: (v: number) => void;
  setActiveSection: (s: string) => void;
  setIsLoaded: (l: boolean) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  heroProgress: 0,
  aboutProgress: 0,
  workProgress: 0,
  showcaseProgress: 0,
  velocity: 0,
  activeSection: "hero",
  isLoaded: false,
  setProgress: (p) => set({ progress: p }),
  setHeroProgress: (p) => set({ heroProgress: p }),
  setAboutProgress: (p) => set({ aboutProgress: p }),
  setWorkProgress: (p) => set({ workProgress: p }),
  setShowcaseProgress: (p) => set({ showcaseProgress: p }),
  setVelocity: (v) => set({ velocity: v }),
  setActiveSection: (s) => set({ activeSection: s }),
  setIsLoaded: (l) => set({ isLoaded: l }),
}));
