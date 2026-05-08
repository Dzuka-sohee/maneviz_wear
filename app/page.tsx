"use client";

import { useEffect, useState } from "react";
import CardNav from "@/components/navbar/CardNav";
import { Footer } from "@/components/footer/footer";

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

// Ganti tanggal target sesuai kebutuhan
const TARGET_DATE = new Date("2026-06-06T00:00:00");

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-1 sm:gap-2">
      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 bg-[#111018] border border-white/10 flex items-center justify-center">
        <span className="text-3xl sm:text-4xl md:text-6xl font-black text-[#f0ece4] tracking-wider tabular-nums">
          {display}
        </span>
      </div>
      <span className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white/30 font-mono">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span className="text-2xl sm:text-3xl md:text-4xl font-black text-white/20 mb-5 sm:mb-6 md:mb-7 select-none">:</span>
  );
}

export default function Home() {
  const { days, hours, minutes, seconds } = useCountdown(TARGET_DATE);

  return (
    <main className="relative min-h-screen bg-gray-100">
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

      {/* Hero + Countdown */}
      <div className="relative min-h-screen bg-[#0d0b12] flex items-center justify-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(47,41,58,0.6),transparent)]" />

        <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 py-10">
          {/* Eyebrow */}
          <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] text-white/30 uppercase mb-3 sm:mb-4">
            Coming Soon
          </p>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl md:text-9xl font-black tracking-widest text-[#f0ece4] leading-none mb-2">
            MANEVIZ WEAR
          </h1>

          {/* Divider */}
          <div className="w-8 sm:w-10 h-px bg-white/20 mb-8 sm:mb-10 md:mb-12" />

          {/* Countdown */}
          <div className="flex items-end gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12">
            <CountdownUnit value={days} label="Days" />
            <Separator />
            <CountdownUnit value={hours} label="Hours" />
            <Separator />
            <CountdownUnit value={minutes} label="Minutes" />
            <Separator />
            <CountdownUnit value={seconds} label="Seconds" />
          </div>

          {/* Tagline */}
          <p className="font-mono text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-white/20 uppercase px-4">
            Something extraordinary is being crafted.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}