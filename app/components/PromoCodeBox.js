export default function PromoCodeBox() {
  return (
    <div className="mt-6 flex items-center gap-3">
      <input
        type="text"
        placeholder="Enter Promo Code"
        className="flex-grow px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md transition">
        APPLY
      </button>
    </div>
  );
}
