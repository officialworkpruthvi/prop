"use client";
export default function Highlights() {
  const items = [
    {
      title: "Verified Listings",
      desc: "Every property is verified with updated pricing and legal checks.",
    },
    {
      title: "Zero Spam",
      desc: "No brokers calling endlessly. Only expert assistance when needed.",
    },
    {
      title: "Transparent Pricing",
      desc: "See real prices, not inflated marketing numbers.",
    },
    {
      title: "Expert Guidance",
      desc: "Get help from professionals, not pushy sales agents.",
    },
  ];

  return (
    <section className="-mt-20 relative z-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
          >
            <h3 className="font-semibold text-lg text-gray-900">
              {item.title}
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}