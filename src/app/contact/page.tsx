
import Link from "next/link";
import {
  ArrowLeft,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

const whatsappNumber = "2347082065518";

export default function ContactPage() {
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
            IGBALODE BATA · CUSTOMER CARE
          </p>

          <h1 className="mt-5 max-w-[750px] font-display text-5xl leading-tight tracking-[-0.04em] sm:text-7xl">
            We&apos;re Here to Help.
          </h1>

          <p className="mt-6 max-w-[620px] text-sm leading-7 text-[#68645d]">
            Have a question about a product, sizing, an order, or delivery?
            Get in touch with our team and we&apos;ll help you with the next
            steps.
          </p>
        </header>

        <section className="grid gap-px border border-[#171717]/10 bg-[#171717]/10 sm:grid-cols-2">
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="bg-[#f5f3ee] p-7 transition hover:bg-[#eeece5] sm:p-9"
          >
            <MessageCircle size={24} strokeWidth={1.4} />
            <h2 className="mt-6 font-display text-2xl sm:text-3xl">
              WhatsApp
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#68645d]">
              Message us about products, orders, sizing, and delivery.
            </p>
            <span className="mt-6 inline-block text-xs font-semibold underline underline-offset-4">
              Chat with us
            </span>
          </a>

          <a
            href="tel:+2347082065518"
            className="bg-[#f5f3ee] p-7 transition hover:bg-[#eeece5] sm:p-9"
          >
            <Phone size={24} strokeWidth={1.4} />
            <h2 className="mt-6 font-display text-2xl sm:text-3xl">
              Call Us
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#68645d]">
              Speak with us directly during our business hours.
            </p>
            <span className="mt-6 inline-block text-xs font-semibold underline underline-offset-4">
              0708 206 5518
            </span>
          </a>
        </section>

        <section className="grid gap-10 border-b border-[#171717]/10 py-10 sm:grid-cols-2 sm:py-12">
          <div>
            <MapPin size={22} strokeWidth={1.4} />
            <h2 className="mt-5 font-display text-2xl">Pickup Address</h2>
            <p className="mt-3 text-sm leading-7 text-[#68645d]">
              16 Adalemo Street,
              <br />
              Oke Koto, Agege, Lagos.
            </p>
            <p className="mt-4 text-xs leading-6 text-[#77736b]">
              Please contact us to coordinate your collection before visiting.
            </p>
          </div>

          <div>
            <Clock3 size={22} strokeWidth={1.4} />
            <h2 className="mt-5 font-display text-2xl">Business Hours</h2>
            <p className="mt-3 text-sm leading-7 text-[#68645d]">
              Monday – Friday
              <br />
              10:00 am – 6:00 pm
            </p>
            <p className="mt-4 text-xs leading-6 text-[#77736b]">
              For enquiries outside these hours, leave us a WhatsApp message.
            </p>
          </div>
        </section>

        <section className="border-b border-[#171717]/10 py-10 sm:py-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#77736b]">
            Before You Contact Us
          </p>

          <h2 className="mt-4 font-display text-3xl sm:text-4xl">
            Let&apos;s resolve it together.
          </h2>

          <p className="mt-4 max-w-[650px] text-sm leading-7 text-[#68645d]">
            For an existing order, please include your order details and
            explain how we can help. For a sizing exchange or adjustment,
            contact us within 2 days of delivery and review our Returns &
            Exchanges policy.
          </p>

          <Link
            href="/returns-exchanges"
            className="mt-6 inline-block text-[10px] font-semibold uppercase tracking-[0.16em] underline underline-offset-4"
          >
            Read Returns & Exchanges
          </Link>
        </section>

        <footer className="pt-6">
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <Link
              href="/delivery"
              className="text-[10px] font-semibold uppercase tracking-[0.12em] underline underline-offset-4"
            >
              Delivery Information
            </Link>
            <Link
              href="/privacy-policy"
              className="text-[10px] font-semibold uppercase tracking-[0.12em] underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="text-[10px] font-semibold uppercase tracking-[0.12em] underline underline-offset-4"
            >
              Terms & Conditions
            </Link>
          </div>

          <Link
            href="/shop"
            className="mt-6 inline-block text-[10px] font-semibold uppercase tracking-[0.18em] underline underline-offset-4"
          >
            Continue Shopping
          </Link>
        </footer>
      </div>
    </main>
  );
}
