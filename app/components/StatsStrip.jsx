"use client";
export default function StatsStrip() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          
          <Stat number="12K+" label="Happy Buyers" />
          <Stat number="350+" label="Premium Properties" />
          <Stat number="8+" label="Years Experience" />
          <Stat number="24/7" label="Expert Support" />

        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }) {
  return (
    <div className="group">
      <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 group-hover:text-green-600 transition">
        {number}
      </h3>
      <p className="mt-3 text-gray-500 font-medium">{label}</p>
    </div>
  );
}