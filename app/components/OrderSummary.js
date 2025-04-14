export default function OrderSummary({ subtotal }) {
  return (
    <div className="border border-gray-700 bg-gray-900 p-5 rounded-lg text-white shadow-md">
      <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
        Order Summary
      </h3>

      <div className="flex justify-between text-sm text-gray-300 mb-2">
        <span>Item Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-base font-semibold text-white mt-4">
        <span>Estimated Total</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>
    </div>
  );
}
