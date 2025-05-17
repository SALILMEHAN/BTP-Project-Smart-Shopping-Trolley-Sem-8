"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const [secondsLeft, setSecondsLeft] = useState(10);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      router.push("/");
    }, 10000);

    // ✅ Proper DELETE call to proxy
    const deletePurchase = async () => {
      try {
        const res = await fetch("/api/proxy2", {
          method: "DELETE",
        });

        if (!res.ok) {
          console.error("Delete failed:", await res.json());
        } else {
          console.log("Delete successful");
        }
      } catch (error) {
        console.error("Delete request error:", error);
      }
    };

    deletePurchase();

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center space-y-8">
      <h1 className="text-4xl font-bold">🎉 Order Placed Successfully!</h1>
      <p className="text-lg">Redirecting to Home in {secondsLeft} seconds...</p>

      {/* Ring loader */}
      <div className="relative w-24 h-24">
        <svg className="w-full h-full transform" viewBox="0 0 36 36">
          <path
            className="text-gray-700"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-green-500 transition-all duration-1000"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
            strokeDasharray="100"
            strokeDashoffset={`${(10 - secondsLeft) * 10}`}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
          {secondsLeft}s
        </div>
      </div>
    </div>
  );
}
