"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function CreatePage() {
  const router = useRouter();
  const [label, setLabel] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Jika set aktif, nonaktifkan yang lain dulu
    if (isActive) {
      await supabase.from("countdowns").update({ is_active: false }).neq("id", "");
    }

    const { error } = await supabase.from("countdowns").insert({
      label,
      target_date: new Date(targetDate).toISOString(),
      is_active: isActive,
    });

    if (error) {
      setError("Gagal menyimpan. Coba lagi.");
      setLoading(false);
      return;
    }

    router.push("/Countdown/read");
  };

  return (
    <div className="p-8 md:p-12 max-w-lg">
      {/* Header */}
      <div className="mb-10">
        <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-white/30 mb-2">
          Countdown Management
        </p>
        <h1 className="text-3xl md:text-4xl font-black tracking-widest text-[#f0ece4]">
          TAMBAH BARU
        </h1>
        <div className="w-8 h-px bg-white/20 mt-4" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Label */}
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/30">
            Nama / Label
          </label>
          <input
            type="text"
            required
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Grand Launch"
            className="w-full bg-[#111018] border border-white/10 text-[#f0ece4] text-sm px-4 py-3 outline-none focus:border-white/30 placeholder:text-white/20 font-mono transition-colors"
          />
        </div>

        {/* Target Date */}
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/30">
            Tanggal & Waktu Target
          </label>
          <input
            type="datetime-local"
            required
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full bg-[#111018] border border-white/10 text-[#f0ece4] text-sm px-4 py-3 outline-none focus:border-white/30 font-mono transition-colors [color-scheme:dark]"
          />
        </div>

        {/* Is Active */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsActive(!isActive)}
            className={`w-10 h-5 border transition-colors relative shrink-0 ${
              isActive ? "bg-[#f0ece4] border-[#f0ece4]" : "bg-transparent border-white/20"
            }`}
          >
            <span
              className={`absolute top-0.5 w-3.5 h-3.5 transition-all ${
                isActive ? "left-[calc(100%-18px)] bg-[#0d0b12]" : "left-0.5 bg-white/30"
              }`}
            />
          </button>
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/40">
            Jadikan countdown aktif di halaman utama
          </span>
        </div>

        {error && (
          <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-red-400/80">
            {error}
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-3 mt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#f0ece4] text-[#0d0b12] font-black text-[10px] tracking-[0.2em] uppercase px-6 py-3 hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
          <Link
            href="/Countdown/read"
            className="font-mono text-[10px] tracking-[0.2em] uppercase px-6 py-3 border border-white/10 text-white/40 hover:border-white/30 hover:text-white/60 transition-colors"
          >
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}