"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    <main className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(0,0,0,0.06),transparent_70%)]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.06),transparent_70%)]" />

      <div className="relative z-10 w-full max-w-sm px-6">
        <div className="flex flex-col items-center mb-10">
          <p className="font-mono text-[9px] tracking-[0.4em] text-black/30 uppercase mb-3">
            Admin Panel
          </p>
          <h1 className="text-3xl font-black tracking-widest text-black">
            MANEVIZ WEAR
          </h1>
          <div className="w-8 h-px bg-black/15 mt-4" />
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] tracking-[0.25em] uppercase text-black/35">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@manevizwear.com"
              className="w-full bg-white border border-black/15 text-black text-sm px-4 py-3 outline-none focus:border-black/50 placeholder:text-black/20 font-mono transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] tracking-[0.25em] uppercase text-black/35">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white border border-black/15 text-black text-sm px-4 py-3 outline-none focus:border-black/50 placeholder:text-black/20 font-mono transition-colors"
            />
          </div>

          {error && (
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-red-500 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group mt-2 w-full flex items-center justify-center gap-2 bg-black text-white font-mono text-xs tracking-[0.2em] uppercase py-3.5 hover:bg-white hover:text-black border border-black transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Masuk..." : "Masuk"}
          </button>
        </form>

        <p className="text-center font-mono text-[8px] tracking-[0.2em] text-black/25 uppercase mt-8">
          Maneviz Wear © {new Date().getFullYear()}
        </p>
      </div>
    </main>
  );
}