
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Boxes,
  Users,
  Settings,
  Search,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Ellipsis,
  Menu,
  X,
  ChevronRight,
  Clock3,
  CheckCircle2,
  Truck,
  CreditCard,
} from "lucide-react";

const navigation = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "Products", icon: Package },
  { name: "Orders", icon: ShoppingBag },
  { name: "Inventory", icon: Boxes },
  { name: "Customers", icon: Users },
  { name: "Settings", icon: Settings },
];

const stats = [
  {
    label: "Total Revenue",
    value: "₦485,000",
    change: "+12.8%",
    positive: true,
    icon: CreditCard,
  },
  {
    label: "Total Orders",
    value: "24",
    change: "+8.2%",
    positive: true,
    icon: ShoppingBag,
  },
  {
    label: "Products",
    value: "6",
    change: "Active catalogue",
    positive: true,
    icon: Package,
  },
  {
    label: "Low Stock",
    value: "2",
    change: "Needs attention",
    positive: false,
    icon: Boxes,
  },
];

const orders = [
  {
    id: "#IB-1048",
    customer: "Customer A",
    product: "The Ademola",
    amount: "₦55,000",
    date: "28 Oct 2026",
    status: "Pending",
  },
  {
    id: "#IB-1047",
    customer: "Customer B",
    product: "The Ajibola",
    amount: "₦70,000",
    date: "27 Oct 2026",
    status: "Paid",
  },
  {
    id: "#IB-1046",
    customer: "Customer C",
    product: "The Adunni",
    amount: "₦35,000",
    date: "27 Oct 2026",
    status: "Processing",
  },
  {
    id: "#IB-1045",
    customer: "Customer D",
    product: "The Abefe",
    amount: "₦45,000",
    date: "26 Oct 2026",
    status: "Delivered",
  },
];

type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  stock: number;
  description?: string;
  sizes?: string[];
  colors?: string[];
};

const initialProducts: Product[] = [
  {
    id: "1",
    name: "The Ademola",
    category: "Men's Mule",
    price: "₦55,000",
    image: "/products/men/ademola.jpg",
    stock: 12,
  },
  {
    id: "2",
    name: "The Adunni",
    category: "Women's Slippers",
    price: "₦35,000",
    image: "/products/women/adunni.jpg",
    stock: 3,
  },
  {
    id: "3",
    name: "The Abefe",
    category: "Men's Half Shoe",
    price: "₦45,000",
    image: "/products/men/abefe.jpg",
    stock: 8,
  },
  {
    id: "4",
    name: "The Ajibola",
    category: "Men's Loafers",
    price: "₦70,000",
    image: "/products/men/ajibola.jpg",
    stock: 2,
  },
  {
    id: "5",
    name: "The Ajiboye",
    category: "Men's Mules",
    price: "₦30,000",
    image: "/products/men/ajiboye.jpg",
    stock: 10,
  },
  {
    id: "6",
    name: "The Aduke",
    category: "Women's Slippers",
    price: "₦35,000",
    image: "/products/women/aduke.jpg",
    stock: 6,
  },
];

const statusStyles: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-800",
  Paid: "bg-blue-50 text-blue-800",
  Processing: "bg-purple-50 text-purple-800",
  Delivered: "bg-emerald-50 text-emerald-800",
};

export default function AdminPage() {
  const [activePage, setActivePage] = useState("Overview");
  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [ordersState, setOrdersState] = useState(orders);
const [ordersLoaded, setOrdersLoaded] = useState(false);

 const emptyProductForm = {
  name: "",
  category: "",
  price: "",
  image: "",
  stock: "0",
  sizes: "",
  colors: "",
  description: "",
};

const [products, setProducts] = useState<Product[]>(initialProducts);
const [productsLoaded, setProductsLoaded] = useState(false);

useEffect(() => {
  try {
    const savedProducts = localStorage.getItem("igbalode-admin-products");

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts) as Product[]);
    }
  } catch (error) {
    console.error("Could not load saved products:", error);
  } finally {
    setProductsLoaded(true);
  }
}, []);


useEffect(() => {
  try {
    const savedOrders = localStorage.getItem("igbalode-admin-orders");

    if (savedOrders) {
      setOrdersState(JSON.parse(savedOrders));
    }
  } catch (error) {
    console.error("Could not load saved orders:", error);
  } finally {
    setOrdersLoaded(true);
  }
}, []);

useEffect(() => {
  if (!ordersLoaded) return;

  try {
    localStorage.setItem(
      "igbalode-admin-orders",
      JSON.stringify(ordersState)
    );
  } catch (error) {
    console.error("Could not save orders:", error);
  }
}, [ordersState, ordersLoaded]);


useEffect(() => {
  if (!productsLoaded) return;

  try {
    localStorage.setItem(
      "igbalode-admin-products",
      JSON.stringify(products)
    );
  } catch (error) {
    console.error("Could not save products:", error);
  }
}, [products, productsLoaded]);
const [productFormOpen, setProductFormOpen] = useState(false);
const [editingProductId, setEditingProductId] = useState<string | null>(null);
const [productForm, setProductForm] = useState(emptyProductForm); 

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredOrders = ordersState.filter((order) =>
  [order.id, order.customer, order.product, order.status].some((value) =>
    value.toLowerCase().includes(search.toLowerCase())
  )
);

  const lowStock = products.filter((product) => product.stock <= 3);

  const openNewProductForm = () => {
  setEditingProductId(null);
  setProductForm({ ...emptyProductForm });
  setProductFormOpen(true);
};

const openEditProductForm = (product: Product) => {
  setEditingProductId(product.id);
  setProductForm({
    name: product.name,
    category: product.category,
    price: product.price.replace(/[₦,]/g, ""),
    image: product.image,
    stock: String(product.stock),
    sizes: product.sizes?.join(", ") ?? "",
    colors: product.colors?.join(", ") ?? "",
    description: product.description ?? "",
  });
  setProductFormOpen(true);
};

const saveProduct = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const numericPrice = Number(productForm.price);
  const numericStock = Number(productForm.stock);

  if (
    !productForm.name.trim() ||
    !productForm.category.trim() ||
    !productForm.image.trim() ||
    !Number.isFinite(numericPrice) ||
    numericPrice <= 0 ||
    !Number.isInteger(numericStock) ||
    numericStock < 0
  ) {
    alert("Please enter valid product details.");
    return;
  };


  const product: Product = {
    id: editingProductId ?? Date.now().toString(),
    name: productForm.name.trim(),
    category: productForm.category.trim(),
    price: `₦${numericPrice.toLocaleString("en-NG")}`,
    image: productForm.image.trim(),
    stock: numericStock,
    sizes: productForm.sizes
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    colors: productForm.colors
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    description: productForm.description.trim(),
  };

  if (editingProductId) {
    setProducts((current) =>
      current.map((item) => (item.id === editingProductId ? product : item))
    );
  } else {
    setProducts((current) => [product, ...current]);
  }

  setProductFormOpen(false);
  setEditingProductId(null);
  setProductForm({ ...emptyProductForm });
  setSearch("");
  setActivePage("Products");
};


const updateProductStock = (productId: string, newStock: number) => {
  if (!Number.isInteger(newStock) || newStock < 0) return;

  setProducts((current) =>
    current.map((product) =>
      product.id === productId
        ? { ...product, stock: newStock }
        : product
    )
  );
};


const updateOrderStatus = (
  orderId: string,
  newStatus: string
) => {
  setOrdersState((current) =>
    current.map((order) =>
      order.id === orderId
        ? { ...order, status: newStatus }
        : order
    )
  );
};



  return (
    <main className="min-h-screen bg-[#f5f3ee] text-[#1c1b18]">
      {mobileMenu && (
        <button
          aria-label="Close menu overlay"
          onClick={() => setMobileMenu(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-black/10 bg-[#171717] text-[#f5f3ee] transition-transform duration-300 ${
          mobileMenu ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-24 items-center justify-between border-b border-white/10 px-7">
          <div>
            <p className="font-display text-2xl tracking-[0.08em]">
              IGBALODE
            </p>
            <p className="mt-1 text-[9px] uppercase tracking-[0.32em] text-white/50">
              BATA · Administration
            </p>
          </div>
          <button
            aria-label="Close navigation"
            onClick={() => setMobileMenu(false)}
            className="lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-5 pt-8">
          <p className="mb-4 px-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/35">
            Store management
          </p>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = activePage === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActivePage(item.name);
                    setSearch("");
                    setMobileMenu(false);
                  }}
                  className={`flex w-full items-center gap-3 px-3 py-3.5 text-left text-xs transition ${
                    active
                      ? "bg-[#f5f3ee] text-[#171717]"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={17} strokeWidth={1.6} />
                  <span>{item.name}</span>
                  {item.name === "Orders" && (
                    <span
                      className={`ml-auto text-[10px] ${
                        active ? "text-black/50" : "text-white/40"
                      }`}
                    >
                      4
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-white/10 p-5">
          <div className="flex items-center gap-3 bg-white/5 p-3">
            <div className="flex h-9 w-9 items-center justify-center bg-[#c4b49a] text-xs font-semibold text-[#171717]">
              IB
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium">Store Administrator</p>
              <p className="mt-1 text-[10px] text-white/40">
                Demo dashboard
              </p>
            </div>
            <Ellipsis size={17} className="text-white/50" />
          </div>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-[260px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-black/10 bg-[#f5f3ee]/95 px-5 backdrop-blur-md sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <button
              aria-label="Open navigation"
              onClick={() => setMobileMenu(true)}
              className="lg:hidden"
            >
              <Menu size={21} />
            </button>
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#77736b]">
                IGBALODE BATA / {activePage}
              </p>
              <h1 className="mt-1 font-display text-xl sm:text-2xl">
                {activePage}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-[10px] text-[#77736b] sm:block">
              Wednesday, 28 October 2026
            </span>
            <button
              aria-label="Notifications"
              className="relative flex h-10 w-10 items-center justify-center border border-black/10 transition hover:bg-white"
            >
              <Bell size={17} strokeWidth={1.5} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#a47c46]" />
            </button>
          </div>
        </header>

        <div className="px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
          {activePage === "Overview" && (
            <>
              <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#77736b]">
                    Store overview
                  </p>
                  <h2 className="mt-2 font-display text-3xl sm:text-4xl">
                    Welcome back.
                  </h2>
                  <p className="mt-2 text-xs leading-6 text-[#77736b]">
                    Here&apos;s what&apos;s happening with your store.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActivePage("Products");
                    setSearch("");
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-[#171717] px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#f5f3ee] transition hover:bg-[#33312d]"
                >
                  <Plus size={15} />
                  Manage products
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="border border-black/10 bg-white/60 p-5 sm:p-6"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] text-[#77736b]">
                          {stat.label}
                        </p>
                        <Icon
                          size={17}
                          strokeWidth={1.5}
                          className="text-[#77736b]"
                        />
                      </div>
                      <p className="mt-5 font-display text-3xl">
                        {stat.value}
                      </p>
                      <div className="mt-3 flex items-center gap-1.5 text-[10px]">
                        {index < 2 ? (
                          <ArrowUpRight size={13} className="text-emerald-700" />
                        ) : index === 3 ? (
                          <ArrowDownRight size={13} className="text-amber-700" />
                        ) : null}
                        <span
                          className={
                            index < 2
                              ? "text-emerald-800"
                              : index === 3
                                ? "text-amber-800"
                                : "text-[#77736b]"
                          }
                        >
                          {stat.change}
                        </span>
                        {index < 2 && (
                          <span className="text-[#77736b]">this month</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
                <section className="min-w-0 border border-black/10 bg-white/60">
                  <div className="flex items-center justify-between border-b border-black/10 px-5 py-5 sm:px-6">
                    <div>
                      <h3 className="font-display text-xl">Recent orders</h3>
                      <p className="mt-1 text-[10px] text-[#77736b]">
                        Latest activity from your store
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setActivePage("Orders");
                        setSearch("");
                      }}
                      className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.1em] hover:underline"
                    >
                      View all <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[620px] text-left">
                      <thead>
                        <tr className="border-b border-black/10 text-[9px] uppercase tracking-[0.14em] text-[#77736b]">
                          <th className="px-6 py-4 font-medium">Order</th>
                          <th className="px-4 py-4 font-medium">Product</th>
                          <th className="px-4 py-4 font-medium">Amount</th>
                          <th className="px-4 py-4 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 4).map((order) => (
                          <tr
                            key={order.id}
                            className="border-b border-black/5 last:border-0"
                          >
                            <td className="px-6 py-5">
                              <p className="text-xs font-medium">{order.id}</p>
                              <p className="mt-1 text-[10px] text-[#77736b]">
                                {order.date}
                              </p>
                            </td>
                            <td className="px-4 py-5 text-xs">
                              {order.product}
                            </td>
                            <td className="px-4 py-5 text-xs font-medium">
                              {order.amount}
                            </td>
                            <td className="px-4 py-5">
                              <span
                                className={`inline-flex whitespace-nowrap px-2.5 py-1.5 text-[9px] ${statusStyles[order.status]}`}
                              >
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="border border-black/10 bg-white/60">
                  <div className="flex items-center justify-between border-b border-black/10 px-5 py-5">
                    <div>
                      <h3 className="font-display text-xl">Stock alerts</h3>
                      <p className="mt-1 text-[10px] text-[#77736b]">
                        Products that need attention
                      </p>
                    </div>
                    <Boxes size={18} strokeWidth={1.5} />
                  </div>

                  <div className="divide-y divide-black/5">
                    {lowStock.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-3 px-5 py-4"
                      >
                        <div className="relative h-14 w-12 shrink-0 overflow-hidden bg-[#e8e3d9]">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-medium">
                            {product.name}
                          </p>
                          <p className="mt-1 text-[10px] text-[#77736b]">
                            {product.category}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-semibold">
                            {product.stock} left
                          </p>
                          <p className="mt-1 text-[9px] text-amber-800">
                            Low stock
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setActivePage("Inventory");
                      setSearch("");
                    }}
                    className="flex w-full items-center justify-center gap-2 border-t border-black/10 py-4 text-[10px] font-semibold uppercase tracking-[0.12em] hover:bg-black/[0.03]"
                  >
                    Manage inventory <ArrowUpRight size={14} />
                  </button>
                </section>
              </div>

              <section className="mt-6 border border-black/10 bg-white/60">
                <div className="flex items-center justify-between border-b border-black/10 px-5 py-5 sm:px-6">
                  <div>
                    <h3 className="font-display text-xl">Product catalogue</h3>
                    <p className="mt-1 text-[10px] text-[#77736b]">
                      A quick look at your current collection
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActivePage("Products");
                      setSearch("");
                    }}
                    className="text-[10px] font-semibold uppercase tracking-[0.12em] hover:underline"
                  >
                    Manage products
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-px bg-black/10 sm:grid-cols-3 xl:grid-cols-6">
                  {products.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        setActivePage("Products");
                        setSearch(product.name);
                      }}
                      className="bg-[#f9f8f4] p-3 text-left transition hover:bg-white sm:p-4"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden bg-[#e8e3d9]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 45vw, 180px"
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <p className="mt-3 truncate text-xs font-medium">
                        {product.name}
                      </p>
                      <p className="mt-1 text-[10px] text-[#77736b]">
                        {product.price}
                      </p>
                    </button>
                  ))}
                </div>
              </section>
            </>
          )}

          {activePage === "Products" && (
            <section className="border border-black/10 bg-white/60">
              <div className="flex flex-col justify-between gap-4 border-b border-black/10 p-5 sm:flex-row sm:items-center sm:px-6">
                <div>
                  <h2 className="font-display text-2xl">All products</h2>
                  <p className="mt-1 text-xs text-[#77736b]">
                    {filteredProducts.length} products in this demo catalogue
                  </p>
                </div>
                <button
  onClick={openNewProductForm}
  className="inline-flex items-center justify-center gap-2 bg-[#171717] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white"
>
  <Plus size={15} /> Add product
</button>
              </div>

              <div className="border-b border-black/10 p-4 sm:px-6">
                <div className="flex max-w-md items-center gap-3 border border-black/10 bg-[#f5f3ee] px-3">
                  <Search size={16} className="text-[#77736b]" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search products..."
                    className="w-full bg-transparent py-3 text-xs outline-none"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-left">
                  <thead>
                    <tr className="border-b border-black/10 text-[9px] uppercase tracking-[0.14em] text-[#77736b]">
                      <th className="px-6 py-4 font-medium">Product</th>
                      <th className="px-4 py-4 font-medium">Category</th>
                      <th className="px-4 py-4 font-medium">Price</th>
                      <th className="px-4 py-4 font-medium">Demo stock</th>
                      <th className="px-4 py-4 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b border-black/5">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative h-12 w-10 overflow-hidden bg-[#e8e3d9]">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            </div>
                            <span className="text-xs font-medium">
                              {product.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-xs text-[#77736b]">
                          {product.category}
                        </td>
                        <td className="px-4 py-4 text-xs">{product.price}</td>
                        <td className="px-4 py-4 text-xs">{product.stock}</td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => openEditProductForm(product)}
                        
                            className="text-[10px] font-semibold uppercase tracking-[0.1em] underline underline-offset-4"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredProducts.length === 0 && (
                  <p className="p-8 text-center text-xs text-[#77736b]">
                    No matching products found.
                  </p>
                )}
              </div>
            </section>
          )}

          {activePage === "Orders" && (
            <section className="border border-black/10 bg-white/60">
              <div className="border-b border-black/10 p-5 sm:px-6">
                <h2 className="font-display text-2xl">All orders</h2>
                <p className="mt-1 text-xs text-[#77736b]">
                  Review incoming orders in this demo.
                </p>
              </div>
              <div className="border-b border-black/10 p-4 sm:px-6">
                <div className="flex max-w-md items-center gap-3 border border-black/10 bg-[#f5f3ee] px-3">
                  <Search size={16} className="text-[#77736b]" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search orders..."
                    className="w-full bg-transparent py-3 text-xs outline-none"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-left">
                  <thead>
                    <tr className="border-b border-black/10 text-[9px] uppercase tracking-[0.14em] text-[#77736b]">
                      <th className="px-6 py-4 font-medium">Order</th>
                      <th className="px-4 py-4 font-medium">Customer</th>
                      <th className="px-4 py-4 font-medium">Product</th>
                      <th className="px-4 py-4 font-medium">Amount</th>
                      <th className="px-4 py-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b border-black/5">
                        <td className="px-6 py-5 text-xs font-medium">
                          {order.id}
                          <p className="mt-1 text-[10px] font-normal text-[#77736b]">
                            {order.date}
                          </p>
                        </td>
                        <td className="px-4 py-5 text-xs">{order.customer}</td>
                        <td className="px-4 py-5 text-xs">{order.product}</td>
                        <td className="px-4 py-5 text-xs font-medium">
                          {order.amount}
                        </td>
                        <td className="px-4 py-5">
                          
<select
  value={order.status}
  onChange={(event) =>
    updateOrderStatus(order.id, event.target.value)
  }
  className={`max-w-[140px] border border-black/10 px-2 py-2 text-[10px] outline-none ${statusStyles[order.status]}`}
  aria-label={`Update status for order ${order.id}`}
>
  <option value="Pending">Pending</option>
  <option value="Processing">Processing</option>
  <option value="Shipped">Shipped</option>
  <option value="Delivered">Delivered</option>
  <option value="Cancelled">Cancelled</option>
</select>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredOrders.length === 0 && (
                  <p className="p-8 text-center text-xs text-[#77736b]">
                    No matching orders found.
                  </p>
                )}
              </div>
            </section>
          )}

          {activePage === "Inventory" && (
            <section className="border border-black/10 bg-white/60">
              <div className="border-b border-black/10 p-5 sm:px-6">
                <h2 className="font-display text-2xl">Inventory overview</h2>
                <p className="mt-1 text-xs text-[#77736b]">
                  Sample stock figures for the current product catalogue.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 border border-black/10 p-4"
                  >
                    <div className="relative h-16 w-14 shrink-0 bg-[#e8e3d9]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium">
                        {product.name}
                      </p>
                      
<div className="mt-2 flex items-center gap-2">
  <label
    htmlFor={`stock-${product.id}`}
    className="text-[10px] text-[#77736b]"
  >
    Stock:
  </label>
  <input
    id={`stock-${product.id}`}
    type="number"
    min="0"
    step="1"
    value={product.stock}
    onChange={(event) => {
      const value = event.target.value;
      if (value !== "") {
        updateProductStock(product.id, Number(value));
      }
    }}
    className="w-20 border border-black/15 bg-white px-2 py-1.5 text-xs outline-none focus:border-black"
    aria-label={`Stock quantity for ${product.name}`}
  />
  <span className="text-[10px] text-[#77736b]">units</span>
</div>

                      <p
                        className={`mt-2 text-[9px] font-semibold uppercase tracking-[0.1em] ${
                          product.stock <= 3
                            ? "text-amber-800"
                            : "text-emerald-800"
                        }`}
                      >
                        {product.stock <= 3 ? "Low stock" : "In stock"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activePage === "Customers" && (
            <section className="border border-black/10 bg-white/60 p-8 sm:p-12">
              <Users size={28} strokeWidth={1.3} />
              <h2 className="mt-5 font-display text-2xl">Customer management</h2>
              <p className="mt-3 max-w-lg text-sm leading-7 text-[#77736b]">
                Customer records will appear here once we connect secure
                order storage. No real customer data is used in this demo.
              </p>
            </section>
          )}

          {activePage === "Settings" && (
            <section className="border border-black/10 bg-white/60 p-8 sm:p-12">
              <Settings size={28} strokeWidth={1.3} />
              <h2 className="mt-5 font-display text-2xl">Store settings</h2>
              <p className="mt-3 max-w-lg text-sm leading-7 text-[#77736b]">
                Store details, payment settings, delivery options and admin
                access will be configured in a later stage.
              </p>
            </section>
          )}

          
{productFormOpen && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4">
    <form
      onSubmit={saveProduct}
      className="my-auto w-full max-w-2xl border border-black/10 bg-[#f5f3ee] p-5 shadow-2xl sm:p-8"
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#77736b]">
            IGBALODE BATA / PRODUCTS
          </p>
          <h2 className="mt-2 font-display text-2xl">
            {editingProductId ? "Edit product" : "Add new product"}
          </h2>
          <p className="mt-2 text-xs text-[#77736b]">
            Enter the product details below.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setProductFormOpen(false)}
          aria-label="Close product form"
          className="border border-black/10 p-2 hover:bg-white"
        >
          <X size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="text-xs">
          Product name *
          <input
            required
            value={productForm.name}
            onChange={(e) =>
              setProductForm({ ...productForm, name: e.target.value })
            }
            placeholder="e.g. The Ademola"
            className="mt-2 w-full border border-black/15 bg-white px-3 py-3 outline-none focus:border-black"
          />
        </label>

        <label className="text-xs">
          Category *
          <input
            required
            value={productForm.category}
            onChange={(e) =>
              setProductForm({ ...productForm, category: e.target.value })
            }
            placeholder="e.g. Men's Mule"
            className="mt-2 w-full border border-black/15 bg-white px-3 py-3 outline-none focus:border-black"
          />
        </label>

        <label className="text-xs">
          Price in naira *
          <input
            required
            type="number"
            min="1"
            step="1"
            value={productForm.price}
            onChange={(e) =>
              setProductForm({ ...productForm, price: e.target.value })
            }
            placeholder="55000"
            className="mt-2 w-full border border-black/15 bg-white px-3 py-3 outline-none focus:border-black"
          />
        </label>

        <label className="text-xs">
          Stock quantity *
          <input
            required
            type="number"
            min="0"
            step="1"
            value={productForm.stock}
            onChange={(e) =>
              setProductForm({ ...productForm, stock: e.target.value })
            }
            className="mt-2 w-full border border-black/15 bg-white px-3 py-3 outline-none focus:border-black"
          />
        </label>

        <label className="text-xs sm:col-span-2">
          Product image path *
          <input
            required
            value={productForm.image}
            onChange={(e) =>
              setProductForm({ ...productForm, image: e.target.value })
            }
            placeholder="/products/men/your-image.jpg"
            className="mt-2 w-full border border-black/15 bg-white px-3 py-3 outline-none focus:border-black"
          />
          <span className="mt-1 block text-[10px] text-[#77736b]">
            Use an image already inside your project's public folder.
          </span>
        </label>

        <label className="text-xs">
          Available sizes
          <input
            value={productForm.sizes}
            onChange={(e) =>
              setProductForm({ ...productForm, sizes: e.target.value })
            }
            placeholder="40, 41, 42, 43, 44, 45"
            className="mt-2 w-full border border-black/15 bg-white px-3 py-3 outline-none focus:border-black"
          />
        </label>

        <label className="text-xs">
          Available colours
          <input
            value={productForm.colors}
            onChange={(e) =>
              setProductForm({ ...productForm, colors: e.target.value })
            }
            placeholder="Black, Wine, Brown"
            className="mt-2 w-full border border-black/15 bg-white px-3 py-3 outline-none focus:border-black"
          />
        </label>

        <label className="text-xs sm:col-span-2">
          Description
          <textarea
            rows={3}
            value={productForm.description}
            onChange={(e) =>
              setProductForm({ ...productForm, description: e.target.value })
            }
            placeholder="Describe the footwear..."
            className="mt-2 w-full resize-y border border-black/15 bg-white px-3 py-3 outline-none focus:border-black"
          />
        </label>
      </div>

      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => setProductFormOpen(false)}
          className="border border-black/15 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] hover:bg-white"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-[#171717] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-[#33312d]"
        >
          {editingProductId ? "Save changes" : "Add product"}
        </button>
      </div>
    </form>
  </div>
)}


          <footer className="mt-10 flex flex-col justify-between gap-2 border-t border-black/10 pt-5 text-[10px] text-[#77736b] sm:flex-row">
            <p>IGBALODE BATA · Store administration</p>
            <p>UI preview — sample data only</p>
          </footer>
        </div>
      </div>
    </main>
  );
}
