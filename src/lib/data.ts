export const personalInfo = {
  name: "Deep Vaviya",
  firstName: "Deep",
  lastName: "Vaviya",
  role: "Full-Stack Developer",
  tagline: "Building intelligent, scalable software at the intersection of AI and web.",
  email: "deepvaviya16@gmail.com",
  phone: "+91 9004946606",
  location: "Mumbai, India",
  resumeUrl: "/deep_vaviya_resume.pdf",
  about: `Computer Engineering student and full-stack developer with production experience shipping scalable web applications and AI-powered systems. I build with React, Node.js, FastAPI, and MongoDB — from real-time dashboards to computer-vision health monitors. Winner of Best UI/UX at Hackverse 2.0 National Hackathon and former Software Development Intern at BZTech Pvt. Ltd., where I developed REST APIs and optimized database operations for production use. I thrive at the intersection of clean engineering and creative problem-solving.`,
};

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/DeepVaviya",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/deep-vaviya-7958ba271/",
    icon: "linkedin",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/_deep_vaviya_/",
    icon: "instagram",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/_deep_vaviya_",
    icon: "twitter",
  },
];

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  liveUrl: string | null;
  image: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "ERP Billing System",
    description:
      "A modern ERP Billing System designed for efficient inventory and order management. Built with PHP and MySQL, it features a dashboard displaying key metrics like total products, revenue, and orders with modules for brands, categories, invoices, and reports.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    githubUrl: "https://github.com/DeepVaviya/ERP-Billing-System",
    liveUrl: null,
    image: "/images/projec1.png",
  },
  {
    id: 2,
    title: "Split It Out",
    description:
      "A sleek expense splitting web app built with React and Vite. Perfect for groups and roommates to easily divide bills and track shared expenses with real-time calculations and a modern UI.",
    tech: ["React", "Vite", "CSS", "JavaScript"],
    githubUrl: "https://github.com/DeepVaviya/Split-It-Out",
    liveUrl: "https://split-it-out.netlify.app/",
    image: "/images/project4.png",
  },
  {
    id: 3,
    title: "The Soul Art",
    description:
      "A professional, multi-page portfolio website designed to showcase creative artistry and design services. Features a categorized image gallery with fast load times, responsive design, and SEO optimization.",
    tech: ["HTML5", "CSS3", "JavaScript", "SEO"],
    githubUrl: "https://github.com/DeepVaviya/The-Soul-Art",
    liveUrl: "https://mehendibyishita.in",
    image: "/images/project5.png",
  },
  {
    id: 4,
    title: "Vital Sense",
    description:
      "Real-time, contactless physiological monitoring using just a webcam. Uses remote Photoplethysmography (rPPG) to extract vital signs from subtle skin color changes with AI-powered health suggestions using Groq's Llama 3.3 70B model.",
    tech: ["Python", "FastAPI", "React", "MongoDB", "WebSockets"],
    githubUrl: "https://github.com/DeepVaviya/Vital-Sense",
    liveUrl: "https://pulse-vision.netlify.app/",
    image: "/images/project6.png",
  },
  {
    id: 5,
    title: "Voice Trace",
    description:
      "A Voice-to-Business-Intelligence platform for street vendors. Whisper-powered voice transcription generates structured financial ledgers, tracks micro-loan readiness, and delivers weather-aware stock predictions using AI.",
    tech: ["Node.js", "React", "MongoDB", "OpenAI", "Express"],
    githubUrl: "https://github.com/DeepVaviya/Voice-Trace",
    liveUrl: "https://voicetracee.netlify.app/",
    image: "/images/project7.png",
  },
];

export const education = [
  {
    period: "2024 — 2027",
    degree: "B.Tech in Computer Engineering",
    institution: "Shah & Anchor Engineering College",
    detail: "CGPA: 8.82",
  },
  {
    period: "2021 — 2024",
    degree: "Diploma in Computer Engineering",
    institution: "Vidyalankar Polytechnic",
    detail: "89.88%",
  },
  {
    period: "2015 — 2021",
    degree: "SSC",
    institution: "M.D. Bhatia High School, Mumbai",
    detail: "82.20%",
  },
];

export const skills = [
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "FastAPI",
  "MongoDB",
  "TypeScript",
  "JavaScript",
  "Three.js",
  "GSAP",
  "REST APIs",
  "Git",
];

export const experience = [
  {
    role: "Software Development Intern",
    company: "BZTech Pvt. Ltd., Mumbai",
    period: "Dec 2025 — May 2026",
    highlights: [
      "Developed full-stack web applications and REST APIs for production use",
      "Improved application performance and optimized database operations",
      "Collaborated using Git workflows, debugging, and feature deployment",
    ],
  },
];
