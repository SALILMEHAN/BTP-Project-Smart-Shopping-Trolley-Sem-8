"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function TopBar() {
  const pathname = usePathname();
  const router = useRouter();

  // Don't show on home page
  if (pathname === "/") return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <button
            onClick={() => router.back()}
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
          <div className="flex space-x-4">
            <Link
              href="/about"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
