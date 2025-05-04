import { memo } from "react";
import Image from "next/image";

const CartItemCard = memo(
  ({ item }) => {
    return (
      <div className="flex gap-5 border-b border-gray-700 py-5">
        <Image
          src={item.imageUrl}
          alt={item.title}
          width={100}
          height={100}
          className="w-24 h-24 object-cover rounded-lg border border-gray-600"
          priority
        />
        <div className="flex-grow text-white">
          <h2 className="text-xl font-semibold">
            {item.title === "Meggi" ? "Maggi" : item.title}
          </h2>
          <div className="flex items-center justify-between mt-4">
            <p className="text-lg font-bold text-green-400">
              ₹{(item.price * item.stock).toFixed(2)}
            </p>
            <input
              type="number"
              value={item.stock} // Changed from defaultValue to value
              min="1"
              className="w-14 px-2 py-1 rounded-md bg-gray-800 border border-gray-600 text-white text-center focus:outline-none"
              readOnly // Changed from disabled to readOnly for better accessibility
            />
          </div>
        </div>
      </div>
    );
  },
  // Custom comparison function
  (prevProps, nextProps) => {
    return (
      prevProps.item.stock === nextProps.item.stock &&
      prevProps.item.price === nextProps.item.price &&
      prevProps.item.title === nextProps.item.title &&
      prevProps.item.imageUrl === nextProps.item.imageUrl
    );
  }
);

CartItemCard.displayName = "CartItemCard"; // For better devtools display

export default CartItemCard;
