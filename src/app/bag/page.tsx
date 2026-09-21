"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function BagPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart.reduce((total, item) => {
    const price = Number(item.price.replace(/[₦,]/g, ""));
    return total + price * item.quantity;
  }, 0);

  const formattedSubtotal = `₦${subtotal.toLocaleString("en-NG")}`;

  if (cart.length === 0) {
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

          <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#77736b]">
              Your Bag
            </p>

            <h1 className="mt-4 font-display text-5xl text-[#1c1b18] sm:text-6xl">
              Your bag is empty
            </h1>

            <p className="mt-5 max-w-[420px] text-sm leading-6 text-[#68645d]">
              Discover our collection and find something beautiful to take
              home.
            </p>

            <Link
              href="/shop"
              className="mt-8 bg-[#171717] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] !text-[#f5f3ee] transition hover:bg-[#33312d]"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </main>
    );
  }

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
            Your Bag
          </h1>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-20">
          {/* Cart Items */}
          <div>
            <div className="border-t border-[#171717]/10">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.color}-${item.size}`}
                  className="border-b border-[#171717]/10 py-6"
                >
                  <div className="flex gap-5">
                    <Link
                      href={`/shop/${item.id}`}
                      className="relative h-32 w-28 shrink-0 overflow-hidden bg-[#e8e3d9] sm:h-40 sm:w-32"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[9px] uppercase tracking-[0.2em] text-[#77736b]">
                              {item.color}
                            </p>

                            <h2 className="mt-1 font-display text-xl text-[#1c1b18]">
                              {item.name}
                            </h2>

                            <p className="mt-2 text-xs text-[#68645d]">
                              Size: {item.size}
                            </p>
                          </div>

                          <p className="text-xs font-medium text-[#1c1b18]">
                            {item.price}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex items-center justify-between">
                        <div className="flex h-10 items-center border border-[#171717]/15">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.color,
                                item.size,
                                item.quantity - 1
                              )
                            }
                            className="flex h-full w-9 items-center justify-center"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} strokeWidth={1.5} />
                          </button>

                          <span className="w-8 text-center text-xs">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.color,
                                item.size,
                                item.quantity + 1
                              )
                            }
                            className="flex h-full w-9 items-center justify-center"
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} strokeWidth={1.5} />
                          </button>
                        </div>

                        <button
                          onClick={() =>
                            removeFromCart(
                              item.id,
                              item.color,
                              item.size
                            )
                          }
                          className="flex items-center gap-2 text-[9px] uppercase tracking-[0.15em] text-[#77736b] transition hover:text-[#171717]"
                        >
                          <Trash2 size={14} strokeWidth={1.5} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <aside className="h-fit border border-[#171717]/10 p-6 lg:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c1b18]">
              Order Summary
            </p>

            <div className="mt-8 flex items-center justify-between border-b border-[#171717]/10 pb-5">
              <span className="text-xs text-[#77736b]">Subtotal</span>

              <span className="text-sm font-medium text-[#1c1b18]">
                {formattedSubtotal}
              </span>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs text-[#77736b]">Delivery</span>

              <span className="text-[10px] uppercase tracking-[0.1em] text-[#77736b]">
                Calculated at checkout
              </span>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[#171717]/10 pt-6">
              <span className="text-xs font-semibold uppercase tracking-[0.15em]">
                Total
              </span>

              <span className="text-lg font-medium">{formattedSubtotal}</span>
            </div>

            <Link
  href="/checkout"
  className="block w-full bg-[#171717] px-6 py-5 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f5f3ee] transition hover:bg-[#33312d]"
>
  Checkout
</Link>

            
          </aside>
        </div>
      </div>
    </main>
  );
}