import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IGBALODE BATA | Walk With Confidence",
  description:
    "Discover timeless footwear and bags for men and women by IGBALODE BATA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}