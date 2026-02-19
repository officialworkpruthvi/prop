"use client";

export default function Blogs() {
  const blogs = [
    {
      title: "Best Areas to Buy Property in Pune (2025)",
      tag: "Market Trends",
    },
    {
      title: "How to Avoid Overpriced Real Estate Projects",
      tag: "Buying Guide",
    },
    {
      title: "Step-by-Step Guide for First-Time Home Buyers",
      tag: "Beginner",
    },
  ];

  return (
    <section className="py-24 bg-[#f6f7f8]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="max-w-2xl fadeUp">
          <p className="uppercase tracking-[0.25em] text-[#388e4a] text-sm font-medium">
            Knowledge Center
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Insights & Resources
          </h2>

          <p className="mt-4 text-gray-600">
            Expert guides, market trends and practical advice for smart property decisions.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {blogs.map((blog, i) => (
            <article
              key={i}
              className="group bg-white border border-gray-200 rounded-2xl p-7 hover:border-[#388e4a]/40 transition-colors duration-300 fadeUp"
            >
              {/* Image Placeholder */}
              <div className="h-40 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200" />

              {/* Tag */}
              <span className="inline-block mt-6 text-xs font-semibold text-[#388e4a] bg-[#388e4a]/10 px-3 py-1 rounded-full">
                {blog.tag}
              </span>

              {/* Title */}
              <h3 className="mt-4 font-semibold text-lg text-gray-900 leading-snug group-hover:text-[#388e4a] transition-colors">
                {blog.title}
              </h3>

              {/* CTA */}
              <p className="mt-4 text-sm text-gray-500">
                Read article →
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
