"use client";

import { useEffect, useState } from "react";
import CheckoutForm from "@/app/checkout-takeaway/components/CheckoutForm";
import OrderSummary from "@/app/components/OrderSummary";
import usePromoStore from "@/app/store/usePromoStore";

export default function CheckoutPage() {
  const [items, setItems] = useState([]);
  const [mounted, setMounted] = useState(false);
  const { discountPercent } = usePromoStore();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/proxy");
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

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.stock,
    0
  );

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center">Checkout</h1>
        <OrderSummary
          subtotal={subtotal}
          discount={subtotal > 0 ? (subtotal * discountPercent) / 100 : 0}
        />
        <CheckoutForm />
      </div>
    </div>
  );
}
