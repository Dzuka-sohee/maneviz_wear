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
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        window.location.replace("/Login-Admin-Icikiwir");
        return;
      }
      setChecking(false);
    };
    checkAuth();

    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        window.location.replace("/Login-Admin-Icikiwir");
      }
    });

    return () => { listener.subscription.unsubscribe(); };
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    await supabase.auth.signOut({ scope: "local" });

    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith("sb-") || key.includes("supabase"))) keysToRemove.push(key);
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));

    window.location.replace("/Login-Admin-Icikiwir");
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-black/20 animate-pulse" />
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/30">
            Memverifikasi sesi...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white flex overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      {/* Sidebar */}
      <aside className="relative z-10 w-56 min-h-screen border-r border-black/8 flex flex-col py-8 px-5 shrink-0 bg-white/80 backdrop-blur-sm">
        <div className="mb-10">
          <p className="font-mono text-[8px] tracking-[0.35em] text-black/30 uppercase mb-1">
            Admin Panel
          </p>
          <span className="text-sm font-black tracking-widest text-black">
            MANEVIZ WEAR
          </span>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          <p className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/25 mb-2">
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
                    ? "bg-black text-white"
                    : "text-black/40 hover:text-black hover:bg-black/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="font-mono text-[9px] tracking-[0.2em] uppercase text-black/30 hover:text-red-500 transition-colors text-left mt-4 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loggingOut ? "Keluar..." : "Keluar"}
        </button>
      </aside>

      {/* Main content */}
      <main className="relative z-10 flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}