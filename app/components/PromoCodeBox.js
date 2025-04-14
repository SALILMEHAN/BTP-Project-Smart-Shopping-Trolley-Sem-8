import { useState } from "react";
import usePromoStore from "@/app/store/usePromoStore";

export default function PromoCodeBox() {
  const [code, setCode] = useState("");
  const { applyPromo, promoCode, discountPercent } = usePromoStore();

  const handleApply = () => {
    applyPromo(code.trim().toUpperCase());
  };

  return (
    <div className="mt-6 flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Enter Promo Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-grow px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleApply}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md transition"
        >
          APPLY
        </button>
      </div>

      {promoCode && (
        <p className="text-green-400 text-sm">
          ✅ Promo code <strong>{promoCode}</strong> applied ({discountPercent}%
          off)
        </p>
      )}
    </div>
  );
}
