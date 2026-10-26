"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, Suspense } from "react";
import { Heart, Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { products as productDetails } from "./products";

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
  { name: "Mules", value: "mules" },
  { name: "Half Shoes", value: "half-shoes" },
  { name: "Loafers", value: "loafers" },
  { name: "Slippers", value: "slippers" },
  { name: "Party Shoes", value: "party" },
  { name: "Office Shoes", value: "office" },
  { name: "Kids", value: "kids" },
  { name: "Bags", value: "bags" },
];

function ShopPageContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");
 const [searchInput, setSearchInput] = useState(
  searchParams.get("search") || ""
);

const searchQuery = searchInput.trim().toLowerCase(); 

  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();
  const [filterOpen, setFilterOpen] = useState(false);

 

const filteredProducts = products.filter((product) => {
  const category = product.category.toLowerCase();
  const type = product.type.toLowerCase();

  const matchesCategory = (() => {
    switch (categoryFilter?.toLowerCase()) {
      case null:
      case undefined:
      case "all":
        return true;
      case "men":
        return category === "men";
      case "women":
        return category === "women";
      case "kids":
        return category === "kids";
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
        return category === "kids" && type.includes("girl");
      case "boys":
        return category === "kids" && type.includes("boy");
      default:
        return category === categoryFilter?.toLowerCase();
    }
  })();

  const matchesSearch =
    !searchQuery ||
    product.name.toLowerCase().includes(searchQuery) ||
    category.includes(searchQuery) ||
    type.includes(searchQuery);

  return matchesCategory && matchesSearch;
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

            <div className="flex flex-col gap-3 self-start sm:flex-row md:self-auto">
  {/* Search */}
  <form
    action="/shop"
    className="flex border border-[#171717]/15 bg-[#f5f3ee]"
  >
    
<input
  type="search"
  name="search"
  value={searchInput}
  onChange={(event) => setSearchInput(event.target.value)}
  placeholder="Search footwear..."
  aria-label="Search footwear"
  className="w-[210px] bg-transparent px-4 py-3 text-[10px] uppercase tracking-[0.12em] text-[#171717] outline-none placeholder:text-[#99958d] sm:w-[230px]"
/>

    <button
      type="submit"
      aria-label="Search products"
      className="flex items-center justify-center px-4 transition hover:bg-[#171717] hover:text-[#f5f3ee]"
    >
      <Search size={15} strokeWidth={1.5} />
    </button>
  </form>

  {/* Filter */}
  <button
  type="button"
  onClick={() => setFilterOpen((current) => !current)}
  aria-expanded={filterOpen}
  className="inline-flex items-center gap-2 border border-[#171717]/15 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#171717] transition hover:border-[#171717]"
>
  <SlidersHorizontal size={15} strokeWidth={1.5} />
  Filters
</button>

{filterOpen && (
  <div className="mt-4 border border-[#171717]/10 bg-[#eeece5] p-5 lg:hidden">
    <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em]">
      Shop by category
    </p>

    <div className="flex flex-wrap gap-2 sm:gap-3">
      {shopFilters.map((filter) => {
        const isActive =
          (categoryFilter?.toLowerCase() || "all") === filter.value;

        return (
          <Link
            key={filter.value}
            href={
              filter.value === "all"
                ? "/shop"
                : `/shop?category=${filter.value}`
            }
            onClick={() => setFilterOpen(false)}
            className={`border px-4 py-3 text-[10px] uppercase tracking-[0.12em] transition ${
              isActive
                ? "border-[#171717] bg-[#171717] !text-[#f5f3ee]"
                : "border-[#171717]/15 text-[#171717]"
            }`}
          >
            {filter.name}
          </Link>
        );
      })}
    </div>
  </div>
)}

</div>
          </div>
        </div>
      </section>

      {filterOpen && (
  <section className="border-b border-[#171717]/10 bg-[#eeece5] px-6 py-6 lg:px-12">
    <div className="mx-auto max-w-[1440px]">
      
<div className="flex flex-wrap gap-3">
  {shopFilters.map((filter) => {
    const isActive =
      (categoryFilter?.toLowerCase() || "all") === filter.value;

    return (
      <Link
        key={filter.value}
        href={
          filter.value === "all"
            ? "/shop"
            : `/shop?category=${filter.value}`
        }
        className={`border px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] transition ${
          isActive
            ? "border-[#171717] bg-[#171717] !text-[#f5f3ee]"
            : "border-[#171717]/15 text-[#171717] hover:border-[#171717]"
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

          
{filteredProducts.length > 0 ? (
  filteredProducts.map((product, index) => (
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
      {/* KEEP YOUR EXISTING PRODUCT CARD CONTENT HERE */}

      
{/* Image */}
<div className="relative aspect-[4/5] overflow-hidden bg-[#e8e3d9]">
  <Image
    src={product.image}
    alt={`${product.name} - ${product.type} by IGBALODE BATA`}
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

  {/* Product Actions */}
  <div className="absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-500 sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
    <Link
      href={`/shop/${product.id}`}
      className="flex-1 bg-[#f5f3ee] px-4 py-4 text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-[#171717] transition hover:bg-white"
    >
      View Product
    </Link>

    <button
      type="button"
      onClick={() => {
        const details =
          productDetails[String(product.id) as keyof typeof productDetails];

        if (!details) return;

        addToCart({
          id: String(product.id),
          name: details.name,
          price: details.price,
          image: details.colors[0].image,
          color: details.colors[0].name,
          size: details.sizes[0],
          quantity: 1,
        });
      }}
      className="flex-1 bg-[#171717] px-4 py-4 text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-[#f5f3ee] transition hover:bg-[#33312d]"
    >
      Add to Bag
    </button>
  </div>
</div>

{/* Product Details */}
<div className="mt-5">
  <div className="flex items-start justify-between gap-4">
    <div>
      <p className="text-[9px] uppercase tracking-[0.2em] text-[#77736b]">
        {product.category} · {product.type}
      </p>

      <h2 className="mt-2 break-words font-display text-base text-[#1c1b18] sm:text-xl">
        {product.name}
      </h2>
    </div>

    <p className="shrink-0 text-[10px] font-medium text-[#1c1b18] sm:text-xs">
      {product.price}
    </p>
  </div>
</div>

    </motion.article>
  ))
) : (
  <div className="col-span-full flex min-h-[350px] flex-col items-center justify-center text-center">
    <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#77736b]">
      Collection
    </p>

    <h2 className="mt-4 font-display text-4xl text-[#1c1b18]">
      No products found
    </h2>

    <p className="mt-4 max-w-[380px] text-sm leading-6 text-[#68645d]">
      We couldn&apos;t find a match. Try another search or explore our full collection.
    </p>

    <Link
      href="/shop"
      className="mt-7 bg-[#171717] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] !text-[#f5f3ee] transition hover:bg-[#33312d]"
    >
      View All Footwear
    </Link>
  </div>
)}
          </div>   
      </section>
    </main>
  );
  }
export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f5f3ee] px-6 py-24 text-[#1c1b18]">
          <div className="mx-auto max-w-[1440px]">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#77736b]">
              Loading Shop
            </p>

            <h1 className="mt-4 font-display text-5xl">
              Shop
            </h1>
          </div>
        </main>
      }
    >
      <ShopPageContent />
    </Suspense>
  );
}