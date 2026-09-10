import Link from "next/link";
import ProductDetails from "./ProductDetails";
import { products } from "../products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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

  return <ProductDetails product={product} />;
}