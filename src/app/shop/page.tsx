"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Heart, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useWishlist } from "../context/WishlistContext";


const products = [
  {
    id: 1,
    name: "The Ademola",
    category: "Men",
    type: "Men's Mule",
    price: "₦55,000",
    image: "/products/men/ademola.jpg",
  },
  {
    id: 2,
    name: "The Adunni",
    category: "Women",
    type: "Classic Leather Slippers",
    price: "₦35,000",
    image: "/products/women/adunni.jpg",
  },
  {
    id: 3,
    name: "The Abefe",
    category: "Men",
    type: "Executive Half Shoes",
    price: "₦45,000",
    image: "/products/men/abefe.jpg",
  },

  
  {
    id: 4,
    name: "The Ajibola",
    category: "Men",
    type: "Executive Men Loafers",
    price: "₦70,000",
    image: "/products/men/ajibola.jpg",
  },

  {
    id: 5,
    name: "The Ajiboye",
    category: "Men",
    type: "Classic Men Mules",
    price: "₦30,000",
    image: "/products/men/ajiboye.jpg",
  },

  {
    id: 6,
    name: "The Aduke",
    category: "Women",
    type: "Classic Leather Slippers",
    price: "₦35,000",
    image: "/products/women/aduke.jpg",
  },
];

const shopFilters = [
  { name: "All", value: "all" },
  { name: "Men", value: "men" },
  { name: "Women", value: "women" },
  { name: "Kids", value: "kids" },
  { name: "Bags", value: "bags" },
];

export default function ShopPage() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const { toggleWishlist, isWishlisted } = useWishlist();
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredProducts = products.filter((product) => {
  if (!categoryFilter || categoryFilter === "all") {
    return true;
  }

  const category = product.category.toLowerCase();
  const type = product.type.toLowerCase();

  switch (categoryFilter) {
    case "men":
      return product.category === "Men";

    case "women":
      return product.category === "Women";

    case "kids":
      return product.category === "Kids";

    case "mules":
      return type.includes("mule");

    case "half-shoes":
      return type.includes("half shoe");

    case "loafers":
      return type.includes("loafer");

    case "party":
      return type.includes("party");

    case "office":
      return type.includes("office");

    case "slippers":
      return type.includes("slipper");

    case "bags":
      return category.includes("bag");

    case "girls":
      return category === "Kids" && type.toLowerCase().includes("girl");

    case "boys":
      return category === "Kids" && type.toLowerCase().includes("boy");

    default:
      return true;
  }
});

  return (
    <main className="min-h-screen bg-[#f5f3ee] pt-28">
      {/* Header */}
      <section className="border-b border-[#171717]/10 px-6 pb-12 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-[#77736b]">
            IGBALODE BATA
          </p>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <h1 className="font-display text-5xl tracking-[-0.03em] text-[#1c1b18] sm:text-6xl lg:text-7xl">
                Shop
              </h1>

              <p className="mt-5 max-w-[520px] text-sm leading-6 text-[#68645d]">
                Discover timeless footwear and accessories designed to
                complete every look.
              </p>
            </div>

            <button
  onClick={() => setFilterOpen((current) => !current)}
  className={`flex items-center gap-3 self-start border px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] transition md:self-auto ${
    filterOpen || categoryFilter
      ? "border-[#171717] bg-[#171717] text-[#f5f3ee]"
      : "border-[#171717]/15 hover:bg-[#171717] hover:text-[#f5f3ee]"
  }`}
>
  <SlidersHorizontal size={15} strokeWidth={1.5} />
  Filter
</button>
          </div>
        </div>
      </section>

      {filterOpen && (
  <section className="border-b border-[#171717]/10 bg-[#eeece5] px-6 py-6 lg:px-12">
    <div className="mx-auto max-w-[1440px]">
      <div className="flex flex-wrap items-center gap-2">
        {shopFilters.map((filter) => {
          const active =
            filter.value === "all"
              ? !categoryFilter || categoryFilter === "all"
              : categoryFilter === filter.value;

          return (
            <Link
              key={filter.value}
              href={
                filter.value === "all"
                  ? "/shop"
                  : `/shop?category=${filter.value}`
              }
              onClick={() => setFilterOpen(false)}
              className={`border px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.18em] transition ${
                active
                  ? "border-[#171717] bg-[#171717] !text-[#f5f3ee]"
                  : "border-[#171717]/15 text-[#77736b] hover:border-[#171717] hover:text-[#171717]"
              }`}
            >
              {filter.name}
            </Link>
          );
        })}
      </div>
    </div>
  </section>
)}

      {/* Products */}
      <section className="px-6 py-12 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#77736b]">
              {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "Product" : "Products"}
            </p>

            <p className="text-[10px] uppercase tracking-[0.18em] text-[#77736b]">
  {categoryFilter
    ? categoryFilter.replace("-", " ")
    : "All Footwear"}
</p>
          </div>

          <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                }}
                className="group"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#e8e3d9]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Wishlist */}
                  <button
  aria-label={
    isWishlisted(String(product.id))
      ? `Remove ${product.name} from wishlist`
      : `Add ${product.name} to wishlist`
  }
  onClick={() =>
    toggleWishlist({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    })
  }
  className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full transition ${
    isWishlisted(String(product.id))
      ? "bg-[#171717] text-[#f5f3ee]"
      : "bg-[#f5f3ee]/95 text-[#171717] hover:bg-[#171717] hover:text-[#f5f3ee]"
  }`}
>
  <Heart
    size={16}
    strokeWidth={1.5}
    fill={isWishlisted(String(product.id)) ? "currentColor" : "none"}
  />
</button>

                  {/* View Product */}
                  <Link
                    href={`/shop/${product.id}`}
                    className="absolute bottom-4 left-4 right-4 bg-[#171717] px-5 py-4 text-center text-[10px] font-semibold uppercase tracking-[0.18em] !text-[#f5f3ee] transition-all duration-500 sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
                  >
                    View Product
                  </Link>
                </div>

                {/* Details */}
                <div className="mt-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-[#77736b]">
                        {product.category} · {product.type}
                      </p>

                      <h2 className="mt-2 font-display text-xl text-[#1c1b18]">
                        {product.name}
                      </h2>
                    </div>

                    <p className="text-xs font-medium text-[#1c1b18]">
                      {product.price}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}