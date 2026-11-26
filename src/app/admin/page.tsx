"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
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



type Order = {
  id: string;
  customer: string;
  product: string;
  amount: string;
  date: string;
  status: string;
};

const orders: Order[] = [];

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

const statusStyles: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-800",
  Paid: "bg-blue-50 text-blue-800",
  Processing: "bg-purple-50 text-purple-800",
  Shipped: "bg-indigo-50 text-indigo-800",
  Delivered: "bg-emerald-50 text-emerald-800",
};

export default function AdminPage() {
  const [activePage, setActivePage] = useState("Overview");
  const [currentDate, setCurrentDate] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString("en-NG", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);
  const [mobileMenu, setMobileMenu] = useState(false);
 const [products, setProducts] = useState<Product[]>([]); 
  const [ordersState, setOrdersState] = useState<Order[]>(orders);
  const [orderStatusFilter, setOrderStatusFilter] = useState("All");

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

const [productsLoaded, setProductsLoaded] = useState(false);
const [productError, setProductError] = useState("");

useEffect(() => {
  const loadProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Could not load products from Supabase:", error);
      setProductError(error.message);
      setProductsLoaded(true);
      return;
    }

    setProducts((data ?? []).map((item: any) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      price: `₦${Number(item.price).toLocaleString("en-NG")}`,
      image: item.images?.[0] ?? item.colors?.[0]?.image ?? "/placeholder.png",
      stock: Number(item.stock ?? 0),
      description: item.description ?? "",
      sizes: item.sizes ?? [],
      colors: (item.colors ?? []).map((color: { name: string }) => color.name),
    })));
    setProductsLoaded(true);
  };

  loadProducts();
}, []);

const [productFormOpen, setProductFormOpen] = useState(false);
const [editingProductId, setEditingProductId] = useState<string | null>(null);
const [productForm, setProductForm] = useState(emptyProductForm);
const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null); 

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredOrders = ordersState.filter((order) => {
  const matchesSearch = [
    order.id,
    order.customer,
    order.product,
    order.status,
  ].some((value) =>
    value.toLowerCase().includes(search.toLowerCase())
  );

  const matchesStatus =
    orderStatusFilter === "All" ||
    order.status === orderStatusFilter;

  return matchesSearch && matchesStatus;
});

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

const saveProduct = async (event: React.FormEvent<HTMLFormElement>) => {
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
  }

  const slug = productForm.name.trim().toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const colorNames = productForm.colors.split(",").map((item) => item.trim()).filter(Boolean);

  // Preserve each existing colour's image when editing a product.
  let existingImages: string[] = [];
  let existingColors: { name: string; image: string }[] = [];

  if (editingProductId) {
    const { data: existingProduct, error: existingError } = await supabase
      .from("products")
      .select("images, colors")
      .eq("id", editingProductId)
      .single();

    if (existingError) {
      alert(`Could not retrieve the existing product: ${existingError.message}`);
      return;
    }

    existingImages = existingProduct.images ?? [];
    existingColors = existingProduct.colors ?? [];
  }

  const nextImages = editingProductId
    ? [productForm.image.trim(), ...existingImages.filter((image) => image !== productForm.image.trim())]
    : [productForm.image.trim()];

  const nextColors = colorNames.map((name) => ({
    name,
    image: existingColors.find((color) => color.name === name)?.image ?? productForm.image.trim(),
  }));

  const payload = {
    name: productForm.name.trim(),
    slug,
    category: productForm.category.trim(),
    price: numericPrice,
    images: nextImages,
    colors: nextColors,
    sizes: productForm.sizes.split(",").map((item) => item.trim()).filter(Boolean),
    stock: numericStock,
    description: productForm.description.trim(),
    updated_at: new Date().toISOString(),
  };

  const result = editingProductId
    ? await supabase.from("products").update(payload).eq("id", editingProductId).select().single()
    : await supabase.from("products").insert(payload).select().single();

  if (result.error) {
    console.error("Could not save product:", result.error);
    alert(`Could not save product: ${result.error.message}`);
    return;
  }

  const data = result.data;
  const savedProduct: Product = {
    id: data.id,
    name: data.name,
    category: data.category,
    price: `₦${Number(data.price).toLocaleString("en-NG")}`,
    image: data.images?.[0] ?? "/placeholder.png",
    stock: Number(data.stock ?? 0),
    description: data.description ?? "",
    sizes: data.sizes ?? [],
    colors: (data.colors ?? []).map((color: { name: string }) => color.name),
  };

  setProducts((current) => editingProductId
    ? current.map((item) => item.id === editingProductId ? savedProduct : item)
    : [...current, savedProduct]
  );
  setProductFormOpen(false);
  setEditingProductId(null);
  setProductForm({ ...emptyProductForm });
  setSearch("");
  setActivePage("Products");
};


const updateProductStock = async (productId: string, newStock: number) => {
  if (!Number.isInteger(newStock) || newStock < 0) return;

  const { error } = await supabase.from("products")
    .update({ stock: newStock, updated_at: new Date().toISOString() })
    .eq("id", productId);

  if (error) {
    console.error("Could not update stock:", error);
    alert(`Could not update stock: ${error.message}`);
    return;
  }

  setProducts((current) => current.map((product) =>
    product.id === productId ? { ...product, stock: newStock } : product
  ));
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


type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
};

const initialCustomers: Customer[] = [];

const [customers] = useState<Customer[]>(initialCustomers);
const [customerSearch, setCustomerSearch] = useState("");
const [selectedCustomerId, setSelectedCustomerId] =
  useState<string | null>(null);

const filteredCustomers = customers.filter((customer) =>
  `${customer.name} ${customer.email} ${customer.phone} ${customer.id}`
    .toLowerCase()
    .includes(customerSearch.toLowerCase())
);

const selectedCustomer = customers.find(
  (customer) => customer.id === selectedCustomerId
);


const totalRevenue = ordersState
  .filter((order) =>
    ["Paid", "Processing", "Shipped", "Delivered"].includes(order.status)
  )
  .reduce((sum, order) => {
    const amount = Number(
      String(order.amount).replace(/[₦,\s]/g, "")
    );
    return sum + (Number.isFinite(amount) ? amount : 0);
  }, 0);

const totalOrders = ordersState.filter(
  (order) => order.status !== "Cancelled"
).length;

const totalProducts = products.length;

const lowStockCount = products.filter(
  (product) => product.stock <= 3
).length;

const stats = [
  {
    label: "Total Revenue",
    value: `₦${totalRevenue.toLocaleString("en-NG")}`,
    change: "From current orders",
    positive: true,
    icon: CreditCard,
  },
  {
    label: "Total Orders",
    value: String(totalOrders),
    change: "Non-cancelled orders",
    positive: true,
    icon: ShoppingBag,
  },
  {
    label: "Products",
    value: String(totalProducts),
    change: "Current catalogue",
    positive: true,
    icon: Package,
  },
  {
    label: "Low Stock",
    value: String(lowStockCount),
    change: lowStockCount > 0 ? "Needs attention" : "Stock looks good",
    positive: lowStockCount === 0,
    icon: Boxes,
  },
];



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
                      {ordersState.filter((order) => order.status === "Pending").length}
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
              {currentDate || "Store dashboard"}
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
  {stat.label === "Low Stock" && lowStockCount > 0 && (
    <ArrowDownRight size={13} className="text-amber-700" />
  )}

  <span
    className={
      stat.label === "Low Stock" && lowStockCount > 0
        ? "text-amber-800"
        : "text-[#77736b]"
    }
  >
    {stat.change}
  </span>
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
                        {ordersState.slice(0, 4).map((order) => (
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
                    {ordersState.length === 0 && (
                      <p className="p-8 text-center text-xs text-[#77736b]">
                        No customer orders have been received yet.
                      </p>
                    )}
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
                    {lowStock.length === 0 && (
                      <p className="px-5 py-6 text-xs text-[#77736b]">
                        No low-stock products right now.
                      </p>
                    )}
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
                      Products currently saved in your catalogue
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
                    {filteredProducts.length} products in this admin catalogue
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

              {productError && (
                <p className="m-5 border border-red-200 bg-red-50 p-4 text-xs text-red-800">
                  Could not load products from Supabase: {productError}
                </p>
              )}
              {productsLoaded && products.length === 0 && !productError && (
                <p className="p-8 text-center text-xs text-[#77736b]">
                  No products have been found in Supabase yet.
                </p>
              )}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-left">
                  <thead>
                    <tr className="border-b border-black/10 text-[9px] uppercase tracking-[0.14em] text-[#77736b]">
                      <th className="px-6 py-4 font-medium">Product</th>
                      <th className="px-4 py-4 font-medium">Category</th>
                      <th className="px-4 py-4 font-medium">Price</th>
                      <th className="px-4 py-4 font-medium">Stock</th>
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
            <>
            <section className="border border-black/10 bg-white/60">
              <div className="border-b border-black/10 p-5 sm:px-6">
                <h2 className="font-display text-2xl">All orders</h2>
                <p className="mt-1 text-xs text-[#77736b]">
                  Customer orders will appear here after checkout is connected to Supabase.
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
                <div className="mt-3">
  <label
    htmlFor="order-status-filter"
    className="mb-2 block text-[10px] uppercase tracking-[0.12em] text-[#77736b]"
  >
    Filter by status
  </label>

  <select
    id="order-status-filter"
    value={orderStatusFilter}
    onChange={(event) => setOrderStatusFilter(event.target.value)}
    className="w-full max-w-md border border-black/10 bg-[#f5f3ee] px-3 py-3 text-xs outline-none focus:border-black"
  >
    <option value="All">All statuses</option>
    <option value="Pending">Pending</option>
    <option value="Processing">Processing</option>
    <option value="Shipped">Shipped</option>
    <option value="Delivered">Delivered</option>
    <option value="Cancelled">Cancelled</option>
  </select>
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
                      <th className="px-4 py-4 font-medium">Details</th>
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
                       <td className="px-4 py-5">
  <button
    type="button"
    onClick={() => setSelectedOrderId(order.id)}
    className="border border-black/15 px-3 py-2 text-[10px] uppercase tracking-[0.1em] hover:bg-[#f5f3ee]"
  >
    View
  </button>
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

          
{selectedOrderId && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
    <div className="w-full max-w-lg border border-black/10 bg-[#f5f3ee] p-6 shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#77736b]">
            IGBALODE BATA / ORDER DETAILS
          </p>
          <h3 className="mt-2 font-display text-2xl">
            {ordersState.find((order) => order.id === selectedOrderId)?.id}
          </h3>
        </div>

        <button
          type="button"
          onClick={() => setSelectedOrderId(null)}
          className="border border-black/15 px-3 py-2 text-xs hover:bg-white"
        >
          Close
        </button>
      </div>

      {ordersState
        .filter((order) => order.id === selectedOrderId)
        .map((order) => (
          <div key={order.id} className="mt-6 space-y-4 text-xs">
            <div className="border-b border-black/10 pb-3">
              <p className="text-[10px] text-[#77736b]">Customer</p>
              <p className="mt-1 font-medium">{order.customer}</p>
            </div>

            <div className="border-b border-black/10 pb-3">
              <p className="text-[10px] text-[#77736b]">Product</p>
              <p className="mt-1 font-medium">{order.product}</p>
            </div>

            <div className="border-b border-black/10 pb-3">
              <p className="text-[10px] text-[#77736b]">Order amount</p>
              <p className="mt-1 font-medium">{order.amount}</p>
            </div>

            <div className="border-b border-black/10 pb-3">
              <p className="text-[10px] text-[#77736b]">Order date</p>
              <p className="mt-1 font-medium">{order.date}</p>
            </div>

            <div>
              <p className="text-[10px] text-[#77736b]">Current status</p>
              <p className="mt-1 font-medium">{order.status}</p>
            </div>
          </div>
        ))}

      <button
        type="button"
        onClick={() => setSelectedOrderId(null)}
        className="mt-7 w-full bg-[#171717] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-[#33312d]"
      >
        Done
      </button>
    </div>
  </div>
)}  
    </>
           )}
 

          {activePage === "Inventory" && (
            <section className="border border-black/10 bg-white/60">
              <div className="border-b border-black/10 p-5 sm:px-6">
                <h2 className="font-display text-2xl">Inventory overview</h2>
                <p className="mt-1 text-xs text-[#77736b]">
                  Stock quantities saved in your Supabase product records.
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
  <section className="border border-black/10 bg-white/60">
    <div className="border-b border-black/10 p-5 sm:px-6">
      <h2 className="font-display text-2xl">
        Customer management
      </h2>
      <p className="mt-1 text-xs text-[#77736b]">
        Browse and review customer records.
      </p>
    </div>

    <div className="grid gap-3 border-b border-black/10 p-5 sm:grid-cols-3">
      <div className="bg-[#f5f3ee] p-4">
        <p className="text-[10px] uppercase tracking-widest text-[#77736b]">
          Total customers
        </p>
        <p className="mt-2 font-display text-2xl">
          {customers.length}
        </p>
      </div>

      <div className="bg-[#f5f3ee] p-4">
        <p className="text-[10px] uppercase tracking-widest text-[#77736b]">
          Total orders
        </p>
        <p className="mt-2 font-display text-2xl">
          {customers.reduce((sum, customer) => sum + customer.orders, 0)}
        </p>
      </div>

      <div className="bg-[#f5f3ee] p-4">
        <p className="text-[10px] uppercase tracking-widest text-[#77736b]">
          Customer spending
        </p>
        <p className="mt-2 font-display text-2xl">
          ₦{customers
            .reduce((sum, customer) => sum + customer.totalSpent, 0)
            .toLocaleString("en-NG")}
        </p>
      </div>
    </div>

    <div className="p-4 sm:px-6">
      <input
        value={customerSearch}
        onChange={(event) => setCustomerSearch(event.target.value)}
        placeholder="Search by name, email, phone or ID..."
        className="w-full max-w-lg border border-black/10 bg-[#f5f3ee] px-4 py-3 text-xs outline-none focus:border-black"
      />
    </div>

    <div className="overflow-x-auto">
      <table className="w-full min-w-[650px] text-left">
        <thead>
          <tr className="border-y border-black/10 text-[9px] uppercase tracking-widest text-[#77736b]">
            <th className="px-6 py-4 font-medium">Customer</th>
            <th className="px-4 py-4 font-medium">Contact</th>
            <th className="px-4 py-4 font-medium">Orders</th>
            <th className="px-4 py-4 font-medium">Total spent</th>
            <th className="px-4 py-4 font-medium">Details</th>
          </tr>
        </thead>

        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id} className="border-b border-black/5">
              <td className="px-6 py-5 text-xs font-medium">
                {customer.name}
                <p className="mt-1 text-[10px] font-normal text-[#77736b]">
                  {customer.id}
                </p>
              </td>

              <td className="px-4 py-5 text-xs">
                {customer.email}
                <p className="mt-1 text-[10px] text-[#77736b]">
                  {customer.phone}
                </p>
              </td>

              <td className="px-4 py-5 text-xs">
                {customer.orders}
              </td>

              <td className="px-4 py-5 text-xs font-medium">
                ₦{customer.totalSpent.toLocaleString("en-NG")}
              </td>

              <td className="px-4 py-5">
                <button
                  type="button"
                  onClick={() => setSelectedCustomerId(customer.id)}
                  className="border border-black/15 px-3 py-2 text-[10px] uppercase tracking-wider hover:bg-[#f5f3ee]"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredCustomers.length === 0 && (
        <p className="p-8 text-center text-xs text-[#77736b]">
          No customer records yet. They will appear when checkout is connected.
        </p>
      )}
    </div>

    {selectedCustomer && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-md border border-black/10 bg-[#f5f3ee] p-6 shadow-2xl">
          <p className="text-[9px] uppercase tracking-widest text-[#77736b]">
            IGBALODE BATA / CUSTOMER DETAILS
          </p>

          <h3 className="mt-3 font-display text-2xl">
            {selectedCustomer.name}
          </h3>

          <div className="mt-6 space-y-4 text-xs">
            <div className="border-b border-black/10 pb-3">
              <p className="text-[#77736b]">Customer ID</p>
              <p className="mt-1">{selectedCustomer.id}</p>
            </div>

            <div className="border-b border-black/10 pb-3">
              <p className="text-[#77736b]">Email</p>
              <p className="mt-1">{selectedCustomer.email}</p>
            </div>

            <div className="border-b border-black/10 pb-3">
              <p className="text-[#77736b]">Phone</p>
              <p className="mt-1">{selectedCustomer.phone}</p>
            </div>

            <div className="border-b border-black/10 pb-3">
              <p className="text-[#77736b]">Total orders</p>
              <p className="mt-1">{selectedCustomer.orders}</p>
            </div>

            <div>
              <p className="text-[#77736b]">Total spent</p>
              <p className="mt-1 font-medium">
                ₦{selectedCustomer.totalSpent.toLocaleString("en-NG")}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSelectedCustomerId(null)}
            className="mt-7 w-full bg-[#171717] px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-white hover:bg-[#33312d]"
          >
            Close details
          </button>
        </div>
      </div>
    )}
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
            <p>Product catalogue connected to Supabase</p>
          </footer>
        </div>
      </div>
    </main>
  );
}

