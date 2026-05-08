"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Kalau sudah punya session aktif, langsung redirect
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        window.location.replace("/Countdown/read");
      }
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      setError(error?.message ?? "Login gagal, coba lagi.");
      setLoading(false);
      return;
    }

    window.location.replace("/Countdown/read");
  };

  return (
    <main className="relative min-h-screen bg-[#0d0b12] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(47,41,58,0.6),transparent)]" />

      <div className="relative z-10 w-full max-w-sm px-6">
        <div className="flex flex-col items-center mb-10">
          <p className="font-mono text-[9px] tracking-[0.4em] text-white/30 uppercase mb-3">
            Admin Panel
          </p>
          <h1 className="text-3xl font-black tracking-widest text-[#f0ece4]">
            MANEVIZ WEAR
          </h1>
          <div className="w-8 h-px bg-white/20 mt-4" />
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/30">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@manevizwear.com"
              className="w-full bg-[#111018] border border-white/10 text-[#f0ece4] text-sm px-4 py-3 outline-none focus:border-white/30 placeholder:text-white/20 font-mono transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/30">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#111018] border border-white/10 text-[#f0ece4] text-sm px-4 py-3 outline-none focus:border-white/30 placeholder:text-white/20 font-mono transition-colors"
            />
          </div>

          {error && (
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-red-400/80 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-[#f0ece4] text-[#0d0b12] font-black text-xs tracking-[0.2em] uppercase py-3.5 hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Masuk..." : "Masuk"}
          </button>
        </form>

        <p className="text-center font-mono text-[8px] tracking-[0.2em] text-white/20 uppercase mt-8">
          Maneviz Wear © {new Date().getFullYear()}
        </p>
      </div>
    </main>
  );
}