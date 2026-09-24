"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const deliveryZones = [
  {
    price: 2500,
    locations: [
      "Ikeja",
    ],
  },
  {
    price: 3000,
    locations: [
      "Ogba",
    ],
  },
  {
    price: 3500,
    locations: [
      "Amuwo Odofin",
      "Ago Palace",
      "Egbe",
      "Ojokoro",
      "Costain",
      "Aguda Surulere",
      "Ebutta Meta",
      "Ipaja",
      "Aboru",
      "Ijaiye",
      "Oworonshoki",
      "Ijesha",
      "Mile 2",
      "Yaba",
      "Mile 12",
      "Ilupeju",
      "Maryland",
      "Olowoira",
      "Magodo Phase 1 & 2",
      "Omole Phase 1 & 2",
      "Ketu",
      "Agege",
      "Anthony",
      "Surulere",
      "Shomolu",
      "Obanikoro",
      "Onipanu",
      "Palmgroove",
      "Oshodi",
      "Shasha",
      "Bariga",
      "Isolo",
      "Ogudu",
      "Ojota",
      "Mushin",
      "Ikosi Ketu",
      "Alapere",
      "Ebutta Meta",
      "Ijaiye",
      "Iyanoworo",
    ],
  },
  {
    price: 5000,
    locations: [
      "Ishaga",
      "Obawole",
      "Alagbado",
      "Egbe",
      "Ijegun",
      "Lagos Island",
      "Unilag",
      "Akoka",
      "Ebutta Ero",
      "Apapa",
      "Ipaja",
      "Idimu",
      "Egbeda",
      "Abule Egba",
      "Command",
      "Ejigbo",
      "Gbagada",
      "Isheri Olofin",
      "Lekki Phase 1",
      "Ejigbo",
      "Ikotun",
      "Fagba",
      "Obawole",
      "Meiran",
      "Satellite Town",
      "Abule Ado",
      "Orile Iganmu",
    ],
  },
  {
    price: 5500,
    locations: [
      "Iyana-Oba",
      "Lekki Phase 2",
      "Ojodu Abiodun",
      "Ilaje Ajah",
      "Iyana-School",
      "LBS",
      "Olokonla",
      "Ajah",
      "Orchid",
      "Thomas Estate",
      "Ado Road",
      "VGC",
      "Ikate",
      "Agungi",
      "Lekki County",
      "Banana Island",
      "Victoria Island",
      "Ikoyi",
      "Oral Estate",
      "Osapa London",
      "Ebute Ero",
    ],
  },
  {
    price: 6000,
    locations: [
      "Tradefair",
      "Igbo Elerin",
      "Magbon",
      "Alaba",
      "Iyana School",
      "Igbo Efon",
      "Langbasa",
      "Ibafo",
    ],
  },
  {
    price: 8000,
    locations: [
      "Awoyaya",
      "Abijo",
      "Ibeju Lekki",
      "Badagry",
      "Eputu",
      "Eleko",
      "Aradagun",
    ],
  },
  {
    price: 5000,
    locations: [
      "Ikorodu",
      "Ogombo",
      "Ojo",
      "Iyana Ishashi",
      "Ayobo",
      "LASU",
      "OPIC",
    ],
  },
  {
    price: 7000,
    locations: [
      "Lekki-Epe Expressway",
      "Sangotedo",
      "Agbara",
      "Aradagun",
      "Arepo",
      "Apapa",
      "Ajegunle",
      "Okokomaiko",
    ],
  },
  {
    price: 3500,
    locations: [
      "Ojodu Berger",
      "Kola",
    ],
  },
  {
    price: 10000,
    locations: [
      "Lakowe",
    ],
  },
  {
    price: 6000,
    locations: [
      "Ajah Eti-Osa",
    ],
  },
  
];

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();

  const [orderSent, setOrderSent] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [form, setForm] = useState({
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  deliveryLocation: "",
  paymentReference: "",
});

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price.replace(/[₦,]/g, "")) * item.quantity,
    0
  );

 const selectedDeliveryIndex = form.deliveryLocation.startsWith("zone-")
  ? Number(form.deliveryLocation.replace("zone-", ""))
  : -1;

const selectedDeliveryZone =
  selectedDeliveryIndex >= 0
    ? deliveryZones[selectedDeliveryIndex]
    : undefined;

const deliveryFee =
  form.deliveryLocation === "pickup"
    ? 0
    : selectedDeliveryZone?.price || 0;

const total = subtotal + deliveryFee; 

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault();

 const newOrderNumber = `IGB-${Date.now().toString().slice(-6)}`;

setOrderNumber(newOrderNumber); 

  const orderItems = cart
    .map(
      (item) =>
        `• ${item.name} — ${item.color} — Size ${item.size} — Qty: ${item.quantity}`
    )
    .join("\n");

  const message = `
Hello IGBALODE BATA 👋

Order Number: ${newOrderNumber}

I placed an order, kindly confirm.

CUSTOMER DETAILS
Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email}

DELIVERY DETAILS
Address: ${form.address}
City: ${form.city}
State: ${form.state}
Delivery Option: ${
  form.deliveryLocation === "pickup"
    ? "Pickup"
    : selectedDeliveryZone
      ? `Delivery — ₦${selectedDeliveryZone.price.toLocaleString()}`
      : "Not selected"
}

PAYMENT
Method: Bank Transfer
Payment Reference: ${form.paymentReference}

ORDER
${orderItems}

Subtotal: ₦${subtotal.toLocaleString()}
Total: ₦${total.toLocaleString()}

Please confirm my order. Thank you.
  `.trim();

  const whatsappNumber = "2347082065518";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  window.open(whatsappUrl, "_blank");
clearCart();
setOrderSent(true);
};

  if (orderSent) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f3ee] px-6 py-24 text-center text-[#1c1b18]">
      <div className="max-w-[560px]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#171717]/15">
          <span className="text-2xl">✓</span>
        </div>

        <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-[#77736b]">
          Order Received
        </p>

        <p className="mt-4 text-sm font-medium text-[#1c1b18]">
  Order #{orderNumber}
</p>

        <h1 className="mt-4 font-display text-5xl">
          Thank you for shopping with us.
        </h1>

        <p className="mx-auto mt-5 max-w-[440px] text-sm leading-6 text-[#68645d]">
          Your order details have been sent to IGBALODE BATA on WhatsApp.
          We&apos;ll confirm your payment and delivery details with you.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/shop"
            className="bg-[#171717] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f5f3ee]"
          >
            Continue Shopping
          </Link>

          <Link
            href="/"
            className="border border-[#171717]/15 px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#171717] transition hover:border-[#171717]"
          >
            Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#f5f3ee] px-6 py-24 text-[#1c1b18]">
        <div className="mx-auto max-w-[700px] text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#77736b]">
            Checkout
          </p>

          <h1 className="mt-4 font-display text-5xl">
            Your bag is empty
          </h1>

          <p className="mx-auto mt-5 max-w-[420px] text-sm leading-6 text-[#68645d]">
            Add something beautiful to your bag before checking out.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-block bg-[#171717] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] !text-[#f5f3ee]"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f3ee] px-6 py-16 text-[#1c1b18] lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <Link
          href="/bag"
          className="text-[10px] uppercase tracking-[0.2em] text-[#77736b] hover:text-[#171717]"
        >
          ← Back to Bag
        </Link>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1.4fr_0.8fr]">
          <section>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#77736b]">
              Checkout
            </p>

            <h1 className="mt-3 font-display text-5xl">
              Your details
            </h1>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="border-b border-[#171717]/15 bg-transparent px-0 py-4 text-sm outline-none placeholder:text-[#99958d] focus:border-[#171717]"
                />

                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="border-b border-[#171717]/15 bg-transparent px-0 py-4 text-sm outline-none placeholder:text-[#99958d] focus:border-[#171717]"
                />
              </div>

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full border-b border-[#171717]/15 bg-transparent px-0 py-4 text-sm outline-none placeholder:text-[#99958d] focus:border-[#171717]"
              />

              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Delivery Address"
                required
                rows={3}
                className="w-full resize-none border-b border-[#171717]/15 bg-transparent px-0 py-4 text-sm outline-none placeholder:text-[#99958d] focus:border-[#171717]"
              />

              <div className="grid gap-6 sm:grid-cols-2">
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                  className="border-b border-[#171717]/15 bg-transparent px-0 py-4 text-sm outline-none placeholder:text-[#99958d] focus:border-[#171717]"
                />

                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State"
                  required
                  className="border-b border-[#171717]/15 bg-transparent px-0 py-4 text-sm outline-none placeholder:text-[#99958d] focus:border-[#171717]"
                />
              </div>

              <div className="mt-10">
  <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">
    Delivery Location
  </p>

  <p className="mt-2 text-xs leading-5 text-[#77736b]">
    Select the delivery price group that contains your location.
  </p>

  <div className="mt-5 space-y-3">
    {deliveryZones.map((zone, index) => {
      const selected = form.deliveryLocation === `zone-${index}`;

      return (
        <label
          key={`${zone.price}-${index}`}
          className={`block cursor-pointer border p-5 transition ${
            selected
              ? "border-[#171717] bg-[#eeece5]"
              : "border-[#171717]/10 bg-transparent hover:border-[#171717]/30"
          }`}
        >
          <div className="flex items-start gap-4">
            <input
              type="radio"
              name="deliveryLocation"
              value={`zone-${index}`}
              checked={selected}
              onChange={handleChange}
              required
              className="mt-1 h-4 w-4 accent-[#171717]"
            />

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold">
                  ₦{zone.price.toLocaleString()}
                </p>

                {selected && (
                  <span className="text-[9px] font-semibold uppercase tracking-[0.15em]">
                    Selected
                  </span>
                )}
              </div>

              <p className="mt-3 text-xs leading-6 text-[#77736b]">
                {zone.locations.join("  ·  ")}
              </p>
            </div>
          </div>
        </label>
      );
    })}

    {/* Pickup */}
    <label
      className={`block cursor-pointer border p-5 transition ${
        form.deliveryLocation === "pickup"
          ? "border-[#171717] bg-[#eeece5]"
          : "border-[#171717]/10 bg-transparent hover:border-[#171717]/30"
      }`}
    >
      <div className="flex items-start gap-4">
        <input
          type="radio"
          name="deliveryLocation"
          value="pickup"
          checked={form.deliveryLocation === "pickup"}
          onChange={handleChange}
          className="mt-1 h-4 w-4 accent-[#171717]"
        />

        <div>
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold">
              Pickup
            </p>

            <span className="text-sm font-semibold">
              FREE
            </span>
          </div>

          <p className="mt-3 text-xs leading-6 text-[#77736b]">
            16 Adalemo Street, Oke Koto, Agege.
            <br />
            Monday - Friday · 10am - 6pm
            <br />
            07082065518
          </p>
        </div>
      </div>
    </label>
  </div>
</div>

              <div className="mt-10 border border-[#171717]/10 bg-[#eeece5] p-6 lg:p-7">
  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#77736b]">
    Payment Method
  </p>

  <div className="mt-5 border border-[#171717]/15 bg-[#f5f3ee] p-5">
    <div className="flex items-start gap-3">
      <div className="mt-1 h-3 w-3 rounded-full bg-[#171717]" />

      <div>
        <p className="text-sm font-medium">
          Bank Transfer
        </p>

        <p className="mt-2 text-xs leading-5 text-[#77736b]">
          Transfer the order amount to the account below. Your order
          will be processed after payment is confirmed.
        </p>
      </div>
    </div>

    <div className="mt-6 space-y-4 border-t border-[#171717]/10 pt-5">
      <div>
        <p className="text-[9px] uppercase tracking-[0.18em] text-[#77736b]">
          Bank
        </p>
        <p className="mt-1 text-sm font-medium">
          YOUR BANK NAME
        </p>
      </div>

      <div>
        <p className="text-[9px] uppercase tracking-[0.18em] text-[#77736b]">
          Account Name
        </p>
        <p className="mt-1 text-sm font-medium">
          IGBALODE BATA
        </p>
      </div>

      <div>
        <p className="text-[9px] uppercase tracking-[0.18em] text-[#77736b]">
          Account Number
        </p>
        <p className="mt-1 text-sm font-medium">
          0000000000
        </p>
        <input
  name="paymentReference"
  value={form.paymentReference}
  onChange={handleChange}
  placeholder="Payment Reference / Transfer Name"
  required
  className="mt-6 w-full border-b border-[#171717]/15 bg-transparent px-0 py-4 text-sm outline-none placeholder:text-[#99958d] focus:border-[#171717]"
/>
      </div>

      <div className="border-t border-[#171717]/10 pt-5">
  <p className="text-[9px] uppercase tracking-[0.18em] text-[#77736b]">
    Amount to Transfer
  </p>

  <p className="mt-2 font-display text-2xl text-[#1c1b18]">
    ₦{total.toLocaleString()}
  </p>
</div>
    </div>
  </div>
</div>
 

              <button
                type="submit"
                className="mt-5 w-full bg-[#171717] px-6 py-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f5f3ee] transition hover:bg-[#33312d]"
              >
                I've Made the Transfer — Send Order
              </button>
            </form>
          </section>

          <aside className="h-fit border border-[#171717]/10 bg-[#eeece5] p-7 lg:p-9">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#77736b]">
              Order Summary
            </p>

            <div className="mt-7 space-y-5">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.color}-${item.size}`}
                  className="flex justify-between gap-5 border-b border-[#171717]/10 pb-5"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {item.name}
                    </p>

                    <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#77736b]">
                      {item.color} · Size {item.size} · Qty {item.quantity}
                    </p>
                  </div>

                  <p className="text-sm whitespace-nowrap">
                    ₦
                    {(
                      Number(item.price.replace(/[₦,]/g, "")) *
                      item.quantity
                    ).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 border-t border-[#171717]/10 pt-6">
  <div className="flex items-center justify-between">
    <span className="text-[10px] uppercase tracking-[0.18em]">
      Subtotal
    </span>

    <span className="text-sm">
      ₦{subtotal.toLocaleString()}
    </span>
  </div>

  <div className="mt-4 flex items-center justify-between text-sm">
    <span className="text-[#77736b]">
      Delivery
    </span>

    <span>
      {deliveryFee > 0
        ? `₦${deliveryFee.toLocaleString()}`
        : "Select location"}
    </span>
  </div>

  <div className="mt-5 flex items-center justify-between border-t border-[#171717]/10 pt-5">
    <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">
      Total
    </span>

    <span className="font-display text-2xl">
      ₦{total.toLocaleString()}
    </span>
  </div>
</div>

            <p className="mt-5 text-xs leading-5 text-[#77736b]">
              Delivery charges will be confirmed based on your location.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}