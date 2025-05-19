"use client";

import { useEffect, useState, useRef } from "react";
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
  const itemsRef = useRef(items);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    const handleCheckToSetTheItems = (fetchedItems) => {
      const currentItems = itemsRef.current;

      if (fetchedItems.length !== currentItems.length) return true;

      const currentItemsMap = new Map(
        currentItems.map((item) => [item.id, item.stock])
      );

      return fetchedItems.some(
        (item) => currentItemsMap.get(item.id) !== item.stock
      );
    };

    const fetchItems = async () => {
      try {
        const res = await fetch(`/api/proxy?t=${Date.now()}`);
        const data = await res.json();

        if (handleCheckToSetTheItems(data.body)) {
          setItems((prev) => {
            const newItems = data.body;

            // Create new array with updated item references
            return newItems.map((newItem, index) => {
              const oldItem = prev[index];
              // Only create new object if stock changed
              return oldItem && oldItem.stock === newItem.stock
                ? oldItem
                : { ...newItem };
            });
          });
          setShow(data.body.length > 0);
        }
      } catch (error) {
        console.error("Failed to fetch items:", error);
      } finally {
        if (!mounted) setMounted(true);
      }
    };

    fetchItems();
    const intervalId = setInterval(fetchItems, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.stock,
    0
  );
  const discountAmount = (subtotal * discountPercent) / 100;

  if (!mounted) return null;

  return (
    <>
      <Bar />
      <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 bg-[#0f172a] sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-2xl font-bold mb-6">My Shopping Cart</h1>

        <div className="grid md:grid-cols-3 gap-6 w-full">
          <div className="md:col-span-2 space-y-4 relative">
            {items.length > 0 ? (
              items.map((item) => {
                const uniqueKey = item.id
                  ? `${item.id}-${item.stock}`
                  : `${item.title}-${item.stock}-${Math.random()
                      .toString(36)
                      .substr(2, 9)}`;

                return <CartItemCard key={uniqueKey} item={item} />;
              })
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
                onClick={() => router.push("/checkout-choice")}
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
