import { useState, useRef, useEffect } from "react";
import usePromoStore from "@/app/store/usePromoStore";
import VirtualKeyboard from "./Keyboard";

export default function PromoCodeBox({ show }) {
  const [code, setCode] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const inputRef = useRef(null);
  const { applyPromo, promoCode, discountPercent } = usePromoStore();

  const handleApply = () => {
    applyPromo(code.trim().toUpperCase());
    setShowKeyboard(false);
  };

  useEffect(() => {
    const handleFocus = () => setShowKeyboard(true);
    const input = inputRef.current;

    if (input) {
      input.addEventListener("focus", handleFocus);
      return () => input.removeEventListener("focus", handleFocus);
    }
  }, []);

  return (
    <div className="mt-6 flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="text"
          placeholder="ENTER PROMO CODE"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="flex-grow px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
          onBlur={() => setShowKeyboard(false)}
          autoComplete="off"
          spellCheck="false"
        />
        <button
          onClick={handleApply}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md transition"
        >
          APPLY
        </button>
      </div>

      <VirtualKeyboard
        show={showKeyboard}
        onHide={() => setShowKeyboard(false)}
      />

      {show && promoCode && (
        <p className="text-green-400 text-sm">
          ✅ Promo code <strong>{promoCode}</strong> applied ({discountPercent}%
          off)
        </p>
      )}
    </div>
  );
}
