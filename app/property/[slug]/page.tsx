"use client";

import { useEffect, useState, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import PropertyGallery from "@/components/PropertyGallery";
import LayoutPlans from "@/components/LayoutPlans";

function Sections({ listing }: any) {
  // create refs for each nav section
  const layoutRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const developerRef = useRef<HTMLDivElement>(null);

  // refs mapping for nav
  const sectionRefs: Record<string, any> = {
    layout: layoutRef,
    details: detailsRef,
    highlights: highlightsRef,
    amenities: amenitiesRef,
    location: locationRef,
    developer: developerRef,
  };

  return (
    <div className="bg-[#f6f8f7] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-20">

            {/* LAYOUT */}
            <SectionCard title="Layout Plan" ref={layoutRef}>
              <LayoutPlans
                unitPlans={listing.unitPlanImages}
                floorPlans={listing.floorPlanImages}
              />
            </SectionCard>

            {/* PROPERTY DETAILS */}
            <SectionCard title="Property Details" ref={detailsRef}>
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
            <SectionCard title="Configurations" ref={highlightsRef}>
              <div className="grid md:grid-cols-3 gap-6">
                {listing.configurations?.map((c: any, i: number) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-gray-300 transition"
                  >
                    <div className="text-lg font-semibold text-gray-800">
                      {c.type}
                    </div>
                    <div className="text-gray-500 mt-1 text-sm">{c.carpetArea}</div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* AMENITIES */}
            <SectionCard title="Amenities" ref={amenitiesRef}>
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
            <SectionCard title="Location" ref={locationRef}>
              <iframe
                src={listing.mapLink}
                className="w-full h-[420px] rounded-xl border border-gray-200"
                loading="lazy"
              />
            </SectionCard>

            {/* DEVELOPER */}
            <SectionCard title="About Developer" ref={developerRef}>
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

// ---------------------- SECTION CARD ----------------------
const SectionCard = React.forwardRef<HTMLDivElement, any>(({ title, children }, ref) => (
  <section ref={ref}>
    <div className="bg-white rounded-[22px] border border-gray-200 overflow-hidden">
      {/* soft grey header strip */}
      <div className="bg-[#eef2f1] px-8 py-5">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="p-8">{children}</div>
    </div>
  </section>
));
SectionCard.displayName = "SectionCard";

// ---------------------- DETAIL ITEM ----------------------
function DetailItem({ label, value }: any) {
  return (
    <div className="border-b border-gray-200 pb-4">
      <div className="text-gray-500 text-sm">{label}</div>
      <div className="text-gray-800 font-medium mt-1">{value}</div>
    </div>
  );
}

// ---------------------- STICKY FORM ----------------------
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

// ---------------------- PROPERTY PAGE ----------------------
export default function PropertyPage() {
  const { slug } = useParams();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // refs for nav scrolling
  const layoutRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const developerRef = useRef<HTMLDivElement>(null);

  const sectionRefs: Record<string, any> = {
    layout: layoutRef,
    details: detailsRef,
    highlights: highlightsRef,
    amenities: amenitiesRef,
    location: locationRef,
    developer: developerRef,
  };

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
      <SectionNav sectionRefs={sectionRefs} />
      <Sections listing={listing} />
      <FinalCTA />
    </main>
  );
}

// ---------------------- SECTION NAV ----------------------
function SectionNav({ sectionRefs }: any) {
  const sections = [
    "layout",
    "details",
    "highlights",
    "amenities",
    "location",
    "developer",
  ];

  const handleClick = (id: string) => {
    const ref = sectionRefs[id];
    if (ref?.current) {
      const topOffset = 80; // offset for sticky nav
      const elementPosition = ref.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - topOffset, behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur border-y">
      <div className="max-w-7xl mx-auto px-6 flex gap-8 py-3 overflow-x-auto">
        {sections.map((id) => (
          <button
            key={id}
            onClick={() => handleClick(id)}
            className="text-sm font-medium text-gray-700 hover:text-black transition whitespace-nowrap"
          >
            {id.toUpperCase()}
          </button>
        ))}
      </div>
    </nav>
  );
}
