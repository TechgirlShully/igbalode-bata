
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

const sections = [
  {
    title: "Orders and Order Confirmation",
    paragraphs: [
      "When you place an order through our website, you are submitting a request to purchase the selected products.",
      "Orders submitted through WhatsApp are subject to confirmation by IGBALODE BATA. We may contact you to verify your order details, selected size, delivery information, and payment arrangements.",
      "An order is not considered confirmed until our team has acknowledged it and confirmed the next steps."
    ],
  },
  {
    title: "Product Information",
    paragraphs: [
      "We make reasonable efforts to display accurate product descriptions, images, colours, sizes, and prices.",
      "Actual colours may vary slightly depending on your device screen and display settings. Please check the available sizes and product details carefully before ordering.",
      "Product availability may change without notice. If an item becomes unavailable after you enquire or place an order, we will contact you to discuss the available options."
    ],
  },
  {
    title: "Prices and Payment",
    paragraphs: [
      "Prices are displayed in Nigerian Naira (₦), unless stated otherwise. Delivery fees may apply depending on your selected delivery location and will be shown during checkout where applicable.",
      "Our current checkout process uses bank transfer. Please follow the payment instructions provided at checkout and confirm payment arrangements with our team where necessary.",
      "Do not send your bank PIN, card PIN, password, or one-time password (OTP) to anyone claiming to represent IGBALODE BATA."
    ],
  },
  {
    title: "Delivery and Collection",
    paragraphs: [
      "Customers are responsible for providing accurate contact details and delivery addresses.",
      "Delivery times may vary depending on location, courier availability, and other circumstances beyond our control. We will communicate relevant delivery arrangements with you.",
      "Customers choosing collection should contact us beforehand to coordinate their visit. Please refer to our Delivery Information page for collection details."
    ],
  },
  {
    title: "Returns, Exchanges and Size Adjustments",
    paragraphs: [
      "We do not accept returns simply because a customer changes their mind after purchasing.",
      "If your footwear is the wrong size, contact us within 2 days of delivery to request an exchange or possible size adjustment. The item must remain unworn and in its original condition. Contact us before returning or bringing the item in.",
      "Please read our Returns & Exchanges policy for the full conditions. Nothing in these terms excludes consumer rights that cannot lawfully be excluded under applicable law."
    ],
  },
  {
    title: "Customer Responsibilities",
    paragraphs: [
      "You agree to provide accurate order and contact information and to review your selected products, sizes, delivery details, and total cost before submitting an order.",
      "You must not misuse the website, attempt to interfere with its operation, or use it for fraudulent or unlawful activities."
    ],
  },
  {
    title: "Website Content and Intellectual Property",
    paragraphs: [
      "Unless otherwise stated, the website's branding, text, graphics, product presentation, and other original content belong to IGBALODE BATA or are used with permission.",
      "You may not reproduce or commercially use our content without prior permission, except where permitted by applicable law."
    ],
  },
  {
    title: "Limitation of Liability",
    paragraphs: [
      "We will make reasonable efforts to maintain a reliable website and provide accurate information. However, we cannot guarantee uninterrupted access or that the website will always be free of errors.",
      "Nothing in these terms limits liability or excludes any rights where doing so would be unlawful under applicable law."
    ],
  },
  {
    title: "Changes to These Terms",
    paragraphs: [
      "We may update these Terms & Conditions as our products, services, or business processes change. The latest version published on this page will apply from the date it is posted, subject to applicable law."
    ],
  },
];

export default function TermsAndConditionsPage() {
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
          <div className="flex items-center gap-3 text-[#77736b]">
            <FileText size={20} strokeWidth={1.4} />
            <p className="text-[10px] font-medium uppercase tracking-[0.3em]">
              IGBALODE BATA · CUSTOMER INFORMATION
            </p>
          </div>

          <h1 className="mt-5 max-w-[750px] font-display text-5xl leading-tight tracking-[-0.04em] sm:text-7xl">
            Terms & Conditions
          </h1>

          <p className="mt-6 max-w-[650px] text-sm leading-7 text-[#68645d]">
            Please read these terms before placing an order with IGBALODE BATA.
            They explain how orders, payments, delivery, and use of our website
            are handled.
          </p>
        </header>

        <section className="space-y-9 border-b border-[#171717]/10 py-10 sm:py-12">
          {sections.map((section, index) => (
            <article
              key={section.title}
              className="grid gap-3 sm:grid-cols-[70px_1fr]"
            >
              <span className="font-display text-2xl text-[#a09b91]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <h2 className="font-display text-2xl sm:text-3xl">
                  {section.title}
                </h2>

                <div className="mt-3 max-w-[700px] space-y-3">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm leading-7 text-[#68645d]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="py-10 sm:py-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#77736b]">
            Questions?
          </p>

          <h2 className="mt-4 font-display text-3xl sm:text-4xl">
            We are here to help.
          </h2>

          <p className="mt-4 max-w-[600px] text-sm leading-7 text-[#68645d]">
            If you have questions about these terms, your order, or our
            policies, contact our team on WhatsApp.
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
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <Link
              href="/delivery"
              className="text-[10px] font-semibold uppercase tracking-[0.12em] underline underline-offset-4"
            >
              Delivery Information
            </Link>
            <Link
              href="/returns-exchanges"
              className="text-[10px] font-semibold uppercase tracking-[0.12em] underline underline-offset-4"
            >
              Returns & Exchanges
            </Link>
            <Link
              href="/privacy-policy"
              className="text-[10px] font-semibold uppercase tracking-[0.12em] underline underline-offset-4"
            >
              Privacy Policy
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
