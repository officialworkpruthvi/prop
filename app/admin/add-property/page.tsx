"use client"; // ensures this page never runs on server

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export const dynamic = 'force-dynamic';

export default function AddListingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [propertyName, setPropertyName] = useState("");
  const [developerName, setDeveloperName] = useState("");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [status, setStatus] = useState("Under Construction");
  const [reraId, setReraId] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [priceLabel, setPriceLabel] = useState("");
  const [possessionDate, setPossessionDate] = useState("");
  const [address, setAddress] = useState("");
  const [mapLink, setMapLink] = useState("");
  const [projectArea, setProjectArea] = useState("");
  const [totalUnits, setTotalUnits] = useState("");
  const [configurations, setConfigurations] = useState([{ type: "", carpetArea: "" }]);
  const [amenities, setAmenities] = useState("");
  const [qrCodeImage, setQrCodeImage] = useState("");
  const [unitPlanImages, setUnitPlanImages] = useState("");
  const [floorPlanImages, setFloorPlanImages] = useState("");
  const [propertyImages, setPropertyImages] = useState("");

  // Parse image URLs helper
  const parseImageUrls = (text: string) =>
    text
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url.startsWith("http"));

  // Add/remove configuration handlers
  const addConfiguration = () => setConfigurations([...configurations, { type: "", carpetArea: "" }]);
  const removeConfiguration = (index: number) => setConfigurations(configurations.filter((_, i) => i !== index));
  const handleConfigChange = (index: number, field: "type" | "carpetArea", value: string) => {
    const updated = [...configurations];
    updated[index][field] = value;
    setConfigurations(updated);
  };

  // ===== Submit handler (Firebase lazy load) =====
  const handleSubmit = async () => {
    if (!propertyName || !developerName) {
      alert("Property name and developer are required");
      return;
    }

    try {
      setLoading(true);

      // Lazy import Firebase client SDK — only in browser
      const { db } = await import("@/lib/firebase");

      await addDoc(collection(db, "listings"), {
        propertyName,
        developerName,
        propertyType,
        status,
        reraId,
        price: { startingPrice: Number(startingPrice), priceLabel },
        possessionDate,
        address,
        mapLink,
        projectArea,
        totalUnits: Number(totalUnits),
        configurations,
        amenities: amenities.split(",").map((a) => a.trim()).filter(Boolean),
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

  // ===== Render form =====
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      <h1 className="text-2xl font-semibold">Add New Property</h1>

      {/* Example for basic info */}
      <Input label="Property Name" value={propertyName} setValue={setPropertyName} />
      <Input label="Developer Name" value={developerName} setValue={setDeveloperName} />

      {/* You can keep all other inputs as before */}
      {/* ... */}

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

// ===== Input helper =====
function Input({ label, value, setValue }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm">{label}</label>
      <input value={value} onChange={(e) => setValue(e.target.value)} className="border p-2" />
    </div>
  );
}
