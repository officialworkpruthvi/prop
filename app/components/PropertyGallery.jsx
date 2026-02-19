"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PropertyGallery({ images = [] }) {
  const [index, setIndex] = useState(0);

  if (!images.length) return null;

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-3">
      {/* MAIN IMAGE */}
      <div className="relative rounded-[22px] overflow-hidden group">
        <img
          src={images[index]}
          className="w-full h-[260px] sm:h-[340px] lg:h-[420px] object-cover transition duration-500"
        />

        {/* LEFT ARROW */}
        {images.length > 1 && (
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* RIGHT ARROW */}
        {images.length > 1 && (
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>

      {/* THUMBNAILS */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setIndex(i)}
              className={`h-16 w-24 object-cover rounded-lg cursor-pointer border-2 transition 
                ${i === index ? "border-black" : "border-transparent opacity-70"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
