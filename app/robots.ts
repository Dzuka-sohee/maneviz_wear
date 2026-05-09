import type { MetadataRoute } from "next";

const BASE_URL = "https://maneviz-wear.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Blokir halaman admin dari crawler
        disallow: ["/Login", "/Countdown/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}