import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

const sections = [
  {
    title: "1. Information We Collect",
    paragraphs: [
      "When you place an order or contact us, you may provide information such as your name, phone number, email address, delivery address, selected products, sizes, and other details needed to process your order.",
      "Please do not send passwords, PINs, or other sensitive banking credentials to us.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    paragraphs: [
      "We use the information you provide to process and confirm orders, arrange delivery or collection, communicate with you about purchases, respond to enquiries, and provide customer support.",
      "We may also use relevant order information to resolve delivery issues or handle size exchanges and adjustments in line with our policies.",
    ],
  },
  {
    title: "3. WhatsApp and Order Information",
    paragraphs: [
      "Our checkout process may open WhatsApp to help you submit your order. When you choose to send a message, the information included in that message is shared with us through WhatsApp.",
      "WhatsApp is a third-party service governed by its own privacy policy and terms. Please review its policies before sharing personal information through the platform.",
    ],
  },
  {
    title: "4. Cart and Wishlist Storage",
    paragraphs: [
      "Our website uses your browser's local storage to remember items in your shopping bag and wishlist between visits. This information is stored in your browser on your device.",
      "You can clear your browser's site data to remove locally stored information. Doing so may also clear your saved bag and wishlist.",
    ],
  },
  {
    title: "5. Sharing Your Information",
    paragraphs: [
      "We do not sell your personal information. We may share relevant details with service providers when reasonably necessary to operate the website, communicate with you, or fulfil and deliver your order.",
      "Information may also be disclosed where required by law or where necessary to protect legitimate rights and address security or fraud concerns.",
    ],
  },
  {
    title: "6. Data Security and Retention",
    paragraphs: [
      "We take reasonable steps to protect the information you provide. However, no website or method of electronic transmission can be guaranteed to be completely secure.",
      "We retain personal information only for as long as reasonably necessary for order fulfilment, customer service, record-keeping, and applicable legal obligations.",
    ],
  },
  {
    title: "7. Your Privacy Choices",
    paragraphs: [
      "You may contact us to ask about the personal information you have provided, request a correction, or raise a concern about how your information is handled.",
      "Your rights and any applicable limitations depend on the laws that apply to your information. We will respond to privacy requests in accordance with applicable requirements.",
    ],
  },
  {
    title: "8. Third-Party Services",
    paragraphs: [
      "Our website may rely on third-party services for hosting and may link to external platforms such as WhatsApp or social media. Those services may process information under their own privacy policies.",
      "We encourage you to review the privacy practices of any third-party service you choose to use.",
    ],
  },
  {
    title: "9. Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy when our website, services, or legal obligations change. The latest version published on this page will apply from the date it is posted.",
    ],
  },
];

export default function PrivacyPolicyPage() {
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
            <ShieldCheck size={20} strokeWidth={1.4} />
            <p className="text-[10px] font-medium uppercase tracking-[0.3em]">
              IGBALODE BATA · YOUR PRIVACY
            </p>
          </div>

          <h1 className="mt-5 max-w-[750px] font-display text-5xl leading-tight tracking-[-0.04em] sm:text-7xl">
            Privacy Policy
          </h1>

          <p className="mt-6 max-w-[650px] text-sm leading-7 text-[#68645d]">
            Your trust matters to us. This policy explains what information
            IGBALODE BATA may collect, how we use it, and the choices available
            to you when you use our website.
          </p>

          <p className="mt-5 text-xs leading-6 text-[#77736b]">
            Please review this policy before placing an order.
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
                  {section.title.replace(/^\d+\.\s*/, "")}
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
            Privacy Enquiries
          </p>

          <h2 className="mt-4 font-display text-3xl sm:text-4xl">
            Have a question about your data?
          </h2>

          <p className="mt-4 max-w-[600px] text-sm leading-7 text-[#68645d]">
            Contact us if you have a privacy question or want to raise a
            concern about information you have shared with IGBALODE BATA.
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