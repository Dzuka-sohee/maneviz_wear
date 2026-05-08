"use client";

import CardNav from "@/components/navbar/CardNav";
import { Footer } from "@/components/footer/footer";
import Link from "next/link";

const navItems = [
  {
    label: "About",
    bgColor: "#1B1722",
    textColor: "#fff",
    links: [
      { label: "Company", ariaLabel: "About Company", href: "/about" },
      { label: "Careers", ariaLabel: "About Careers", href: "/careers" },
    ],
  },
  {
    label: "Projects",
    bgColor: "#2F293A",
    textColor: "#fff",
    links: [
      { label: "Featured", ariaLabel: "Featured Projects", href: "/projects" },
      { label: "Case Studies", ariaLabel: "Project Case Studies", href: "/case-studies" },
    ],
  },
  {
    label: "Contact",
    bgColor: "#2F293A",
    textColor: "#fff",
    links: [
      { label: "Email", ariaLabel: "Email us", href: "mailto:hello@manevizwear.com" },
      { label: "Twitter", ariaLabel: "Twitter", href: "https://twitter.com" },
      { label: "LinkedIn", ariaLabel: "LinkedIn", href: "https://linkedin.com" },
    ],
  },
];

export default function UnderConstruction() {
  return (
    <main className="relative min-h-screen bg-white">
      <CardNav
        logo="/images/maneviz.png"
        logoAlt="MANEVIZ WEAR"
        items={navItems}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
        theme="light"
      />

      {/* Hero */}
      <div className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden">

        {/* Background subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Top-right corner accent */}
        <div className="absolute top-0 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(0,0,0,0.06),transparent_70%)]" />

        {/* Bottom-left corner accent */}
        <div className="absolute bottom-0 left-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.06),transparent_70%)]" />

        <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 py-10">

          {/* Eyebrow */}
          <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] text-black/30 uppercase mb-3 sm:mb-4">
            MANEVIZ WEAR
          </p>

          {/* Big label */}
          <div className="relative mb-3 sm:mb-4">
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-widest text-black leading-none">
              UNDER
            </h1>
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-widest leading-none text-white [-webkit-text-stroke:2px_#111] md:[-webkit-text-stroke:3px_#111]">
              CONSTRUCTION
            </h1>
          </div>

          {/* Divider */}
          <div className="w-8 sm:w-10 h-px bg-black/20 mb-8 sm:mb-10 md:mb-12" />

          {/* Description */}
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] text-black/40 uppercase max-w-xs sm:max-w-sm md:max-w-md mb-8 sm:mb-10 md:mb-12 leading-relaxed px-2">
            Halaman ini sedang dalam tahap pengembangan. <br className="hidden sm:block" />
            Kami sedang menyiapkan sesuatu yang luar biasa.
          </p>

          {/* Status badge */}
          <div className="flex items-center gap-2 sm:gap-3 border border-black/10 px-4 sm:px-6 py-2 sm:py-3 mb-10 sm:mb-12 md:mb-14">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-black/50 uppercase">
              In Development
            </span>
          </div>

          {/* Back button */}
          <Link
            href="/"
            className="group flex items-center gap-2 sm:gap-3 bg-black text-white px-6 sm:px-8 py-3 sm:py-4 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase hover:bg-white hover:text-black border border-black transition-all duration-300"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            Kembali ke Beranda
          </Link>

        </div>
      </div>

      <Footer />
    </main>
  );
}