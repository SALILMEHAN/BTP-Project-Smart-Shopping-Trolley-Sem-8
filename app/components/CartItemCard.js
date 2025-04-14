export default function CartItemCard({ item }) {
  return (
    <div className="flex gap-5 border-b border-gray-700 py-5">
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-24 h-24 object-cover rounded-lg border border-gray-600"
      />
      <div className="flex-grow text-white">
        <h2 className="text-xl font-semibold">
          {item.title == "Meggi" ? "Maggi" : item.title}
        </h2>
        <div className="flex items-center justify-between mt-4">
          <p className="text-lg font-bold text-green-400">
            ₹{item.price.toFixed(2)}
          </p>
          <input
            type="number"
            defaultValue={item.stock}
            min="1"
            className="w-14 px-2 py-1 rounded-md bg-gray-800 border border-gray-600 text-white text-center focus:outline-none"
            disabled
          />
        </div>
      </div>
    </div>
  );
}
