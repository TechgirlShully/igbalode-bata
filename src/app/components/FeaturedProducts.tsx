"use client";

import Image from "next/image";
import { ArrowUpRight, Heart } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  {
    name: "Classic Leather Slippers",
    category: "Women",
    price: "₦35,000",
    image: "/products/adunni.jpg",
  },
  {
    name: "Executive Half Shoe",
    category: "Men",
    price: "₦45,000",
    image: "/products/abefe.jpg",
  },
  {
    name: "Signature Classic Shoe",
    category: "Men",
    price: "₦70,000",
    image: "/products/ojo.jpg",
  },
  {
    name: "Classic Crossover Slide",
    category: "Men",
    price: "₦45,000",
    image: "/products/adebayo.jpg",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-white px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1440px]">

        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#73706a]">
              The collection
            </p>

            <h2 className="font-display text-5xl tracking-[-0.03em] text-[#171717] sm:text-6xl">
              Featured <span className="italic">pieces.</span>
            </h2>
          </div>

          <a
            href="#shop"
            className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#171717]"
          >
            View all
            <ArrowUpRight
              size={15}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <motion.article
              key={product.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              className="group"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#f1efe9]">

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-8 transition-transform duration-700 group-hover:scale-[1.04]"
                />

                {/* Wishlist */}
                <button
                  aria-label={`Add ${product.name} to wishlist`}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-transform duration-300 hover:scale-105"
                >
                  <Heart
                    size={17}
                    strokeWidth={1.4}
                  />
                </button>

                {/* Quick view */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-[#171717] px-5 py-4 text-center transition-transform duration-500 group-hover:translate-y-0">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f5f3ee]">
                    View product
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="pt-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#73706a]">
                  {product.category}
                </p>

                <div className="mt-2 flex items-start justify-between gap-4">
                  <h3 className="text-sm font-medium text-[#171717]">
                    {product.name}
                  </h3>

                  <p className="shrink-0 text-sm font-medium text-[#171717]">
                    {product.price}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}