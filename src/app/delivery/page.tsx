
import Link from "next/link";
import { ArrowLeft, MapPin, Package, Truck } from "lucide-react";

const deliveryNotes = [
  {
    title: "Delivery Fees",
    description:
      "Delivery charges depend on your location. Select your delivery location at checkout to see the applicable fee before placing your order.",
  },
  {
    title: "Delivery Address",
    description:
      "Please provide your correct address, phone number, and location details at checkout to help us coordinate your delivery.",
  },
  {
    title: "Order Confirmation",
    description:
      "After submitting your order through WhatsApp, our team will confirm receipt, payment details, and delivery arrangements with you.",
  },
];

export default function DeliveryPage() {
  return (
    <main className="min-h-screen bg-[#f5f3ee] px-6 pb-20 pt-32 text-[#1c1b18] lg:px-12">
      <div className="mx-auto max-w-[1000px]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#77736b] transition hover:text-[#171717]"
        >
          <ArrowLeft size={15} strokeWidth={1.5} />
          Back to Home
        </Link>

        <header className="mt-12 border-b border-[#171717]/10 pb-12 sm:mt-16 sm:pb-16">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#77736b]">
            IGBALODE BATA · CUSTOMER INFORMATION
          </p>

          <h1 className="mt-5 max-w-[750px] font-display text-5xl leading-tight tracking-[-0.04em] sm:text-7xl">
            Delivery Information
          </h1>

          <p className="mt-6 max-w-[620px] text-sm leading-7 text-[#68645d]">
            Everything you need to know about receiving your IGBALODE BATA
            order, from delivery charges to collection in person.
          </p>
        </header>

        <section className="grid gap-5 border-b border-[#171717]/10 py-10 sm:grid-cols-3 sm:py-12">
          <div className="bg-[#eeece5] p-6">
            <Truck size={22} strokeWidth={1.4} />

            <h2 className="mt-5 font-display text-2xl">Home Delivery</h2>

            <p className="mt-3 text-xs leading-6 text-[#68645d]">
              Available locations and delivery fees are displayed during
              checkout.
            </p>
          </div>

          <div className="bg-[#eeece5] p-6">
            <MapPin size={22} strokeWidth={1.4} />

            <h2 className="mt-5 font-display text-2xl">Pickup</h2>

            <p className="mt-3 text-xs leading-6 text-[#68645d]">
              Collect your order from our pickup address at no delivery cost.
            </p>
          </div>

          <div className="bg-[#eeece5] p-6">
            <Package size={22} strokeWidth={1.4} />

            <h2 className="mt-5 font-display text-2xl">Order Updates</h2>

            <p className="mt-3 text-xs leading-6 text-[#68645d]">
              We will communicate with you through WhatsApp to confirm your
              order and delivery arrangements.
            </p>
          </div>
        </section>

        <section className="space-y-8 border-b border-[#171717]/10 py-10 sm:py-12">
          {deliveryNotes.map((item, index) => (
            <article
              key={item.title}
              className="grid gap-3 sm:grid-cols-[70px_1fr]"
            >
              <span className="font-display text-2xl text-[#a09b91]">
                0{index + 1}
              </span>

              <div>
                <h2 className="font-display text-2xl">{item.title}</h2>

                <p className="mt-3 max-w-[650px] text-sm leading-7 text-[#68645d]">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </section>

        <section className="border-b border-[#171717]/10 py-10 sm:py-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#77736b]">
            Free Collection
          </p>

          <h2 className="mt-4 font-display text-3xl sm:text-4xl">
            Prefer to pick up your order?
          </h2>

          <div className="mt-6 space-y-3 text-sm leading-7 text-[#68645d]">
            <p>16 Adalemo Street, Oke Koto, Agege, Lagos.</p>
            <p>Monday – Friday · 10:00 am – 6:00 pm</p>
            <p>
              Phone / WhatsApp:{" "}
              <a
                href="https://wa.me/2347082065518"
                className="font-medium text-[#171717] underline underline-offset-4"
              >
                0708 206 5518
              </a>
            </p>
          </div>

          <p className="mt-5 max-w-[650px] text-xs leading-6 text-[#77736b]">
            Please contact us to coordinate your collection before visiting.
          </p>
        </section>

        <section className="py-10 sm:py-12">
          <h2 className="font-display text-3xl">Need assistance?</h2>

          <p className="mt-4 max-w-[550px] text-sm leading-7 text-[#68645d]">
            If you have questions about your delivery location, charges, or
            order status, contact our team on WhatsApp.
          </p>

          <a
            href="https://wa.me/2347082065518"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex bg-[#171717] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f5f3ee] transition hover:bg-[#33312d]"
          >
            Contact Us on WhatsApp
          </a>
        </section>

        <footer className="border-t border-[#171717]/10 pt-6">
          <Link
            href="/shop"
            className="text-[10px] font-semibold uppercase tracking-[0.18em] underline underline-offset-4"
          >
            Continue Shopping
          </Link>
        </footer>
      </div>
    </main>
  );
}
