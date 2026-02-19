"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
export const dynamic = 'force-dynamic';

export default function AddListingPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const parseImageUrls = (text:string) => {
  if (!text) return [];

  return text
    .split(",")
    .map((url) => url.trim())
    .filter((url) => url !== "" && url.startsWith("http"));
};

  // ===== BASIC INFO =====
  const [propertyName, setPropertyName] = useState("");
  const [developerName, setDeveloperName] = useState("");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [status, setStatus] = useState("Under Construction");
  const [reraId, setReraId] = useState("");

  // ===== PRICE & POSSESSION =====
  const [startingPrice, setStartingPrice] = useState("");
  const [priceLabel, setPriceLabel] = useState("");
  const [possessionDate, setPossessionDate] = useState("");

  // ===== LOCATION =====
  const [address, setAddress] = useState("");
  const [mapLink, setMapLink] = useState("");

  // ===== PROJECT DETAILS =====
  const [projectArea, setProjectArea] = useState("");
  const [totalUnits, setTotalUnits] = useState("");

  // ===== CONFIGURATIONS =====
  const [configurations, setConfigurations] = useState([
    { type: "", carpetArea: "" },
  ]);

  // ===== AMENITIES =====
  const [amenities, setAmenities] = useState("");

  // ===== MEDIA =====
  const [qrCodeImage, setQrCodeImage] = useState("");
  const [unitPlanImages, setUnitPlanImages] = useState("");
  const [floorPlanImages, setFloorPlanImages] = useState("");
  const [propertyImages, setPropertyImages] = useState("");

  // ===== HANDLERS =====
  const addConfiguration = () => {
    setConfigurations([...configurations, { type: "", carpetArea: "" }]);
  };

  const removeConfiguration = (index: number) => {
    setConfigurations(configurations.filter((_, i) => i !== index));
  };

  const handleConfigChange = (
    index: number,
    field: "type" | "carpetArea",
    value: string
  ) => {
    const updated = [...configurations];
    updated[index][field] = value;
    setConfigurations(updated);
  };

  


  const handleSubmit = async () => {
    if (!propertyName || !developerName) {
      alert("Property name and developer are required");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "listings"), {
        propertyName,
        developerName,
        propertyType,
        status,
        reraId,

        price: {
          startingPrice: Number(startingPrice),
          priceLabel,
        },

        possessionDate,

        address,
        mapLink,

        projectArea,
        totalUnits: Number(totalUnits),

        configurations,

        amenities: amenities
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),

        qrCodeImage,
        unitPlanImages: parseImageUrls(unitPlanImages),
        floorPlanImages: parseImageUrls(floorPlanImages),
        propertyImages: parseImageUrls(propertyImages),


        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      alert("Listing added successfully");
      router.push("/admin/dashboard");
    } catch (error) {
      console.error(error);
      alert("Error adding listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      <h1 className="text-2xl font-semibold">Add New Property</h1>

      {/* BASIC INFO */}
      <Section title="Basic Information">
        <Input label="Property Name" value={propertyName} setValue={setPropertyName} />
        <Input label="Developer Name" value={developerName} setValue={setDeveloperName} />

        <Select label="Property Type" value={propertyType} setValue={setPropertyType}
          options={["Apartment", "Villa", "Plot"]} />

        <Select label="Status" value={status} setValue={setStatus}
          options={["Pre-Launch", "Under Construction", "Ready Possession"]} />

        <Input label="RERA ID" value={reraId} setValue={setReraId} />
      </Section>

      {/* PRICE */}
      <Section title="Pricing & Possession">
        <Input label="Starting Price (number)" value={startingPrice} setValue={setStartingPrice} />
        <Input label="Price Label (e.g. 75 Lakhs Onwards)" value={priceLabel} setValue={setPriceLabel} />
        <Input label="Possession Date (e.g. Dec 2027)" value={possessionDate} setValue={setPossessionDate} />
      </Section>

      {/* LOCATION */}
      <Section title="Location">
        <Textarea label="Address" value={address} setValue={setAddress} />
        <Input label="Map Link (Google Maps)" value={mapLink} setValue={setMapLink} />
      </Section>

      {/* PROJECT */}
      <Section title="Project Details">
        <Input label="Project Area" value={projectArea} setValue={setProjectArea} />
        <Input label="Total Units" value={totalUnits} setValue={setTotalUnits} />
      </Section>

      {/* CONFIGURATIONS */}
      <Section title="Configurations">
        {configurations.map((config, index) => (
          <div key={index} className="flex gap-4 items-center">
            <input
              placeholder="2BHK / 3BHK"
              value={config.type}
              onChange={(e) => handleConfigChange(index, "type", e.target.value)}
              className="border p-2 flex-1"
            />
            <input
              placeholder="Carpet Area"
              value={config.carpetArea}
              onChange={(e) => handleConfigChange(index, "carpetArea", e.target.value)}
              className="border p-2 flex-1"
            />
            {configurations.length > 1 && (
              <button onClick={() => removeConfiguration(index)} className="text-red-500">
                Remove
              </button>
            )}
          </div>
        ))}
        <button onClick={addConfiguration} className="text-blue-600">
          + Add Configuration
        </button>
      </Section>

      {/* AMENITIES */}
      <Section title="Amenities">
        <Textarea label="Amenities (comma separated)" value={amenities} setValue={setAmenities} />
      </Section>

      {/* MEDIA */}
      <Section title="Media (URLs)">
        <Input label="QR Code Image URL" value={qrCodeImage} setValue={setQrCodeImage} />
        <Textarea label="Unit Plan Image URLs" value={unitPlanImages} setValue={setUnitPlanImages} />
        <Textarea label="Floor Plan Image URLs" value={floorPlanImages} setValue={setFloorPlanImages} />
        <Textarea label="Property Image URLs" value={propertyImages} setValue={setPropertyImages} />
      </Section>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-black text-white px-6 py-3 rounded"
      >
        {loading ? "Saving..." : "Add Listing"}
      </button>
    </div>
  );
}

/* ===== UI HELPERS ===== */

function Section({ title, children }: any) {
  return (
    <div className="border rounded p-5 space-y-4">
      <h2 className="font-medium">{title}</h2>
      {children}
    </div>
  );
}

function Input({ label, value, setValue }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm">{label}</label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border p-2"
      />
    </div>
  );
}

function Textarea({ label, value, setValue }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm">{label}</label>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border p-2"
        rows={3}
      />
    </div>
  );
}

function Select({ label, value, setValue, options }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm">{label}</label>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border p-2"
      >
        {options.map((opt: string) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
