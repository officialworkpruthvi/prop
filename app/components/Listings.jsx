"use client";
import Image from "next/image";

const listings = [
  {
    title: "Skyline Residences",
    location: "Bandra, Mumbai",
    price: "₹4.2 Cr",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    title: "Palm Grove Villas",
    location: "Whitefield, Bangalore",
    price: "₹3.6 Cr",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  },
  {
    title: "Oceanfront Heights",
    location: "Juhu, Mumbai",
    price: "₹6.8 Cr",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
  },
];

export default function Listings() {
  return (
    <section className="py-20 bg-[#0e0f0f] text-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-2xl">
          <p className="uppercase tracking-widest text-green-400 text-sm">
            Curated Listings
          </p>
          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight">
            Homes That Define Your Lifestyle
          </h2>
          <p className="mt-4 text-white/70">
            Handpicked premium properties in prime locations.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {listings.map((item, i) => (
            <div
              key={i}
              className="group rounded-3xl overflow-hidden bg-[#161717] hover:-translate-y-1 transition duration-300"
            >
              {/* Image */}
              <div className="relative h-[240px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-white/60 mt-1">{item.location}</p>

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-green-400 font-semibold">
                    {item.price}
                  </span>
                  <button className="text-sm text-white/80 group-hover:text-white">
                    View →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="px-8 py-3 bg-green-500 text-black rounded-full font-semibold hover:scale-105 transition">
            View All Listings
          </button>
        </div>

      </div>
    </section>
  );
}
