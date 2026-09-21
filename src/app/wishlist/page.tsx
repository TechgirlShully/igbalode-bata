"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, Trash2 } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <main className="min-h-screen bg-[#f5f3ee] px-6 pb-20 pt-32 lg:px-12">
      <div className="mx-auto max-w-[1440px]">

        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#77736b] transition hover:text-[#171717]"
        >
          <ArrowLeft size={15} strokeWidth={1.5} />
          Continue Shopping
        </Link>

        <div className="mt-10">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#77736b]">
            IGBALODE BATA
          </p>

          <h1 className="mt-4 font-display text-5xl tracking-[-0.03em] text-[#1c1b18] sm:text-6xl">
            Wishlist
          </h1>
        </div>

        {wishlist.length === 0 ? (
          <div className="flex min-h-[55vh] flex-col items-center justify-center text-center">
            <Heart
              size={38}
              strokeWidth={1}
              className="text-[#77736b]"
            />

            <h2 className="mt-6 font-display text-4xl text-[#1c1b18]">
              Nothing saved yet
            </h2>

            <p className="mt-4 max-w-[400px] text-sm leading-6 text-[#68645d]">
              Save pieces you love and come back to them whenever you're ready.
            </p>

            <Link
              href="/shop"
              className="mt-8 bg-[#171717] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] !text-[#f5f3ee] transition hover:bg-[#33312d]"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <section className="mt-12">
            <div className="mb-8 flex items-center justify-between border-b border-[#171717]/10 pb-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#77736b]">
                {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {wishlist.map((item) => (
                <article key={item.id} className="group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#e8e3d9]">
                    <Link href={`/shop/${item.id}`}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </Link>

                    <button
                      onClick={() => toggleWishlist(item)}
                      aria-label={`Remove ${item.name} from wishlist`}
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#171717] text-[#f5f3ee]"
                    >
                      <Heart
                        size={16}
                        strokeWidth={1.5}
                        fill="currentColor"
                      />
                    </button>

                    <Link
                      href={`/shop/${item.id}`}
                      className="absolute bottom-4 left-4 right-4 bg-[#171717] px-5 py-4 text-center text-[10px] font-semibold uppercase tracking-[0.18em] !text-[#f5f3ee]"
                    >
                      View Product
                    </Link>
                  </div>

                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-[#77736b]">
                        {item.category}
                      </p>

                      <h2 className="mt-2 font-display text-xl text-[#1c1b18]">
                        {item.name}
                      </h2>
                    </div>

                    <p className="text-xs font-medium text-[#1c1b18]">
                      {item.price}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleWishlist(item)}
                    className="mt-4 flex items-center gap-2 text-[9px] uppercase tracking-[0.15em] text-[#77736b] transition hover:text-[#171717]"
                  >
                    <Trash2 size={13} strokeWidth={1.5} />
                    Remove
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}