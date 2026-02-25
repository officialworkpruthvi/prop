"use client";

export default function Header() {
  return (
    <header className="w-full bg-white border-b z-20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="font-bold text-xl tracking-wide text-gray-900">
          Matrubhumie
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="hidden sm:block px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition">
            Sell Property
          </button>

          <button className="px-4 py-2 rounded-full text-sm font-semibold bg-green-600 text-white hover:opacity-90 transition">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}
