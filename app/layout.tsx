import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://maneviz-wear.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  // ── Basic ──────────────────────────────────────────────────────────────
  title: {
    default: "Maneviz Wear — Coming Soon",
    template: "%s | Maneviz Wear",
  },
  description:
    "Maneviz Wear — brand fashion yang sedang dalam persiapan. Pre-order eksklusif segera hadir. Ikuti perkembangan kami.",
  keywords: [
    "Maneviz Wear",
    "fashion brand",
    "clothing",
    "streetwear",
    "coming soon",
    "pre-order",
  ],
  authors: [{ name: "Maneviz Wear", url: BASE_URL }],
  creator: "Maneviz Wear",
  publisher: "Maneviz Wear",

  // ── Canonical ──────────────────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
  },

  // ── Open Graph ─────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: BASE_URL,
    siteName: "Maneviz Wear",
    title: "Maneviz Wear — Coming Soon",
    description:
      "Maneviz Wear — brand fashion yang sedang dalam persiapan. Pre-order eksklusif segera hadir.",
    images: [
      {
        url: "/og-image.jpg", // taruh file 1200x630px di /public/og-image.jpg
        width: 1200,
        height: 630,
        alt: "Maneviz Wear",
      },
    ],
  },

  // ── Twitter / X Card ───────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Maneviz Wear — Coming Soon",
    description:
      "Maneviz Wear — brand fashion yang sedang dalam persiapan. Pre-order eksklusif segera hadir.",
    images: ["/og-image.jpg"],
    // creator: "@manevizwear", // uncomment jika punya akun Twitter
  },

  // ── Robots ─────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Icons ──────────────────────────────────────────────────────────────
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // ── Verification (isi setelah daftar Google Search Console) ───────────
  // verification: {
  //   google: "GANTI_DENGAN_KODE_VERIFIKASI_GOOGLE",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}