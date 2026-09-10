"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Women",
    description: "Footwear made for every side of you.",
    image: "/categories/women.jpg",
    href: "#women",
  },
  {
    name: "Men",
    description: "Executive men's shoe with a modern edge.",
    image: "/categories/men.jpg",
    href: "#men",
  },
  {
    name: "Kids",
    description: "Little steps, beautifully made.",
    image: "/categories/kids.jpg",
    href: "#kids",
  },
  {
    name: "Bags",
    description: "The finishing touch to every look.",
    image: "/categories/bags.jpg",
    href: "#bags",
  },
];

export default function Categories() {
  return (
    <section id="shop" className="bg-[#f5f3ee] px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1440px]">

        {/* Heading */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-[#77736b]">
              Explore
            </p>

            <h2 className="font-display text-5xl tracking-[-0.03em] text-[#1c1b18] sm:text-6xl">
              Shop by category
            </h2>
          </div>

          <p className="max-w-[320px] text-sm leading-6 text-[#68645d]">
            Discover footwear and accessories thoughtfully selected for
            everyday elegance.
          </p>
        </div>

        {/* Categories */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <motion.a
              key={category.name}
              href={category.href}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="group"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#e8e3d9]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/10" />

                {/* Arrow */}
                <div className="absolute bottom-5 right-5 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-[#f5f3ee] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight
                    size={17}
                    strokeWidth={1.5}
                    className="text-[#1c1b18]"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl text-[#1c1b18]">
                    {category.name}
                  </h3>

                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#77736b]">
                    0{index + 1}
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-[#77736b]">
                  {category.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}