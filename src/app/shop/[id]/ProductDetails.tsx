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
import { useCart } from "../../context/CartContext";
import type { Product } from "../products";
import { useWishlist } from "../../context/WishlistContext";

export default function ProductDetails({
  product,
  productId,
}: {
  product: Product;
  productId: string;
}) {

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToBag, setAddedToBag] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const currentImage = product.colors[selectedColor].image;
  const [showSizeGuide, setShowSizeGuide] = useState(false);

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
              className="object-contain p-4 sm:p-6"
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

              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {product.colors.map((color, index) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(index)}
                    className={`relative h-16 w-16 shrink-0 overflow-hidden border ${
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

                <button
  type="button"
  onClick={() => setShowSizeGuide((current) => !current)}
  className="text-[10px] uppercase tracking-[0.15em] text-[#77736b] underline underline-offset-4"
>
  Size Guide
</button>

{showSizeGuide && (
  <div className="mt-5 border border-[#171717]/10 bg-[#eeece5] p-5">
    <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">
      Size Guide
    </p>

    <p className="mt-3 text-xs leading-6 text-[#77736b]">
      Choose your usual footwear size. If you are between sizes, we recommend
      selecting the larger size for a more comfortable fit.
    </p>
  </div>
)}
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
  type="button"
  onClick={() =>
    setQuantity((current) => Math.max(1, current - 1))
  }
  aria-label="Decrease quantity"
  className="flex h-10 w-10 items-center justify-center"
>
                  <Minus size={15} strokeWidth={1.5} />
                </button>

                <span className="text-sm">{quantity}</span>

                <button
  type="button"
  onClick={() => setQuantity((current) => current + 1)}
  aria-label="Increase quantity"
  className="flex h-10 w-10 items-center justify-center"
>
                  <Plus size={15} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-3">
              <button
  disabled={!selectedSize}
  onClick={() => {
    if (!selectedSize) return;

    addToCart({
      id: productId,
      name: product.name,
      price: product.price,
      image: currentImage,
      color: product.colors[selectedColor].name,
      size: selectedSize,
      quantity,
    });

    setAddedToBag(true);

    setTimeout(() => {
      setAddedToBag(false);
    }, 2000);
  }}
  className="flex flex-1 items-center justify-center gap-3 bg-[#171717] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] !text-[#f5f3ee] transition hover:bg-[#33312d] disabled:cursor-not-allowed disabled:opacity-40"
>
  <ShoppingBag size={17} strokeWidth={1.5} />

  {addedToBag ? "Added to Bag ✓" : "Add to Bag"}
</button>

            <button
  aria-label={
    isWishlisted(productId)
      ? "Remove from wishlist"
      : "Add to wishlist"
  }
  onClick={() =>
    toggleWishlist({
      id: productId,
      name: product.name,
      price: product.price,
      image: currentImage,
      category: product.category,
    })
  }
  className={`flex h-[52px] w-[52px] items-center justify-center border transition ${
    isWishlisted(productId)
      ? "border-[#171717] bg-[#171717] text-[#f5f3ee]"
      : "border-[#171717]/15 hover:border-[#171717]"
  }`}
>
  <Heart
    size={18}
    strokeWidth={1.5}
    fill={isWishlisted(productId) ? "currentColor" : "none"}
  />
</button> 
            </div>

{addedToBag && (
  <div className="mt-4 flex items-center justify-between border border-[#171717]/10 bg-[#eeece5] px-4 py-4">
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1c1b18]">
        Added to your bag
      </p>

      <p className="mt-1 text-[10px] text-[#77736b]">
        {product.name} · Size {selectedSize}
      </p>
    </div>

    <a
      href="/bag"
      className="bg-[#171717] px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.15em] !text-[#f5f3ee] transition hover:bg-[#33312d]"
    >
      View Bag
    </a>
  </div>
)}

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