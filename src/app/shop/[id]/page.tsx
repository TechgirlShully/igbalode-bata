
import type { Metadata } from "next";
import Link from "next/link";
import ProductDetails from "./ProductDetails";
import { products } from "../products";

const siteUrl = "https://igbalode-bata.vercel.app";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = products[id as keyof typeof products];

  if (!product) {
    return {
      title: "Product Not Found",
      description: "Explore the footwear collection at IGBALODE BATA.",
    };
  }

  const title = `${product.name} ${product.category} | IGBALODE BATA`;

  const description =
    `${product.description} Available in sizes ${product.sizes.join(", ")}. ` +
    `Price: ${product.price}. Shop online at IGBALODE BATA, Nigeria.`;

  const image = product.colors[0]?.image;

  return {
    title,
    description,
    alternates: {
      canonical: `/shop/${id}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/shop/${id}`,
      siteName: "IGBALODE BATA",
      locale: "en_NG",
      type: "website",
      ...(image
        ? {
            images: [
              {
                url: image,
                alt: `${product.name} - ${product.category}`,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function ProductPage({
  params,
}: PageProps) {
  const { id } = await params;

  const product = products[id as keyof typeof products];

  if (!product) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#f5f3ee] px-6 text-center">
        <h1 className="font-display text-4xl text-[#1c1b18]">
          Product not found
        </h1>

        <Link
          href="/shop"
          className="mt-6 bg-[#171717] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] !text-[#f5f3ee]"
        >
          Back to Shop
        </Link>
      </main>
    );
  }

  return <ProductDetails product={product} productId={id} />;
}
