"use client";

import { ArrowUpRight, } from "lucide-react";

const shopLinks = [
  { name: "All Footwear", href: "#shop" },
  { name: "Men", href: "#men" },
  { name: "Women", href: "#women" },
  { name: "Kids", href: "#kids" },
  { name: "Bags", href: "#bags" },
];

const companyLinks = [
  { name: "Our Story", href: "#about" },
  { name: "Contact", href: "#contact" },
  { name: "FAQs", href: "#faq" },
];

export default function Footer() {
  return (
    <footer className="bg-[#11110f] px-6 pb-8 pt-20 text-[#f5f3ee] lg:px-12 lg:pt-28">
      <div className="mx-auto max-w-[1440px]">

        {/* Main footer */}
        <div className="grid gap-16 border-b border-[#f5f3ee]/10 pb-16 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">

          {/* Brand */}
          <div>
            <a href="#" className="inline-block">
              <div className="font-display text-3xl tracking-[0.08em]">
                IGBALODE
              </div>

              <div className="mt-[-3px] text-[9px] font-medium tracking-[0.5em]">
                BATA
              </div>
            </a>

            <p className="mt-7 max-w-sm text-sm leading-7 text-[#8f8b83]">
              Timeless footwear and accessories designed to help you walk
              through every occasion with confidence.
            </p>

            <a
              href="#"
              className="group mt-8 inline-flex items-center gap-3 border-b border-[#f5f3ee]/20 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors hover:border-[#f5f3ee]"
            >
              Follow us on Instagram
              <ArrowUpRight
                size={14}
                strokeWidth={1.4}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>

          {/* Shop */}
          <div>
            <p className="mb-6 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#77736b]">
              Shop
            </p>

            <nav className="flex flex-col gap-4">
              {shopLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="w-fit text-sm text-[#aaa69d] transition-colors hover:text-[#f5f3ee]"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <p className="mb-6 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#77736b]">
              Company
            </p>

            <nav className="flex flex-col gap-4">
              {companyLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="w-fit text-sm text-[#aaa69d] transition-colors hover:text-[#f5f3ee]"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-6 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#77736b]">
              Contact
            </p>

            <div className="space-y-4 text-sm text-[#aaa69d]">
              <a
                href="mailto:igbalodebata.info@gmail.com"
                className="block transition-colors hover:text-[#f5f3ee]"
              >
                igbalodebata.info@gmail.com
              </a>

              <a
                href="tel:+2347082065518"
                className="block transition-colors hover:text-[#f5f3ee]"
              >
                +234 708 206 5518
              </a>

              <p className="leading-6">
               16 Adalemo Street, Oke Koto Agege Lagos,
                <br />
                Nigeria
              </p>
            </div>
          </div>
        </div>

        {/* Large brand statement */}
        <div className="py-16 lg:py-20">
          <p className="font-display text-[clamp(55px,10vw,150px)] leading-[0.8] tracking-[-0.06em] text-[#f5f3ee]/[0.07]">
            IGBALODE BATA
          </p>
        </div>

        {/* Bottom */}
        <div className="flex flex-col justify-between gap-5 border-t border-[#f5f3ee]/10 pt-6 text-[9px] uppercase tracking-[0.2em] text-[#77736b] sm:flex-row">
          <p>© {new Date().getFullYear()} Igbalode Bata. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-[#f5f3ee]">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-[#f5f3ee]">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}