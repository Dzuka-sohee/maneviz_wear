"use client";

import { useEffect, useState } from "react";
import CardNav from "@/components/navbar/CardNav";
import { Footer } from "@/components/footer/footer";
import { supabase } from "@/lib/supabase";

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

const FALLBACK_DATE = new Date("2026-06-06T00:00:00");

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
      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 bg-black border border-black/10 flex items-center justify-center">
        <span className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-wider tabular-nums">
          {display}
        </span>
      </div>
      <span className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-black/40 font-mono">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span className="text-2xl sm:text-3xl md:text-4xl font-black text-black/20 mb-5 sm:mb-6 md:mb-7 select-none">
      :
    </span>
  );
}

export default function HomeClient() {
  const [targetDate, setTargetDate] = useState<Date>(FALLBACK_DATE);

  useEffect(() => {
    const fetchActive = async () => {
      const { data } = await supabase
        .from("countdowns")
        .select("target_date")
        .eq("is_active", true)
        .single();

      if (data?.target_date) {
        setTargetDate(new Date(data.target_date));
      }
    };
    fetchActive();
  }, []);

  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  return (
    <main className="relative min-h-screen bg-white">
      <CardNav
        logo="/images/maneviz-new-white.png"
        logoAlt="MANEVIZ WEAR"
        items={navItems}
        baseColor="#111"
        menuColor="#fff"
        buttonBgColor="#fff"
        buttonTextColor="#111"
        ease="power3.out"
        theme="dark"
      />

      <div className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(0,0,0,0.06),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.06),transparent_70%)]" />

        <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 py-10">
          <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] text-black/30 uppercase mb-3 sm:mb-4">
            Coming Soon
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-9xl font-black tracking-widest text-black leading-none mb-2">
            MANEVIZ WEAR
          </h1>

          <div className="w-8 sm:w-10 h-px bg-black/20 mb-8 sm:mb-10 md:mb-12" />

          <div className="flex items-end gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12">
            <CountdownUnit value={days} label="Days" />
            <Separator />
            <CountdownUnit value={hours} label="Hours" />
            <Separator />
            <CountdownUnit value={minutes} label="Minutes" />
            <Separator />
            <CountdownUnit value={seconds} label="Seconds" />
          </div>

          <a
            href="#"
            className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase px-8 sm:px-10 py-3 sm:py-4 border border-black/20 text-black hover:bg-black hover:text-white transition-all duration-300"
          >
            Pre-Order Now
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}