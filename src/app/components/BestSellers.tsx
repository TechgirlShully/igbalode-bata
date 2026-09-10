"use client";

import Image from "next/image";
import { ArrowUpRight, Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  {
    name: "The Ademola",
    category: "Men's Mule",
    price: "₦55,000",
    images: [
      "/products/men/ademola.jpg",
      "/products/men/ademola2.jpg",
      "/products/men/ademola3.jpg",
      "/products/men/ademola4.jpg",
      "/products/men/ademola5.jpg",
    ],
  },
  {
    name: "The Abefe",
    category: "Men's Half Shoe",
    price: "₦45,000",
    images: [
      "/products/men/abefe.jpg",
      
    ],
  },
  {
    name: "The Adunni",
    category: "Women's Party Shoe",
    price: "₦35,000",
    images: [
      "/products/women/adunni.jpg",
      
    ],
  },
];

export default function BestSellers() {
  return (
    <section className="bg-[#f5f3ee] px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1440px]">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#73706a]">
              Customer favourites
            </p>

            <h2 className="font-display text-5xl leading-none tracking-[-0.03em] text-[#171717] sm:text-6xl lg:text-7xl">
              Best
              <br />
              <span className="italic">sellers.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-[#73706a]">
            The pieces our customers keep coming back for. Timeless designs
            made to become part of your wardrobe.
          </p>
        </motion.div>

        {/* Products */}
        <div className="grid gap-8 lg:grid-cols-3">
          {products.map((product, index) => (
            <motion.article
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
              }}
              className="group"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#e9e5dc]">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-contain p-10 transition-transform duration-700 group-hover:scale-105"
                />

                {/* Number */}
                <span className="absolute left-5 top-5 font-display text-3xl text-[#171717]/20">
                  0{index + 1}
                </span>

                {/* Wishlist */}
                <button
                  aria-label={`Add ${product.name} to wishlist`}
                  className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 transition-transform duration-300 hover:scale-105"
                >
                  <Heart size={17} strokeWidth={1.4} />
                </button>

                {/* Add to bag */}
                <button className="absolute bottom-5 left-5 right-5 flex translate-y-3 items-center justify-center gap-3 bg-[#171717] py-4 text-[10px] font-semibold uppercase tracking-[0.2em] !text-[#f5f3ee] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <ShoppingBag size={15} strokeWidth={1.4} />
                  <span className="!text-[#f5f3ee]">Add to bag</span>
                </button>
              </div>

              {/* Product details */}
              <div className="flex items-start justify-between gap-5 pt-5">
                <div>
                  <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#73706a]">
                    {product.category}
                  </p>

                  <h3 className="mt-2 font-display text-2xl text-[#171717]">
                    {product.name}
                  </h3>
                </div>

                <p className="pt-1 text-sm font-medium text-[#171717]">
                  {product.price}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom link */}
        <div className="mt-14 flex justify-center">
          <a
            href="#shop"
            className="group inline-flex items-center gap-4 border-b border-[#171717]/30 pb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#171717] transition-colors hover:border-[#171717]"
          >
            Explore all footwear
            <ArrowUpRight
              size={15}
              strokeWidth={1.4}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}