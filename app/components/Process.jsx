export default function Process() {
  const steps = [
    {
      step: "01",
      title: "Discover Properties",
      desc: "Explore handpicked, verified homes curated around your lifestyle and budget.",
    },
    {
      step: "02",
      title: "Visit & Evaluate",
      desc: "Schedule seamless site visits and understand every detail with expert guidance.",
    },
    {
      step: "03",
      title: "Secure with Confidence",
      desc: "From negotiation to paperwork, we handle everything transparently.",
    },
  ];

  return (
    <section className="py-20 bg-[#f8faf9]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="uppercase tracking-[0.25em] text-green-600 text-xs font-semibold">
            Our Process
          </p>

          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900">
            Simple. Transparent. Designed for You.
          </h2>

          <p className="mt-4 text-gray-600">
            A refined experience that removes complexity and keeps you in control at every step.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-14 grid md:grid-cols-3 gap-6 relative">

          {steps.map((s, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 transition duration-300"
            >
              <div className="text-5xl font-extrabold text-green-500/20 group-hover:text-green-500/40 transition">
                {s.step}
              </div>

              <h3 className="mt-4 text-xl font-bold text-gray-900">
                {s.title}
              </h3>

              <p className="mt-3 text-gray-600">
                {s.desc}
              </p>

              <div className="mt-6 h-[2px] w-8 bg-green-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </div>
          ))}

          {/* thin connecting line desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gray-200 -z-10" />
        </div>

      </div>
    </section>
  );
}
