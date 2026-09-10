"use client";

import Image from "next/image";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import type { Product } from "../products";

export default function ProductDetails({
  product,
}: {
  product: Product;
}) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const currentImage = product.colors[selectedColor].image;

  return (
    <main className="min-h-screen bg-[#f5f3ee] px-6 pb-20 pt-32 lg:px-12">
      <div className="mx-auto max-w-[1440px]">

        {/* Back */}
        <a
          href="/shop"
          className="mb-10 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#77736b] transition hover:text-[#171717]"
        >
          <ArrowLeft size={15} strokeWidth={1.5} />
          Back to shop
        </a>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">

          {/* Product Image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-[#e8e3d9]">
            <Image
              src={currentImage}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">

            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#77736b]">
              {product.category}
            </p>

            <h1 className="mt-4 font-display text-5xl tracking-[-0.03em] text-[#1c1b18] sm:text-6xl">
              {product.name}
            </h1>

            <p className="mt-5 text-lg font-medium text-[#1c1b18]">
              {product.price}
            </p>

            <p className="mt-6 max-w-[500px] text-sm leading-7 text-[#68645d]">
              {product.description}
            </p>

            <div className="my-8 border-t border-[#171717]/10" />

            {/* Colour */}
            <div>
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                  Colour
                </p>

                <p className="text-xs text-[#77736b]">
                  {product.colors[selectedColor].name}
                </p>
              </div>

              <div className="mt-4 flex gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(index)}
                    className={`relative h-16 w-16 overflow-hidden border ${
                      selectedColor === index
                        ? "border-[#171717]"
                        : "border-transparent"
                    }`}
                    aria-label={`Select ${color.name}`}
                  >
                    <Image
                      src={color.image}
                      alt={color.name}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                  Size
                </p>

                <button className="text-[10px] uppercase tracking-[0.15em] text-[#77736b] underline underline-offset-4">
                  Size Guide
                </button>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border py-3 text-xs transition ${
                      selectedSize === size
                        ? "border-[#171717] bg-[#171717] !text-[#f5f3ee]"
                        : "border-[#171717]/15 hover:border-[#171717]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-8">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em]">
                Quantity
              </p>

              <div className="flex h-12 w-32 items-center justify-between border border-[#171717]/15 px-3">
                <button
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} strokeWidth={1.5} />
                </button>

                <span className="text-sm">{quantity}</span>

                <button
                  onClick={() => setQuantity((current) => current + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={15} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-3">
              <button
                disabled={!selectedSize}
                className="flex flex-1 items-center justify-center gap-3 bg-[#171717] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] !text-[#f5f3ee] transition hover:bg-[#33312d] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ShoppingBag size={17} strokeWidth={1.5} />
                Add to Bag
              </button>

              <button
                aria-label="Add to wishlist"
                className="flex h-[52px] w-[52px] items-center justify-center border border-[#171717]/15 transition hover:border-[#171717]"
              >
                <Heart size={18} strokeWidth={1.5} />
              </button>
            </div>

            {!selectedSize && (
              <p className="mt-3 text-[10px] text-[#77736b]">
                Select a size before adding this item to your bag.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}