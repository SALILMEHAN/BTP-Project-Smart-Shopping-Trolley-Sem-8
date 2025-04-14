export default function OrderSummary({ subtotal = 0, discount = 0 }) {
  // Ensure total doesn't go negative
  const total = Math.max(subtotal - discount, 0);

  // Format currency for better consistency
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  return (
    <div className="border border-gray-700 bg-gray-900 p-5 rounded-lg text-white shadow-md">
      <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
        Order Summary
      </h3>

      <div className="flex justify-between text-sm text-gray-300 mb-2">
        <span>Items Subtotal</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>

      {discount > 0 && (
        <div className="flex justify-between text-sm text-green-400 mb-2">
          <span>Discount</span>
          <span>- {formatCurrency(discount)}</span>
        </div>
      )}

      {/* Show message if the discount exceeds subtotal */}
      {discount > subtotal && (
        <div className="text-sm text-red-400 mb-2">
          The discount exceeds the subtotal, the total has been capped at ₹0.
        </div>
      )}

      <div className="flex justify-between text-base font-semibold text-white mt-4">
        <span>Estimated Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  );
}
