export default function CompareCTA() {
  return (
    <section className="py-28 bg-[#f5f7f6]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="relative overflow-hidden rounded-[40px] bg-[#0f1720] px-8 py-16 md:px-16 md:py-20">

          {/* subtle luxury gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />

          {/* subtle radial glow */}
          <div className="absolute -top-32 -right-32 w-[420px] h-[420px] bg-emerald-500/10 rounded-full blur-[120px]" />

          <div className="relative flex flex-col md:flex-row items-center gap-16">

            {/* Image block */}
            <div className="relative">
              <div className="absolute inset-0 bg-black/40 blur-2xl scale-110 rounded-[28px]" />
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2"
                alt="compare"
                loading="lazy"
                className="relative w-72 md:w-80 rounded-[26px] shadow-2xl"
              />
            </div>

            {/* Text content */}
            <div className="max-w-xl text-center md:text-left">

              <span className="inline-block mb-6 text-sm tracking-[0.2em] uppercase text-[#388e4a] font-semibold">
                Smart Comparison Engine
              </span>

              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
                Compare Properties  
                <br /> Side-by-Side
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-[#388e4a]">
                Instantly evaluate pricing, amenities, location insights
                and investment potential — all in one clean view.
              </p>

              <button className="mt-10 bg-white text-black px-9 py-4 rounded-full 
                                 font-semibold text-lg shadow-md 
                                 hover:-translate-y-1 hover:shadow-xl 
                                 transition duration-300">
                Explore Comparisons →
              </button>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
