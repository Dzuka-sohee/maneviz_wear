import type { Metadata } from "next";
import HomeClient from "./HomeClient";

const BASE_URL = "https://maneviz-wear.vercel.app";

// ── Per-page metadata (overrides layout default) ──────────────────────────
export const metadata: Metadata = {
  title: "Maneviz Wear",
  description:
    "GOD VALLEY hadir segera. Countdown menuju peluncuran produk fashion eksklusif kami. Pre-order sekarang.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Maneviz Wear",
    description:
      "GOD VALLEY hadir segera. Countdown menuju peluncuran produk fashion eksklusif kami. Pre-order sekarang.",
    url: BASE_URL,
    images: [
      {
        url: "/maneviz-new.png", // taruh file 1200x630px di /public/og-image.jpg
        width: 1200,
        height: 630,
        alt: "GOD VALLEY — Coming Soon",
      },
    ],
  },
};

// ── JSON-LD Structured Data ───────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GOD VALLEY",
  url: BASE_URL,
  logo: `${BASE_URL}/images/maneviz-new-white.png`,
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@manevizwear.com",
    contactType: "customer service",
  },
  sameAs: [
    // "https://twitter.com/manevizwear",   // uncomment & isi jika ada
    // "https://instagram.com/manevizwear",
  ],
};

export default function HomePage() {
  return (
    <>
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Client component untuk countdown & interaksi */}
      <HomeClient />
    </>
  );
}