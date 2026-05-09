"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase, type Countdown } from "@/lib/supabase";

export default function DeletePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [countdown, setCountdown] = useState<Countdown | null>(null);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      const { data } = await supabase
        .from("countdowns").select("*").eq("id", id).single();
      if (data) setCountdown(data);
      setFetching(false);
    };
    fetch();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    setLoading(true);
    await supabase.from("countdowns").delete().eq("id", id);
    router.push("/Countdown/read");
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("id-ID", {
      day: "2-digit", month: "long", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  if (fetching) {
    return (
      <div className="p-8 md:p-12">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-black/20 animate-pulse" />
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/30">
            Memuat data...
          </p>
        </div>
      </div>
    );
  }

  if (!countdown) {
    return (
      <div className="p-8 md:p-12">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-red-500">
          Countdown tidak ditemukan.
        </p>
        <Link href="/Countdown/read" className="mt-4 inline-block font-mono text-[9px] tracking-[0.2em] uppercase text-black/40 hover:text-black">
          ← Kembali
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 max-w-lg">
      <div className="mb-10">
        <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-black/30 mb-2">
          Countdown Management
        </p>
        <h1 className="text-3xl md:text-4xl font-black tracking-widest text-black leading-none">
          HAPUS COUNTDOWN
        </h1>
        <div className="w-8 h-px bg-black/15 mt-4" />
      </div>

      {/* Warning box */}
      <div className="bg-red-50 border border-red-200 px-6 py-5 mb-8">
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-red-500 mb-4">
          ⚠ Tindakan ini tidak dapat dibatalkan
        </p>
        <div className="flex flex-col gap-1">
          <span className="text-black font-black tracking-wider">
            {countdown.label}
          </span>
          <span className="font-mono text-[9px] tracking-[0.1em] text-black/40">
            Target: {formatDate(countdown.target_date)}
          </span>
          {countdown.is_active && (
            <span className="font-mono text-[8px] tracking-[0.15em] uppercase text-amber-600 mt-1">
              ⚡ Ini adalah countdown yang sedang aktif
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="bg-red-500 text-white font-mono text-[10px] tracking-[0.2em] uppercase px-6 py-3 hover:bg-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Menghapus..." : "Ya, Hapus"}
        </button>
        <Link
          href="/Countdown/read"
          className="font-mono text-[10px] tracking-[0.2em] uppercase px-6 py-3 border border-black/15 text-black/40 hover:border-black/40 hover:text-black transition-colors"
        >
          Batal
        </Link>
      </div>
    </div>
  );
}