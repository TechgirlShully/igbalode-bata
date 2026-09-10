"use client";

import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

const contacts = [
  {
    icon: ArrowUpRight,
    label: "Instagram",
    value: "@igbalode_bata",
    href: "#",
  },
  {
    icon: ArrowUpRight,
    label: "TikTok",
    value: "@igbalode_bata",
    href: "#",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@igbalodebata.com",
    href: "mailto:hello@igbalodebata.com",
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+234 708 206 5518",
    href: "tel:+2347082065518",
  },
];

export default function ConnectSection() {
  return (
    <section className="bg-[#171717] px-6 py-24 text-[#f5f3ee] lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1440px]">

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#aaa69d]">
            Stay connected
          </p>

          <h2 className="font-display text-5xl leading-[1.05] tracking-[-0.03em] sm:text-6xl lg:text-8xl">
            Let's stay
            <br />
            <span className="italic text-[#aaa69d]">in touch.</span>
          </h2>

          <p className="mt-8 max-w-xl text-sm leading-7 text-[#aaa69d]">
            Discover new arrivals, styling inspiration and everything
            happening at IGBALODE BATA. Follow us, reach out or simply come
            say hello.
          </p>
        </motion.div>

        {/* Contact grid */}
        <div className="mt-16 grid border-y border-[#f5f3ee]/10 sm:grid-cols-2 lg:grid-cols-4">
          {contacts.map((contact, index) => {
            const Icon = contact.icon;

            return (
              <motion.a
                key={contact.label}
                href={contact.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                className="group border-b border-[#f5f3ee]/10 p-7 transition-colors duration-500 hover:bg-[#22211e] sm:p-9 lg:border-b-0 lg:border-r last:border-r-0"
              >
                <div className="flex items-center justify-between">
                  <Icon
                    size={20}
                    strokeWidth={1.3}
                    className="text-[#aaa69d]"
                  />

                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.3}
                    className="translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </div>

                <div className="mt-12">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#77736b]">
                    {contact.label}
                  </p>

                  <p className="mt-3 text-sm text-[#f5f3ee]">
                    {contact.value}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-10 flex flex-col justify-between gap-6 border-b border-[#f5f3ee]/10 pb-10 md:flex-row md:items-center"
        >
          <div className="flex items-start gap-4">
            <MapPin
              size={19}
              strokeWidth={1.3}
              className="mt-1 shrink-0 text-[#aaa69d]"
            />

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#77736b]">
                Visit us
              </p>

              <p className="mt-2 text-sm text-[#f5f3ee]">
                16 Adalemo Street, Oke Koto Agege Lagos, Nigeria
              </p>
            </div>
          </div>

          <p className="font-display text-2xl italic text-[#aaa69d]">
            Walk with confidence.
          </p>
        </motion.div>
      </div>
    </section>
  );
}