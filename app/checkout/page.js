"use client";

import CheckoutForm from "@/app/checkout/components/CheckoutForm";
import OrderSummary from "@/app/components/OrderSummary";

export default function CheckoutPage() {
  const subtotal = 149.99;

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4 md:px-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <CheckoutForm />
        <OrderSummary subtotal={subtotal} />
      </div>
    </div>
  );
}
