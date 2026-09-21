"use client";

import Image from "next/image";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const links = [
  { name: "Shop", href: "/shop" },
  { name: "Men", href: "#men" },
  { name: "Women", href: "#women" },
  { name: "Kids", href: "#kids" },
  { name: "About", href: "#about" },
];

const categories = {
  Men: [
    { name: "All Men's Shoes", href: "/shop?category=men" },
    { name: "Mules", href: "/shop?category=mules" },
    { name: "Half Shoes", href: "/shop?category=half-shoes" },
    { name: "Loafers", href: "/shop?category=loafers" },
  ],

  Women: [
    { name: "All Women's Shoes", href: "/shop?category=women" },
    { name: "Party Shoes", href: "/shop?category=party" },
    { name: "Office Shoes", href: "/shop?category=office" },
    { name: "Slippers", href: "/shop?category=slippers" },
    { name: "Bags", href: "/shop?category=bags" },
  ],

  Kids: [
    { name: "All Kids' Shoes", href: "/shop?category=kids" },
    { name: "Girls", href: "/shop?category=girls" },
    { name: "Boys", href: "/shop?category=boys" },
  ],
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
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
            <a
  href="/shop?search="
  aria-label="Search"
  className="transition-transform duration-300 hover:-translate-y-0.5"
>
  <Search size={19} strokeWidth={1.5} />
</a>

            <a
  href="/wishlist"
  aria-label="Wishlist"
  className="relative transition-transform duration-300 hover:-translate-y-0.5"
>
  <Heart
    size={19}
    strokeWidth={1.5}
    fill={wishlistCount > 0 ? "currentColor" : "none"}
  />

  {wishlistCount > 0 && (
    <span className="absolute -right-2 -top-2 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#1c1b18] px-1 text-[8px] text-white">
      {wishlistCount}
    </span>
  )}
</a>

            <a
  href="/bag"
  aria-label="Shopping bag"
  className="relative transition-transform duration-300 hover:-translate-y-0.5"
>
  <ShoppingBag size={19} strokeWidth={1.5} />

  {cartCount > 0 && (
    <span className="absolute -right-2 -top-2 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#1c1b18] px-1 text-[8px] text-white">
      {cartCount}
    </span>
  )}
</a>
          </div>

         {/* Mobile Actions */}
<div className="flex items-center gap-4 lg:hidden">
  {/* Wishlist */}
  <a
    href="/wishlist"
    aria-label="Wishlist"
    className="relative"
  >
    <Heart
      size={21}
      strokeWidth={1.5}
      fill={wishlistCount > 0 ? "currentColor" : "none"}
    />

    {wishlistCount > 0 && (
      <span className="absolute -right-2 -top-2 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#1c1b18] px-1 text-[8px] text-white">
        {wishlistCount}
      </span>
    )}
  </a>

  {/* Shopping Bag */}
  <a
    href="/bag"
    aria-label="Shopping bag"
    className="relative"
  >
    <ShoppingBag size={21} strokeWidth={1.5} />

    {cartCount > 0 && (
      <span className="absolute -right-2 -top-2 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#1c1b18] px-1 text-[8px] text-white">
        {cartCount}
      </span>
    )}
  </a>

  {/* Menu */}
  <button
    onClick={() => setMenuOpen(true)}
    aria-label="Open menu"
  >
    <Menu size={24} strokeWidth={1.5} />
  </button>
</div>
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
  {links.map((link, index) => {
    const hasCategories =
      link.name === "Men" ||
      link.name === "Women" ||
      link.name === "Kids";

    const isOpen = openCategory === link.name;

    return (
      <div key={link.name} className="border-b border-white/10">
        <div className="flex items-center justify-between">
          <a
            href={link.href}
            onClick={() => {
              if (!hasCategories) {
                setMenuOpen(false);
              }
            }}
            className="flex-1 py-5 font-display text-4xl"
          >
            {link.name}
          </a>

          {hasCategories && (
            <button
              onClick={() =>
                setOpenCategory(isOpen ? null : link.name)
              }
              aria-label={`Open ${link.name} categories`}
              className="px-4 py-5 text-2xl"
            >
              {isOpen ? "−" : "+"}
            </button>
          )}
        </div>

        <AnimatePresence>
          {hasCategories && isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden pb-4"
            >
              {categories[
                link.name as keyof typeof categories
              ].map((category) => (
                <a
                  key={category.name}
                  href={category.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 pl-2 text-sm tracking-wide text-[#f5f3ee]/60 transition hover:text-[#f5f3ee]"
                >
                  {category.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  })}
</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}