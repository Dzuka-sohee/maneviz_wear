"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

const navItems = [
  { label: "Semua Countdown", href: "/Countdown/read" },
  { label: "Tambah Baru", href: "/Countdown/create" },
];

export default function CountdownLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        window.location.replace("/Login");
        return;
      }
      setChecking(false);
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.replace("/Login");
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0d0b12] flex items-center justify-center">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30">
          Memverifikasi sesi...
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0d0b12] flex overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_50%,rgba(47,41,58,0.5),transparent)] pointer-events-none" />

      {/* Sidebar */}
      <aside className="relative z-10 w-56 min-h-screen border-r border-white/10 flex flex-col py-8 px-5 shrink-0">
        <div className="mb-10">
          <p className="font-mono text-[8px] tracking-[0.35em] text-white/30 uppercase mb-1">
            Admin Panel
          </p>
          <span className="text-sm font-black tracking-widest text-[#f0ece4]">
            MANEVIZ WEAR
          </span>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          <p className="font-mono text-[8px] tracking-[0.25em] uppercase text-white/20 mb-2">
            Countdown
          </p>
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-mono text-[10px] tracking-[0.15em] uppercase px-3 py-2.5 transition-colors ${
                  active
                    ? "bg-white/10 text-[#f0ece4]"
                    : "text-white/40 hover:text-white/70 hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/30 hover:text-red-400/70 transition-colors text-left mt-4"
        >
          Keluar
        </button>
      </aside>

      {/* Main content */}
      <main className="relative z-10 flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}