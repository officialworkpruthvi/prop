"use client";

export default function WhyUs() {
  const items = [
    {
      title: "Curated, Not Crowded",
      desc: "Every property is handpicked. No mass listings. Only homes worth your time.",
    },
    {
      title: "Location Intelligence",
      desc: "Growth corridors, livability scores and future infrastructure — analyzed before we recommend.",
    },
    {
      title: "White-Glove Experience",
      desc: "From first visit to final paperwork, everything feels seamless and personal.",
    },
  ];

  return (
    <section className="relative py-28 bg-[#0e1111] text-white overflow-hidden">

      {/* LIGHT GRADIENT BACKGROUND (fast) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,142,74,0.15),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(56,142,74,0.12),transparent_40%)]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* INTRO */}
        <div className="max-w-3xl fadeUp">
          <p className="uppercase tracking-[0.25em] text-[#49b265] text-sm font-medium">
            Why Choose Us
          </p>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
            Real Estate <br />
            <span className="text-white/70">Designed Around You</span>
          </h2>

          <p className="mt-6 text-lg text-white/60 leading-relaxed">
            Anyone can list a property. We go deeper — understanding
            neighborhoods, future value and how a home should feel.
          </p>
        </div>

        {/* CARDS */}
        <div className="mt-20 grid md:grid-cols-3 gap-10">
          {items.map((item, i) => (
            <div
              key={i}
              className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#49b265]/40 transition-all duration-300 fadeUp"
            >
              <div className="text-5xl font-extrabold text-white/10">
                0{i + 1}
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-4 text-white/60 leading-relaxed">
                {item.desc}
              </p>

              <div className="mt-6 h-[2px] w-10 bg-[#49b265] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 text-center fadeUp">
          <p className="text-2xl md:text-3xl font-semibold leading-snug">
            We don’t chase volume. <br />
            <span className="text-[#49b265]">We build long-term value.</span>
          </p>

          <button className="mt-10 px-8 py-4 rounded-full bg-[#49b265] text-black font-semibold hover:scale-105 transition-transform">
            Talk to an Expert
          </button>
        </div>
      </div>
    </section>
  );
}
