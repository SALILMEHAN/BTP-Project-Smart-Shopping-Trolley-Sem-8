"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CartItemCard from "@/app/components/CartItemCard";
import OrderSummary from "@/app/components/OrderSummary";
import PromoCodeBox from "@/app/components/PromoCodeBox";
import HelpSection from "@/app/components/HelpSection";
import AdBanner from "@/app/components/AdBanner";
import Bar from "./components/Bar";
import usePromoStore from "./store/usePromoStore";

export default function Home() {
  const [items, setItems] = useState([]);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { discountPercent } = usePromoStore();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/proxy");
        const data = await res.json();
        setItems(data.body);
        setMounted(true);
      } catch (error) {
        console.error("Failed to fetch items:", error);
        setMounted(true);
      }
    };

    fetchItems();
  }, []);

  const subtotal = Array.isArray(items)
    ? items.reduce((acc, item) => acc + item.price * item.stock, 0)
    : 0;

  const discountAmount = (subtotal * discountPercent) / 100;

  if (!mounted) return null;

  return (
    <>
      <Bar />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-2xl font-bold mb-6">My Shopping Cart</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {items.length > 0 ? (
              items.map((item, index) => (
                <CartItemCard key={index} item={item} />
              ))
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}
            {items.length > 0 && (
              <button
                className="bg-red-500 text-white px-6 py-2 mt-4 rounded"
                onClick={() => router.push("/checkout")}
              >
                CHECKOUT
              </button>
            )}
          </div>

          <div>
            <OrderSummary subtotal={subtotal} discount={discountAmount} />
            <PromoCodeBox />
            <AdBanner />
            <HelpSection />
          </div>
        </div>
      </div>
    </>
  );
}
