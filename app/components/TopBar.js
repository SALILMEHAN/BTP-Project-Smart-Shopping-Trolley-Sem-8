"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function TopBar() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/") return null;

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      // Fallback for direct access or no history
      router.push("/");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-900 border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 -ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-medium">Back</span>
          </button>

          <div className="flex space-x-6">
            {/* <Link
              href="/"
              className="text-gray-400 hover:text-white font-medium px-3 py-1 rounded-lg transition-colors duration-200"
            >
              Home
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
