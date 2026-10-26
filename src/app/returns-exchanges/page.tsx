
import Link from "next/link";
import { ArrowLeft, CheckCircle2, RefreshCw } from "lucide-react";

const conditions = [
  {
    title: "Incorrect Size",
    description:
      "If your footwear does not fit correctly, contact us to discuss an exchange or possible size adjustment. Requests are assessed individually and depend on the condition of the item.",
  },
  {
    title: "Item Condition",
    description:
      "Footwear must be unworn outdoors, clean, and in its original condition and packaging when presented for an exchange or adjustment assessment.",
  },
  {
    title: "Contact Us First",
    description:
      "Please contact IGBALODE BATA before bringing or sending an item for an exchange or adjustment. We will explain the next steps and confirm whether the request can be accommodated.",
  },
];

export default function ReturnsExchangesPage() {
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
            Returns & Exchanges
          </h1>

          <p className="mt-6 max-w-[620px] text-sm leading-7 text-[#68645d]">
            We want you to feel confident about your purchase. Please read our
            policy on sizing, exchanges, and product adjustments before placing
            your order.
          </p>
        </header>

        <section className="mt-10 border border-[#171717]/10 bg-[#eeece5] p-6 sm:p-9">
          <div className="flex items-start gap-4">
            <RefreshCw
              size={23}
              strokeWidth={1.4}
              className="mt-1 shrink-0"
            />

            <div>
              <h2 className="font-display text-2xl sm:text-3xl">
                Need a different size?
              </h2>

              
<p className="mt-4 text-sm leading-7 text-[#68645d]">
  If your footwear is the wrong size, contact us within 2 days
  of delivery to request an exchange or possible size adjustment.
  The item must remain unworn and in its original condition.
  Please contact us before bringing or sending it back so we
  can explain the next steps.
</p>

            </div>
          </div>
        </section>

        <section className="space-y-8 border-b border-[#171717]/10 py-10 sm:py-12">
          {conditions.map((item, index) => (
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
          <h2 className="font-display text-3xl sm:text-4xl">
            When returns are not accepted
          </h2>

          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2
                size={18}
                strokeWidth={1.5}
                className="mt-1 shrink-0 text-[#77736b]"
              />
              <p className="text-sm leading-7 text-[#68645d]">
                We do not accept returns simply because a customer has changed
                their mind after purchasing.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2
                size={18}
                strokeWidth={1.5}
                className="mt-1 shrink-0 text-[#77736b]"
              />
              <p className="text-sm leading-7 text-[#68645d]">
                Products are checked and sent out in good condition. A return
                is not offered for damage claims where the item was supplied
                in good condition.
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-[700px] text-xs leading-6 text-[#77736b]">
            This policy does not remove any rights customers may have under
            applicable consumer-protection laws.
          </p>
        </section>

        <section className="py-10 sm:py-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#77736b]">
            Need help?
          </p>

          <h2 className="mt-4 font-display text-3xl sm:text-4xl">
            Let&apos;s discuss your size.
          </h2>

          <p className="mt-4 max-w-[550px] text-sm leading-7 text-[#68645d]">
            Contact us on WhatsApp with your order details and explain whether
            you need an exchange or a size adjustment. We will discuss the
            available options with you.
          </p>

          <a
            href="https://wa.me/2347082065518"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex bg-[#171717] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f5f3ee] transition hover:bg-[#33312d]"
          >
            Request Size Assistance
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
