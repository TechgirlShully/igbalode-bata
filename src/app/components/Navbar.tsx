"use client";

import Image from "next/image";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const links = [
  { name: "Shop", href: "/shop" },
  { name: "Men", href: "#men" },
  { name: "Women", href: "#women" },
  { name: "Kids", href: "#kids" },
  { name: "About", href: "#about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#171717]/10 bg-[#f5f3ee]">
        <nav className="mx-auto flex h-24 max-w-[1440px] items-center justify-between px-6 lg:px-12">
          
         {/* Logo */}
<a href="/" className="group flex items-center gap-3">
  <Image
    src="/logo.png"
    alt="IGBALODE BATA"
    width={66}
    height={66}
    className="h-10 w-10 object-contain"
    priority
  />

  <div>
    <div className="font-display text-[21px] font-semibold tracking-[0.12em]">
      IGBALODE
    </div>

    <div className="mt-[-2px] text-[9px] font-medium tracking-[0.5em]">
      BATA
    </div>
  </div>
</a> 

          {/* Desktop Links */}
          <div className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-[13px] font-medium text-[#292824] transition-opacity duration-300 hover:opacity-50"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden items-center gap-5 lg:flex">
            <button
              aria-label="Search"
              className="transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Search size={19} strokeWidth={1.5} />
            </button>

            <button
              aria-label="Wishlist"
              className="transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Heart size={19} strokeWidth={1.5} />
            </button>

            <button
              aria-label="Shopping bag"
              className="relative transition-transform duration-300 hover:-translate-y-0.5"
            >
              <ShoppingBag size={19} strokeWidth={1.5} />

              <span className="absolute -right-2 -top-2 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#1c1b18] text-[8px] text-white">
                0
              </span>
            </button>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#1c1b18] text-[#f5f3ee]"
          >
            <div className="flex h-24 items-center justify-between px-6">
              <div className="flex items-center gap-3">
  <Image
    src="/logo.png"
    alt="IGBALODE BATA"
    width={66}
    height={66}
    className="h-10 w-10 object-contain"
  />

  <div>
    <div className="font-display text-[21px] tracking-[0.12em]">
      IGBALODE
    </div>

    <div className="mt-[-2px] text-[9px] tracking-[0.5em]">
      BATA
    </div>
  </div>
</div>

              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={25} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex flex-col px-6 pt-16">
              {links.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.07 }}
                  className="border-b border-white/10 py-5 font-display text-4xl"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}