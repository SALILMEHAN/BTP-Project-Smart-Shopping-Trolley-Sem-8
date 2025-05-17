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
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit}>
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
