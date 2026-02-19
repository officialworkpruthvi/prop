"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function PropertyGallery({ images = [] }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  if (!images.length) return null;

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <>
      <div className="space-y-3">
        {/* MAIN IMAGE */}
        <div className="relative rounded-[22px] overflow-hidden group cursor-zoom-in">
          <img
            src={images[index]}
            onClick={() => setOpen(true)}
            className="w-full h-[260px] sm:h-[340px] lg:h-[420px] object-cover transition"
          />

          {images.length > 1 && (
            <>
              <ArrowSmall left onClick={prev} />
              <ArrowSmall onClick={next} />
            </>
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

      {/* FULLSCREEN LIGHTBOX */}
      {open && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">

          {/* CLOSE */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-5 right-5 text-white"
          >
            <X size={32} />
          </button>

          {/* BIG IMAGE */}
          <img
            src={images[index]}
            className="max-h-[90vh] max-w-[92vw] object-contain rounded-xl"
          />

          {images.length > 1 && (
            <>
              <ArrowBig left onClick={prev} />
              <ArrowBig onClick={next} />
            </>
          )}
        </div>
      )}
    </>
  );
}

/* SMALL ARROWS */
function ArrowSmall({ left, ...props }) {
  return (
    <button
      {...props}
      className={`absolute top-1/2 -translate-y-1/2 
      ${left ? "left-3" : "right-3"}
      bg-white/90 hover:bg-white backdrop-blur p-2 rounded-full 
      opacity-0 group-hover:opacity-100 transition`}
    >
      {left ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
    </button>
  );
}

/* FULLSCREEN ARROWS */
function ArrowBig({ left, ...props }) {
  return (
    <button
      {...props}
      className={`absolute top-1/2 -translate-y-1/2 
      ${left ? "left-6" : "right-6"} text-white`}
    >
      {left ? <ChevronLeft size={48} /> : <ChevronRight size={48} />}
    </button>
  );
}
