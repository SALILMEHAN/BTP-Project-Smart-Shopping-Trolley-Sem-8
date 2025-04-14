import { create } from "zustand";

const usePromoStore = create((set) => ({
  promoCode: "",
  discountPercent: 0,

  applyPromo: (code) => {
    const upperCode = code.toUpperCase();
    if (upperCode === "GET50") {
      set({ promoCode: upperCode, discountPercent: 50 });
    } else {
      set({ promoCode: "", discountPercent: 0 });
    }
  },
}));

export default usePromoStore;
