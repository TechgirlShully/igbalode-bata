"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f5f3ee]">
      
      {/* Decorative background circle */}
      <div className="absolute right-[-12%] top-[8%] h-[650px] w-[650px] rounded-full bg-[#e8e3d9] lg:h-[800px] lg:w-[800px]" />

      {/* Main container */}
      <div className="relative mx-auto grid min-h-screen max-w-[1440px] items-center px-6 pb-16 pt-32 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:pt-24">
        
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 max-w-xl"
        >
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.3em] text-[#77736b]">
            Igbalode Bata — 2026 Collection
          </p>

          <h1 className="font-display text-[58px] leading-[0.95] tracking-[-0.04em] text-[#1c1b18] sm:text-[75px] lg:text-[92px]">
            Step into
            <br />
            <span className="italic">something</span>
            <br />
            timeless.
          </h1>

          <p className="mt-8 max-w-[390px] text-[15px] leading-7 text-[#68645d]">
            Thoughtfully crafted footwear for men, women and little ones.
            Designed for workdays, weekends and every moment in between.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
           <a
  href="#shop"
  className="group inline-flex items-center gap-4 bg-[#171717] px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] !text-[#f5f3ee] transition-all duration-300 hover:bg-[#33312d]"
>
  <span className="!text-[#f5f3ee]">Shop Collection</span>

  <ArrowUpRight
    size={16}
    strokeWidth={1.5}
    className="!text-[#f5f3ee] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
  />
</a>

            <a
              href="#about"
              className="inline-flex items-center border border-[#1c1b18]/20 px-6 py-4 text-[11px] font-medium uppercase tracking-[0.18em] text-[#1c1b18] transition-all duration-300 hover:border-[#1c1b18]"
            >
              Our story
            </a>
          </div>
        </motion.div>

        {/* RIGHT PRODUCT AREA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative mt-14 flex min-h-[430px] items-center justify-center lg:mt-0 lg:min-h-[650px]"
        >
          {/* Product stage */}
          <div className="relative flex h-[400px] w-[90%] items-center justify-center sm:h-[500px] lg:h-[650px]">
            
            {/* Product shadow */}
            <div className="absolute bottom-[18%] h-10 w-[65%] rounded-[50%] bg-black/20 blur-2xl" />

            {/* Real hero product */}
<motion.div
  animate={{
    y: [0, -10, 0],
  }}
  transition={{
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="relative z-10 h-[400px] w-full sm:h-[500px] lg:h-[620px]"
>
  <Image
    src="/hero/hero-shoe.png"
    alt="IGBALODE BATA footwear"
    fill
    priority
    className="object-contain"
  />
</motion.div>
            

            {/* Floating label */}
            <div className="absolute right-[3%] top-[18%] z-20 hidden sm:block">
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#77736b]">
                Crafted for
              </p>

              <p className="mt-1 font-display text-lg text-[#1c1b18]">
                Every occasion
              </p>
            </div>

            {/* Number */}
            <div className="absolute bottom-[12%] left-[3%]">
              <p className="font-display text-6xl text-[#1c1b18]/10">
                01
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom strip */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-[#1c1b18]/10">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 lg:px-12">
          <p className="text-[9px] uppercase tracking-[0.25em] text-[#77736b]">
            Made to move with you
          </p>

          <p className="text-[9px] uppercase tracking-[0.25em] text-[#77736b]">
            16 Adalemo Street, Oke Koto Agege Lagos, Nigeria
          </p>
        </div>
      </div>
    </section>
  );
}