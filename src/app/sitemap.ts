
import type { MetadataRoute } from "next";
import { products } from "./shop/products";

const siteUrl = "https://igbalode-bata.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: "", priority: 1 },
    { path: "/shop", priority: 0.9 },
    { path: "/delivery", priority: 0.4 },
    { path: "/returns-exchanges", priority: 0.4 },
    { path: "/privacy-policy", priority: 0.3 },
    { path: "/terms-and-conditions", priority: 0.3 },
    { path: "/contact", priority: 0.5 },
  ];

  const pages: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${siteUrl}${page.path}`,
    changeFrequency: page.path === "" ? "weekly" : "monthly",
    priority: page.priority,
  }));

  const productPages: MetadataRoute.Sitemap = Object.keys(products).map(
    (id) => ({
      url: `${siteUrl}/shop/${id}`,
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  return [...pages, ...productPages];
}

