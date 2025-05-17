"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import VirtualKeyboard from "../../components/Keyboard";

export default function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const formRef = useRef(null);
  const router = useRouter();

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowKeyboard(false);

    // Simulate order placement delay
    setTimeout(() => {
      router.push("/success");
    }, 2000);
  };

  // Keyboard visibility control
  useEffect(() => {
    const handleFocus = () => setShowKeyboard(true);
    const handleBlur = () => setShowKeyboard(false);

    // Add email input specific handling
    const handleEmailFocus = (e) => {
      if (e.target.type === "email") {
        e.target.setAttribute("inputmode", "text");
      }
    };

    const form = formRef.current;
    if (form) {
      const inputs = form.querySelectorAll("input");
      inputs.forEach((input) => {
        input.addEventListener("focus", handleFocus);
        input.addEventListener("blur", handleBlur);
      });

      // Add email input listener
      form.addEventListener("focusin", handleEmailFocus);

      return () => {
        inputs.forEach((input) => {
          input.removeEventListener("focus", handleFocus);
          input.removeEventListener("blur", handleBlur);
        });
        form.removeEventListener("focusin", handleEmailFocus);
      };
    }
  }, []);

  return (
    <div className="relative">
      <form
        ref={formRef}
        className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-2">Shipping Details</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          required
          autoComplete="off"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          required
          autoComplete="off"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          required
          autoComplete="off"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          required
          autoComplete="off"
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={formData.postalCode}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          required
          autoComplete="off"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded text-white font-bold"
          disabled={isLoading}
        >
          {isLoading ? "Placing Order..." : "Place Order"}
        </button>
      </form>

      <VirtualKeyboard
        show={showKeyboard}
        onHide={() => setShowKeyboard(false)}
      />
    </div>
  );
}
