
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Premium Footwear for Men and Women",
  description:
    "Shop premium men's mules, loafers and half shoes, women's slippers, and timeless footwear from IGBALODE BATA. Explore our footwear collection in Lagos, Nigeria.",
  alternates: {
    canonical: "/shop",
  },
  openGraph: {
    title: "Shop Premium Footwear | IGBALODE BATA",
    description:
      "Explore men's mules, loafers and half shoes, alongside women's slippers from IGBALODE BATA in Nigeria.",
    url: "https://igbalode-bata.vercel.app/shop",
    siteName: "IGBALODE BATA",
    locale: "en_NG",
    type: "website",
  },
};
 
export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
