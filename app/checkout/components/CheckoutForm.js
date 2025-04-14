export default function CheckoutForm() {
  return (
    <form className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
      <h2 className="text-xl font-semibold mb-2">Shipping Details</h2>

      <input
        type="text"
        placeholder="Full Name"
        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
        required
      />
      <input
        type="email"
        placeholder="Email Address"
        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
        required
      />
      <input
        type="text"
        placeholder="Address"
        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
        required
      />
      <input
        type="text"
        placeholder="City"
        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
        required
      />
      <input
        type="text"
        placeholder="Postal Code"
        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded text-white font-bold"
      >
        Place Order
      </button>
    </form>
  );
}
