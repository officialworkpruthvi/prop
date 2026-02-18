"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useParams } from "next/navigation";
import Header from "@/components/Header";

function Sections({ listing }: any) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT - Section Content */}
        <div className="lg:col-span-2 space-y-28">

          {/* LAYOUT */}
          <Section id="layout" title="Layout Plans">
            <ImageGrid images={listing.floorPlanImages} />
          </Section>

          {/* DETAILS */}
          <Section id="details" title="Property Details">
            <ul className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <li><strong>Developer:</strong> {listing.developerName}</li>
              <li><strong>Project Area:</strong> {listing.projectArea}</li>
              <li><strong>Total Units:</strong> {listing.totalUnits}</li>
              <li><strong>Status:</strong> {listing.status}</li>
              <li><strong>RERA:</strong> {listing.reraId}</li>
              <li><strong>Possession:</strong> {listing.possessionDate}</li>
            </ul>
          </Section>

          {/* CONFIGURATIONS */}
          <Section id="highlights" title="Configurations">
            <div className="grid md:grid-cols-3 gap-6">
              {listing.configurations?.map((c: any, i: number) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl border hover:shadow-md transition"
                >
                  <div className="text-lg font-medium">{c.type}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {c.carpetArea}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* AMENITIES */}
          <Section id="amenities" title="Amenities">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {listing.amenities?.map((a: string) => (
                <div
                  key={a}
                  className="bg-white text-sm px-4 py-3 rounded-xl border text-gray-700"
                >
                  {a}
                </div>
              ))}
            </div>
          </Section>

          {/* LOCATION */}
          <Section id="location" title="Location">
            <iframe
              src={listing.mapLink}
              className="w-full h-[420px] rounded-2xl border"
              loading="lazy"
            />
          </Section>

          {/* DEVELOPER */}
          <Section id="developer" title="About Developer">
            <p className="text-gray-600 max-w-3xl">
              {listing.developerName} is a reputed real estate developer known
              for timely delivery, premium construction quality, and thoughtful design.
            </p>
          </Section>

        </div>

        {/* RIGHT - Sticky Form */}
        <div className="hidden lg:block">
          <StickyForm />
        </div>

      </div>

      {/* Mobile Form */}
      <div className="lg:hidden mt-10">
        <StickyForm />
      </div>
    </div>
  );
}

function StickyForm() {
  return (
    <div className="sticky top-24 bg-white p-6 rounded-2xl border shadow-md space-y-4">
      <h3 className="text-lg font-semibold">Get a call back from our expert</h3>
      <input
        type="text"
        placeholder="Name"
        className="w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
      />
      <input
        type="email"
        placeholder="Email (optional)"
        className="w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        className="w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
      />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" className="w-4 h-4" />
        I agree to the <a href="#" className="text-green-600 underline">terms and conditions</a>
      </label>
      <button className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition">
        ENQUIRE NOW
      </button>
    </div>
  );
}


export default function PropertyPage() {
  const { slug } = useParams();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchListing = async () => {
      const ref = doc(db, "listings", slug as string);
      const snap = await getDoc(ref);

      if (snap.exists()) setListing(snap.data());
      setLoading(false);
    };

    fetchListing();
  }, [slug]);

  if (loading) return <div className="p-16 text-center">Loading property…</div>;
  if (!listing) return <div className="p-16 text-center">Property not found</div>;

  return (
    <main className="bg-neutral-50">
      <Header />
      <Hero listing={listing} />
      <SectionNav />
      <Sections listing={listing} />
      <FinalCTA />
    </main>
  );
}
import React from "react";

type HeroProps = {
  listing: any;
};

const Hero: React.FC<HeroProps> = ({ listing }) => {
  const amenities: string[] = Array.isArray(listing?.amenities)
    ? listing.amenities
    : typeof listing?.amenities === "string"
    ? listing.amenities.split(",")
    : [];

  return (
    <section className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-10 lg:py-14 grid lg:grid-cols-3 gap-8 items-start">

        {/* LEFT - PROPERTY IMAGE / GALLERY */}
        <div className="col-span-1 rounded-2xl overflow-hidden shadow-lg border relative">
          <img
            src={listing?.propertyImages?.[0]}
            alt={listing?.propertyName}
            className="w-full h-[360px] lg:h-[500px] object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* RIGHT - INFO + QR */}
        <div className="col-span-2 flex flex-col lg:flex-row gap-6 lg:gap-10">

          {/* LEFT SIDE - Property Info */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {listing?.propertyName || "Untitled Project"}
              </h1>
              <p className="text-gray-600 text-sm">
                By {listing?.developerName || "Unknown Developer"}
              </p>
            </div>

            {/* Configurations */}
            {listing?.configurations?.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-2">
                {listing.configurations.map((conf: any, idx: number) => (
                  <span
                    key={idx}
                    className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                  >
                    {conf.type} {conf.carpetArea && `• ${conf.carpetArea} sq.ft`}
                  </span>
                ))}
              </div>
            )}

            {/* Location */}
            {listing?.address && (
              <p className="text-gray-600 flex items-center gap-1 mt-2">
                <span>📍</span> {listing.address}
              </p>
            )}

            {/* Divider */}
            <hr className="my-4 border-gray-300" />

            {/* Project Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                <p className="text-xs text-gray-500">Starting Price</p>
                <p className="text-lg font-semibold text-gray-900">
                  ₹{listing?.price?.startingPrice || "—"}
                </p>
              </div>

              <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                <p className="text-xs text-gray-500">Project Area</p>
                <p className="text-lg font-semibold text-gray-900">
                  {listing?.projectArea || "—"} Acres
                </p>
              </div>

              <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                <p className="text-xs text-gray-500">Total Units</p>
                <p className="text-lg font-semibold text-gray-900">
                  {listing?.totalUnits || "—"}
                </p>
              </div>
            </div>

            {/* Amenities */}
            {amenities.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {amenities.slice(0, 6).map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full border"
                  >
                    {item.trim()}
                  </span>
                ))}
                {amenities.length > 6 && (
                  <span className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-full">
                    +{amenities.length - 6}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* RIGHT SIDE - QR + Share */}
          <div className="w-full lg:w-auto flex flex-col items-center gap-3 mt-6 lg:mt-0">
            {listing?.qrCodeImage && (
              <div className="bg-white p-3 rounded-xl shadow-md border flex flex-col items-center">
                <img
                  src={listing.qrCodeImage}
                  alt="QR Code"
                  className="w-24 h-24 object-contain"
                />
                <p className="text-xs text-center mt-1 text-gray-500">
                  Scan for brochure
                </p>
              </div>
            )}

            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Property link copied!");
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 text-sm"
            >
              Share Property
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};


/* ---------------- NAV ---------------- */

function SectionNav() {
  const sections = [
    "layout",
    "details",
    "highlights",
    "amenities",
    "location",
    "developer",
  ];

  return (
    <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur border-y">
      <div className="max-w-7xl mx-auto px-6 flex gap-8 py-3 overflow-x-auto">
        {sections.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className="text-sm font-medium text-gray-700 hover:text-black transition whitespace-nowrap"
          >
            {id.toUpperCase()}
          </a>
        ))}
      </div>
    </nav>
  );
}



/* ---------------- REUSABLE ---------------- */

function Section({ id, title, children }: any) {
  return (
    <section id={id}>
      <h2 className="text-3xl font-semibold mb-8">{title}</h2>
      {children}
    </section>
  );
}

function ImageGrid({ images = [] }: { images: string[] }) {
  if (!images.length) return <p>No images available</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          className="w-full h-44 object-cover rounded-xl hover:scale-105 transition"
        />
      ))}
    </div>
  );
}

/* ---------------- CTA ---------------- */

function FinalCTA() {
  return (
    <section className="bg-black text-white py-20 text-center">
      <h2 className="text-3xl font-semibold mb-6">
        Interested in this property?
      </h2>
      <button className="bg-white text-black px-10 py-4 rounded-full font-medium hover:opacity-90 transition">
        Get Brochure / Call Now
      </button>
    </section>
  );
}
