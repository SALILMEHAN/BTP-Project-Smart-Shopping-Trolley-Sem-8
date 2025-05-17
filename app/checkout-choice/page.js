"use client";
import { useRouter } from "next/navigation";

export default function OrderOption() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Takeaway Card */}
        <div
          className="group relative w-72 h-48 bg-[#1e293b] rounded-2xl shadow-lg hover:shadow-blue-500/30 transform transition-all duration-300 hover:scale-105 cursor-pointer"
          onClick={() => router.push("/checkout-takeaway")}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-0 group-hover:opacity-20 rounded-2xl transition duration-300"></div>
          <div className="flex flex-col justify-center items-center h-full text-white z-10 relative">
            <h2 className="text-2xl font-semibold">Takeaway</h2>
            <p className="mt-2 text-sm text-gray-300">
              Pick up your order from the store
            </p>
          </div>
        </div>

        {/* Deliver to the Home Card */}
        <div
          className="group relative w-72 h-48 bg-[#1e293b] rounded-2xl shadow-lg hover:shadow-blue-500/30 transform transition-all duration-300 hover:scale-105 cursor-pointer"
          onClick={() => router.push("/checkout-delivery")}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-0 group-hover:opacity-20 rounded-2xl transition duration-300"></div>
          <div className="flex flex-col justify-center items-center h-full text-white z-10 relative">
            <h2 className="text-2xl font-semibold">Deliver to Home</h2>
            <p className="mt-2 text-sm text-gray-300">
              We&apos;ll deliver to your doorstep
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
