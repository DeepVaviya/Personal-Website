import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import ClientShell from "@/components/providers/ClientShell";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Deep Vaviya — Full-Stack Developer",
  description:
    "Portfolio of Deep Vaviya — Computer Engineering student and full-stack developer building intelligent, scalable software at the intersection of AI and web.",
  keywords: [
    "Deep Vaviya",
    "full-stack developer",
    "portfolio",
    "React",
    "Node.js",
    "AI",
    "web developer",
    "Mumbai",
  ],
  authors: [{ name: "Deep Vaviya" }],
  openGraph: {
    title: "Deep Vaviya — Full-Stack Developer",
    description:
      "Building intelligent, scalable software at the intersection of AI and web.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
      style={{ backgroundColor: "#0a0a0a" }}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/images/deep vaviya logo.png" />
      </head>
      <body
        className="font-sans"
        style={{ backgroundColor: "#0a0a0a", color: "#ededed" }}
        suppressHydrationWarning
      >
        <ClientShell />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
