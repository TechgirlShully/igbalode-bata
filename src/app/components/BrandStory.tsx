"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function BrandStory() {
  return (
    <section
      id="about"
      className="overflow-hidden bg-[#171717] px-6 py-24 text-[#f5f3ee] lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">

         {/* Visual */}
<motion.div
  initial={{ opacity: 0, x: -30 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.8 }}
  className="relative aspect-[4/5] overflow-hidden bg-[#24231f]"
>
  <Image
    src="/brand/story.jpg"
    alt="IGBALODE BATA"
    fill
    className="object-cover"
  />

  {/* Image overlay */}
  <div className="absolute inset-0 bg-black/10" />

  {/* Bottom details */}
  <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between">
    <p className="max-w-[150px] text-[9px] uppercase leading-5 tracking-[0.2em] text-[#f5f3ee]/70">
      Crafted with intention
    </p>

    <span className="font-display text-5xl text-[#f5f3ee]/20">
      01
    </span>
  </div>
</motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#aaa69d]">
              Our story
            </p>

            <h2 className="max-w-xl font-display text-5xl leading-[1.05] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
              More than
              <br />
              <span className="italic text-[#aaa69d]">what you wear.</span>
            </h2>

            <div className="mt-9 max-w-lg space-y-5 text-sm leading-7 text-[#aaa69d]">
              <p>
                At IGBALODE BATA, we believe the right pair of shoes does more
                than complete an outfit. It becomes part of how you carry
                yourself.
              </p>

              <p>
                Our collections bring together timeless style, everyday
                comfort and thoughtful design — creating footwear made for
                people who want to look good and feel confident wherever they
                go.
              </p>

              <p>
                From the office to celebrations, from everyday moments to
                occasions worth remembering, every pair is chosen with one
                thing in mind: helping you walk with confidence.
              </p>
            </div>

            <a
              href="#shop"
              className="group mt-10 inline-flex items-center gap-4 border-b border-[#f5f3ee]/30 pb-3 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 hover:border-[#f5f3ee]"
            >
              Discover our collection

              <ArrowUpRight
                size={15}
                strokeWidth={1.4}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </motion.div>
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24 border-t border-[#f5f3ee]/10 pt-8 lg:mt-32"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#77736b]">
              IGBALODE BATA
            </p>

            <p className="font-display text-2xl italic text-[#f5f3ee]/80 sm:text-3xl">
              Walk with confidence.
            </p>

            <p className="text-[9px] uppercase tracking-[0.3em] text-[#77736b]">
             16 Adalemo Street,Oke Koto Agege Lagos, Nigeria
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}