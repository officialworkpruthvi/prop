"use client";
import { useState } from "react";

export default function LayoutPlans({ unitPlans = [], floorPlans = [] }) {
  const [tab, setTab] = useState("unit");

  const activeImages = tab === "unit" ? unitPlans : floorPlans;
  const hasImages = Array.isArray(activeImages) && activeImages.length > 0;


  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-3">
        <TabBtn active={tab === "unit"} onClick={() => setTab("unit")}>
          Unit Plan
        </TabBtn>
        <TabBtn active={tab === "floor"} onClick={() => setTab("floor")}>
          Floor Plan
        </TabBtn>
      </div>

      {/* Content */}
      <div className="relative bg-gray-100 rounded-2xl p-4 sm:p-6">
        {hasImages ? (
          <Slider images={activeImages} />
        ) : (
          <RequestPlan type={tab} />
        )}
      </div>
    </div>
  );
}

/* ---------- Tabs ---------- */

function TabBtn({ children, active, ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-full text-sm font-medium transition
      ${active
        ? "bg-green-600 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
    >
      {children}
    </button>
  );
}

/* ---------- Slider ---------- */

function Slider({ images }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const prev = () =>
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <>
      {/* SMALL VIEW (no white space, fully fitted) */}
      <div className="relative group cursor-zoom-in">
        <img
          src={images[index]}
          alt="plan"
          onClick={() => setOpen(true)}
          className="w-full h-[260px] sm:h-[340px] lg:h-[420px] object-cover rounded-xl"
        />

        {images.length > 1 && (
          <>
            <NavArrow dir="left" onClick={prev} />
            <NavArrow dir="right" onClick={next} />
          </>
        )}
      </div>

      {/* FULLSCREEN LIGHTBOX */}
      {open && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          
          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-5 right-5 text-white text-3xl"
          >
            ✕
          </button>

          {/* Big Image */}
          <img
            src={images[index]}
            alt="plan"
            className="max-h-[90vh] max-w-[92vw] object-contain rounded-xl"
          />

          {/* Arrows */}
          {images.length > 1 && (
            <>
              <BigArrow dir="left" onClick={prev} />
              <BigArrow dir="right" onClick={next} />
            </>
          )}
        </div>
      )}
    </>
  );
}
function NavArrow({ dir, ...props }) {
  return (
    <button
      {...props}
      className={`absolute top-1/2 -translate-y-1/2 
      ${dir === "left" ? "left-2" : "right-2"}
      opacity-0 group-hover:opacity-100 transition
      bg-white/90 hover:bg-white shadow rounded-full w-9 h-9`}
    >
      {dir === "left" ? "‹" : "›"}
    </button>
  );
}

function BigArrow({ dir, ...props }) {
  return (
    <button
      {...props}
      className={`absolute top-1/2 -translate-y-1/2 
      ${dir === "left" ? "left-6" : "right-6"}
      text-white text-5xl px-4`}
    >
      {dir === "left" ? "‹" : "›"}
    </button>
  );
}

/* ---------- Request CTA ---------- */

function RequestPlan({ type }) {
  const label = type === "unit" ? "Unit Plan" : "Floor Plan";

  return (
    <div className="h-[260px] sm:h-[340px] lg:h-[420px] flex flex-col items-center justify-center text-center">
      <p className="text-gray-500 mb-4">
        {label} not available yet
      </p>

      <a
        href="https://wa.me/919999999999?text=Hi, I want the property brochure"
        target="_blank"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium"
      >
        Request {label}
      </a>
    </div>
  );
}
