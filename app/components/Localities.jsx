export default function Localities() {
  const places = [
    { name: "Baner", price: "₹15,300 / sq.ft" },
    { name: "Wakad", price: "₹9,800 / sq.ft" },
    { name: "Hinjewadi", price: "₹8,600 / sq.ft" },
    { name: "Kharadi", price: "₹10,900 / sq.ft" },
  ];

  return (
    <section className="py-24 bg-[#f5f7f6]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f1720]">
              Explore by Localities
            </h2>
            <p className="mt-4 text-gray-600">
              Discover price trends across Pune’s fastest growing areas
            </p>
          </div>

          <input
            placeholder="Search locality"
            className="px-5 py-3 rounded-xl border border-gray-300 bg-white 
                       w-full md:w-80 outline-none focus:border-black transition"
          />
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {places.map((p, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl p-6 
                         hover:border-gray-400 transition duration-300"
            >
              <div className="h-32 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 mb-5" />

              <h3 className="text-xl font-semibold text-[#0f1720]">
                {p.name}
              </h3>

              <p className="mt-2 text-[#388e4a] font-medium">
                {p.price}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
