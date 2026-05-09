"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { supabase, type Countdown } from "@/lib/supabase";

export default function ReadPage() {
  const [countdowns, setCountdowns] = useState<Countdown[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchCountdowns = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("countdowns")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setCountdowns(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCountdowns();
  }, [fetchCountdowns]);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Hapus countdown ini?");
    if (!confirm) return;
    setDeletingId(id);
    await supabase.from("countdowns").delete().eq("id", id);
    await fetchCountdowns();
    setDeletingId(null);
  };

  const handleToggleActive = async (id: string, current: boolean) => {
    await supabase.from("countdowns").update({ is_active: false }).neq("id", "");
    if (!current) {
      await supabase.from("countdowns").update({ is_active: true }).eq("id", id);
    }
    await fetchCountdowns();
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      {/* Header */}
      <div className="mb-10">
        <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-black/30 mb-2">
          Countdown Management
        </p>
        <h1 className="text-3xl md:text-4xl font-black tracking-widest text-black leading-none">
          SEMUA COUNTDOWN
        </h1>
        <div className="w-8 h-px bg-black/15 mt-4" />
      </div>

      {/* Action */}
      <div className="mb-8">
        <Link
          href="/Countdown/create"
          className="group inline-flex items-center gap-2 bg-black text-white font-mono text-[10px] tracking-[0.2em] uppercase px-6 py-3 hover:bg-white hover:text-black border border-black transition-all duration-300"
        >
          <span className="transition-transform duration-300 group-hover:rotate-90">+</span>
          Tambah Countdown
        </Link>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-black/20 animate-pulse" />
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/30">
            Memuat data...
          </p>
        </div>
      ) : countdowns.length === 0 ? (
        <div className="border border-black/10 px-6 py-10 text-center">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/30">
            Belum ada countdown. Tambahkan yang pertama!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {countdowns.map((cd) => (
            <div
              key={cd.id}
              className="bg-white border border-black/8 px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-black/20 transition-colors"
            >
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-black font-black tracking-wider text-sm truncate">
                    {cd.label}
                  </span>
                  {cd.is_active && (
                    <span className="font-mono text-[7px] tracking-[0.2em] uppercase bg-black text-white px-2 py-0.5">
                      Aktif
                    </span>
                  )}
                </div>
                <p className="font-mono text-[9px] tracking-[0.15em] text-black/35">
                  Target: {formatDate(cd.target_date)}
                </p>
                <p className="font-mono text-[8px] tracking-[0.1em] text-black/25 mt-0.5">
                  Dibuat: {formatDate(cd.created_at)}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleToggleActive(cd.id, cd.is_active)}
                  className="font-mono text-[8px] tracking-[0.15em] uppercase px-3 py-2 border border-black/15 text-black/40 hover:border-black/40 hover:text-black transition-colors"
                >
                  {cd.is_active ? "Nonaktifkan" : "Aktifkan"}
                </button>
                <Link
                  href={`/Countdown/edit?id=${cd.id}`}
                  className="font-mono text-[8px] tracking-[0.15em] uppercase px-3 py-2 border border-black/15 text-black/40 hover:border-black/40 hover:text-black transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(cd.id)}
                  disabled={deletingId === cd.id}
                  className="font-mono text-[8px] tracking-[0.15em] uppercase px-3 py-2 border border-red-300 text-red-400 hover:border-red-500 hover:text-red-600 transition-colors disabled:opacity-30"
                >
                  {deletingId === cd.id ? "..." : "Hapus"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}