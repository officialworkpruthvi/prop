"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useParams } from "next/navigation";
import Header from "@/components/Header";

function Sections({ listing }: any) {
  return (
    <div className="bg-[#f6f8f7] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-20">

            {/* LAYOUT */}
            <SectionCard title="Layout Plan">
              <ImageGrid images={listing.floorPlanImages} />
            </SectionCard>

            {/* PROPERTY DETAILS — MOST IMPORTANT PART */}
            <SectionCard title="Property Details">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12 text-[15px]">
                
                <DetailItem label="Units" value={listing.totalUnits} />
                <DetailItem label="Project Area" value={listing.projectArea} />
                <DetailItem label="Carpet Area" value={listing.carpetArea} />

                <DetailItem label="Configurations" value={listing.configurationsText} />
                <DetailItem label="Developer" value={listing.developerName} />
                <DetailItem label="Status" value={listing.status} />

                <DetailItem label="Property Type" value="Residential" />
                <DetailItem label="RERA ID" value={listing.reraId} />
                <DetailItem label="Possession" value={listing.possessionDate} />

              </div>
            </SectionCard>

            {/* CONFIGURATIONS */}
            <SectionCard title="Configurations">
              <div className="grid md:grid-cols-3 gap-6">
                {listing.configurations?.map((c: any, i: number) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-gray-300 transition"
                  >
                    <div className="text-lg font-semibold text-gray-800">
                      {c.type}
                    </div>
                    <div className="text-gray-500 mt-1 text-sm">
                      {c.carpetArea}
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* AMENITIES */}
            <SectionCard title="Amenities">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {listing.amenities?.map((a: string) => (
                  <div
                    key={a}
                    className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700"
                  >
                    {a}
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* LOCATION */}
            <SectionCard title="Location">
              <iframe
                src={listing.mapLink}
                className="w-full h-[420px] rounded-xl border border-gray-200"
                loading="lazy"
              />
            </SectionCard>

            {/* DEVELOPER */}
            <SectionCard title="About Developer">
              <p className="text-gray-600 leading-relaxed max-w-3xl">
                {listing.developerName} is a reputed real estate developer known
                for timely delivery, premium construction quality, and thoughtful design.
              </p>
            </SectionCard>

          </div>

          {/* RIGHT SIDE FORM */}
          <div className="hidden lg:block">
            <StickyForm />
          </div>

        </div>

        {/* MOBILE FORM */}
        <div className="lg:hidden mt-14">
          <StickyForm />
        </div>
      </div>
    </div>
  );
}
function SectionCard({ title, children }: any) {
  return (
    <section>
      <div className="bg-white rounded-[22px] border border-gray-200 overflow-hidden">
        
        {/* soft grey header strip */}
        <div className="bg-[#eef2f1] px-8 py-5">
          <h2 className="text-xl font-semibold text-gray-800">
            {title}
          </h2>
        </div>

        <div className="p-8">
          {children}
        </div>

      </div>
    </section>
  );
}
function DetailItem({ label, value }: any) {
  return (
    <div className="border-b border-gray-200 pb-4">
      <div className="text-gray-500 text-sm">{label}</div>
      <div className="text-gray-800 font-medium mt-1">{value}</div>
    </div>
  );
}
function StickyForm() {
  return (
    <div className="sticky top-24 bg-white border border-gray-200 rounded-[22px] p-7">
      <h3 className="text-xl font-semibold text-gray-800 mb-5">
        Get a call back from our expert
      </h3>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-600"
        />

        <input
          type="email"
          placeholder="Email (optional)"
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-600"
        />

        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-600"
        />

        <label className="flex items-start gap-2 text-sm text-gray-600">
          <input type="checkbox" className="mt-1 w-4 h-4" />
          I agree to the
          <span className="text-green-600 underline cursor-pointer">
            terms and conditions
          </span>
        </label>

        <button className="w-full bg-[#35a66a] hover:bg-[#2f955f] text-white py-3 rounded-lg font-semibold transition">
          ENQUIRE NOW
        </button>
      </div>
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
    <section className="bg-[#f6f8f7] pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6">

        {/* MAIN HERO CARD */}
        <div className="relative bg-white rounded-[28px] border border-gray-200 p-6 lg:p-8 grid lg:grid-cols-2 gap-8 items-start overflow-hidden">


          {/* LEFT IMAGE */}
          <div className="rounded-[22px] overflow-hidden">
            <img
              src={listing?.propertyImages?.[0]}
              alt={listing?.propertyName}
              className="w-full h-[260px] sm:h-[340px] lg:h-[420px] object-cover"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col gap-5">

            {/* TITLE + COMPARE */}
            <div className="flex justify-between items-start gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900">
                  {listing?.propertyName}
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  By {listing?.developerName}
                </p>
              </div>

              
            </div>

            {/* CONFIG TAGS */}
            {listing?.configurations?.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {listing.configurations.map((conf: any, idx: number) => (
                  <span
                    key={idx}
                    className="bg-[#eef6f1] text-[#2f855a] px-3 py-1 rounded-md text-sm"
                  >
                    {conf.type}
                  </span>
                ))}
              </div>
            )}

            {/* LOCATION */}
            <p className="text-gray-600 text-sm">
              📍 {listing.address}
            </p>

            <hr className="border-gray-200" />

            {/* AMENITIES PILLS */}
            {amenities.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {amenities.slice(0, 3).map((item, i) => (
                  <span key={i} className="px-3 py-1 border rounded-full text-sm text-gray-600">
                    {item.trim()}
                  </span>
                ))}
                {amenities.length > 3 && (
                  <span className="px-3 py-1 border rounded-full text-sm text-gray-600">
                    +{amenities.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* CARPET AREA */}
            <div className="text-gray-700">
              Carpet area:{" "}
              <span className="font-semibold">
                {listing?.carpetArea || "895"} sq.ft.
              </span>
            </div>

            {/* PRICE STATS */}
            <div className="grid grid-cols-3 gap-3">
              <StatBox title="Avg Price /Sq.ft" value={`₹ ${listing?.price?.avgSqft || "6,141"}`} />
              <StatBox title="Total Price" value={`₹ ${listing?.price?.total || "86.48L"}`} />
              <StatBox title="EMI Starts At" value={`₹ ${listing?.price?.emi || "77.81K"}`} />
            </div>

            {/* CTA BUTTONS */}
            <div className="flex gap-3 pt-2">
              <button className="bg-[#35a66a] hover:bg-[#2f955f] text-white px-6 py-3 rounded-xl font-semibold">
                Contact Now
              </button>
             
            </div>

          </div>

          {/* QR FLOAT (DESKTOP ONLY) */}
          {listing?.qrCodeImage && (
            <div className="hidden lg:flex absolute right-10 top-5 flex-col items-center bg-white border border-gray-200 rounded-2xl p-4">
              <img
                src={listing.qrCodeImage}
                className="w-28 h-28 object-contain"
              />
              <p className="text-xs text-gray-500 mt-2">Scan for brochure</p>
            </div>
          )}
          <ShareFab />
        </div>
      </div>
    </section>
  );
};
function StatBox({ title, value }: any) {
  return (
    <div className="border border-[#bfe3ce] bg-[#eef6f1] rounded-xl p-3">
      <div className="text-xs text-gray-600">{title}</div>
      <div className="font-semibold text-gray-900 mt-1">{value}</div>
    </div>
  );
}
function ShareFab() {
  const share = async () => {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: document.title,
        url
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Property link copied!");
    }
  };

  return (
    <button
      onClick={share}
      className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-[#243b55] hover:bg-[#1e2f44] flex items-center justify-center shadow-md transition"
      aria-label="Share Property"
    >
      {/* SVG Share Icon */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M18 8a3 3 0 10-2.83-4H15a3 3 0 000 6c.5 0 .97-.12 1.39-.34L8.91 12.7A3 3 0 006 11a3 3 0 100 6c1.31 0 2.42-.84 2.83-2.01l7.48 3.04c-.2.41-.31.87-.31 1.37a3 3 0 103-3c-.5 0-.97.12-1.39.34L10.13 13.7c.2-.41.31-.87.31-1.37s-.11-.96-.31-1.37l7.48-3.04c.42 1.17 1.52 2.01 2.83 2.01z"
          fill="white"
        />
      </svg>
    </button>
  );
}


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
