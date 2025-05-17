// "use client";

// import { useState, useRef, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import VirtualKeyboard from "../../components/Keyboard";

// export default function CheckoutForm() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [showKeyboard, setShowKeyboard] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     address: "",
//     city: "",
//     postalCode: "",
//   });
//   const formRef = useRef(null);
//   const router = useRouter();

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle main form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setShowModal(true);
//   };

//   // Handle password submission
//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     setTimeout(() => {
//       if (password === process.env.ORDER_PASSWORD) {
//         router.push("/success");
//         setShowModal(false);
//       } else {
//         setError("Wrong password. Please try again.");
//         setIsLoading(false);
//       }
//     }, 1000);
//   };

//   // Keyboard visibility control (keep original implementation)
//   useEffect(() => {
//     const handleFocus = () => setShowKeyboard(true);
//     const handleBlur = () => setShowKeyboard(false);
//     const handleEmailFocus = (e) => {
//       if (e.target.type === "email") {
//         e.target.setAttribute("inputmode", "text");
//       }
//     };

//     const form = formRef.current;
//     if (form) {
//       const inputs = form.querySelectorAll("input");
//       inputs.forEach((input) => {
//         input.addEventListener("focus", handleFocus);
//         input.addEventListener("blur", handleBlur);
//       });

//       form.addEventListener("focusin", handleEmailFocus);

//       return () => {
//         inputs.forEach((input) => {
//           input.removeEventListener("focus", handleFocus);
//           input.removeEventListener("blur", handleBlur);
//         });
//         form.removeEventListener("focusin", handleEmailFocus);
//       };
//     }
//   }, []);

//   return (
//     <div className="relative">
//       {/* Original form remains unchanged */}
//       <form
//         ref={formRef}
//         className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4"
//         onSubmit={handleSubmit}
//       >
//         {/* Keep all original form elements */}
//         <h2 className="text-xl font-semibold mb-2">Shipping Details</h2>

//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={formData.name}
//           onChange={handleInputChange}
//           className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
//           required
//           autoComplete="off"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email Address"
//           value={formData.email}
//           onChange={handleInputChange}
//           className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
//           required
//           autoComplete="off"
//         />
//         <input
//           type="text"
//           name="address"
//           placeholder="Address"
//           value={formData.address}
//           onChange={handleInputChange}
//           className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
//           required
//           autoComplete="off"
//         />
//         <input
//           type="text"
//           name="city"
//           placeholder="City"
//           value={formData.city}
//           onChange={handleInputChange}
//           className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
//           required
//           autoComplete="off"
//         />
//         <input
//           type="text"
//           name="postalCode"
//           placeholder="Postal Code"
//           value={formData.postalCode}
//           onChange={handleInputChange}
//           className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
//           required
//           autoComplete="off"
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded text-white font-bold"
//           disabled={isLoading}
//         >
//           {isLoading ? "Processing..." : "Place Order"}
//         </button>
//       </form>

//       {/* Add password modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
//           <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
//             <h3 className="text-xl font-semibold mb-4 text-white">
//               Verify Password
//             </h3>
//             <form onSubmit={handlePasswordSubmit}>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white mb-4"
//                 placeholder="Enter password"
//                 required
//               />
//               {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="px-4 py-2 text-gray-300 hover:bg-gray-700 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-600"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? "Verifying..." : "Submit"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <VirtualKeyboard
//         show={showKeyboard}
//         onHide={() => setShowKeyboard(false)}
//       />
//     </div>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import VirtualKeyboard from "../../components/Keyboard";

export default function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const formRef = useRef(null);
  const router = useRouter();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (password === process.env.ORDER_PASSWORD) {
        router.push("/success");
        setShowModal(false);
      } else {
        setError("Wrong password. Please try again.");
        setIsLoading(false);
      }
    }, 1000);
  };

  useEffect(() => {
    const handleFocus = () => setShowKeyboard(true);
    const handleBlur = () => setShowKeyboard(false);
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
          {isLoading ? "Processing..." : "Place Order"}
        </button>
      </form>

      {/* Password Verification Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-800/80 backdrop-blur-lg border border-white/10 rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-semibold mb-4 text-white/90 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Verify Password
            </h3>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white/90
                         placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30
                         transition-all"
                placeholder="Enter password"
                required
              />
              {error && (
                <p className="text-red-300/90 text-sm mt-2 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </p>
              )}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 
                           border border-white/20 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-white bg-blue-600/90 hover:bg-blue-700/90 
                           border border-blue-400/50 rounded-lg font-medium disabled:opacity-50
                           transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <VirtualKeyboard
        show={showKeyboard}
        onHide={() => setShowKeyboard(false)}
      />
    </div>
  );
}
