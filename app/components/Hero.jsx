"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-x-clip">
      
      {/* Optimized Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1560185127-6ed189bf02f4"
        alt="Luxury home"
        fill
        priority
        quality={70}
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 md:pt-40">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
          Real Estate. <br /> Simplified.
        </h1>

        <p className="mt-6 max-w-xl text-base md:text-lg text-gray-200">
          Buy, sell & discover verified properties with complete transparency
        </p>

        {/* Premium Search Bar */}
        <div className="mt-10 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-3 md:p-4 flex flex-col md:flex-row gap-3 max-w-4xl border border-white/40">
          
          <input
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-green-600 outline-none transition"
            placeholder="City or locality (e.g. Wakad, Pune)"
          />

          <input
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-green-600 outline-none transition"
            placeholder="Budget or BHK"
          />

          <button className="px-8 py-3 rounded-xl bg-green-600 hover:bg-green-700 active:scale-95 transition text-white font-semibold shadow-md">
            Search
          </button>
        </div>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-white rounded-t-[60px]" />
    </section>
  );
}
