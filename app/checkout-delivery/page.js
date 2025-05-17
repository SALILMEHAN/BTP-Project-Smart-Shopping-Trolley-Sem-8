"use client";

import { useEffect, useState } from "react";
import CheckoutForm from "@/app/checkout-delivery/components/CheckoutForm";
import OrderSummary from "@/app/components/OrderSummary";
import usePromoStore from "@/app/store/usePromoStore";

export default function CheckoutPage() {
  const [items, setItems] = useState([]);
  const [mounted, setMounted] = useState(false);
  const { discountPercent } = usePromoStore();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/proxy"); // Or wherever you're fetching cart data
        const data = await res.json();
        setItems(data.body);
        setMounted(true);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
        setMounted(true);
      }
    };

    fetchItems();
  }, []);

  // Calculate subtotal from items
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.stock,
    0
  );

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4 md:px-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <CheckoutForm />
        <OrderSummary
          subtotal={subtotal}
          discount={subtotal > 0 ? (subtotal * discountPercent) / 100 : 0}
        />
      </div>
    </div>
  );
}
