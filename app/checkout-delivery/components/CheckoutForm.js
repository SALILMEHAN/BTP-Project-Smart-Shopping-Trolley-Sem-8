"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate order placement delay
    setTimeout(() => {
      router.push("/success");
    }, 2000); // 2 seconds loader
  };

  return (
    <form
      className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold mb-2">Shipping Details</h2>

      <input
        type="text"
        placeholder="Full Name"
        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
        required
      />
      <input
        type="email"
        placeholder="Email Address"
        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
        required
      />
      <input
        type="text"
        placeholder="Address"
        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
        required
      />
      <input
        type="text"
        placeholder="City"
        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
        required
      />
      <input
        type="text"
        placeholder="Postal Code"
        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded text-white font-bold"
        disabled={isLoading}
      >
        {isLoading ? "Placing Order..." : "Place Order"}
      </button>
    </form>
  );
}
