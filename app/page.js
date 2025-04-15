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
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/proxy");
        const data = await res.json();
        setItems(data.body);
        setShow(data.body.length > 0);
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
      <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-2xl font-bold mb-6">My Shopping Cart</h1>

        <div className="grid md:grid-cols-3 gap-6 w-full">
          <div className="md:col-span-2 space-y-4 relative">
            {items.length > 0 ? (
              items.map((item, index) => (
                <CartItemCard key={index} item={item} />
              ))
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm z-50">
                <p className="text-2xl text-white font-semibold">
                  🛒 Your cart is empty.
                </p>
              </div>
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
            <PromoCodeBox show={show} />
            <AdBanner />
            <HelpSection />
          </div>
        </div>
      </div>
    </>
  );
}
