"use client";

import { useEffect, useState } from "react";
import { listenToAuth } from "@/lib/auth";
import { submitSellerRequest } from "@/lib/firestore";

export default function SellPropertyPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = listenToAuth(setUser);
    return () => unsub();
  }, []);

  // ===== BASIC INFO =====
  const [propertyName, setPropertyName] = useState("");
  const [developerName, setDeveloperName] = useState("");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [status, setStatus] = useState("Under Construction");
  const [reraId, setReraId] = useState("");
  // ===== SELLER CONTACT =====
const [sellerPhone, setSellerPhone] = useState("");


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

  const addConfig = () =>
    setConfigurations([...configurations, { type: "", carpetArea: "" }]);

  const updateConfig = (index, field, value) => {
    const updated = [...configurations];
    updated[index][field] = value;
    setConfigurations(updated);
  };

  const removeConfig = (index) => {
    const updated = configurations.filter((_, i) => i !== index);
    setConfigurations(updated);
  };

  // ===== AMENITIES =====
  const [amenities, setAmenities] = useState("");

  // ===== MEDIA (URLs for now) =====
  const [qrCodeImage, setQrCodeImage] = useState("");
  const [unitPlanImages, setUnitPlanImages] = useState("");
  const [floorPlanImages, setFloorPlanImages] = useState("");
  const [propertyImages, setPropertyImages] = useState("");

  // ===== SUBMIT =====
  const handleSubmit = async () => {
    if (!user) return alert("Sign in first");

    setLoading(true);

    const data = {
      userId: user.uid,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      sellerPhone,
      propertyName,
      developerName,
      propertyType,
      statusText: status,
      reraId,

      startingPrice,
      priceLabel,
      possessionDate,

      address,
      mapLink,

      projectArea,
      totalUnits,

      configurations,
      amenities: amenities.split(",").map(a => a.trim()),

      qrCodeImage,
      unitPlanImages: unitPlanImages.split(","),
      floorPlanImages: floorPlanImages.split(","),
      propertyImages: propertyImages.split(","),
    };

    try {
      await submitSellerRequest(data);
      alert("Property submitted for review 🎉");
      location.reload();
    } catch {
      alert("Error submitting");
    }

    setLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Please sign in first.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-6 space-y-6">
      <h1 className="text-3xl font-semibold">Submit Property</h1>
      <Section title="Seller Contact (Private)">
  <Input
    value={sellerPhone}
    set={setSellerPhone}
    placeholder="Your Phone Number"
  />
</Section>

      <Section title="Basic Info">
        <Input value={propertyName} set={setPropertyName} placeholder="Property Name"/>
        <Input value={developerName} set={setDeveloperName} placeholder="Developer"/>
        <Input value={reraId} set={setReraId} placeholder="RERA ID"/>
      </Section>

      <Section title="Price & Possession">
        <Input value={startingPrice} set={setStartingPrice} placeholder="Starting Price"/>
        <Input value={priceLabel} set={setPriceLabel} placeholder="Price Label (eg: All inclusive)"/>
        <Input value={possessionDate} set={setPossessionDate} placeholder="Possession Date"/>
      </Section>

      <Section title="Location">
        <Input value={address} set={setAddress} placeholder="Address"/>
        <Input value={mapLink} set={setMapLink} placeholder="Google Map Link"/>
      </Section>

      <Section title="Project Details">
        <Input value={projectArea} set={setProjectArea} placeholder="Project Area"/>
        <Input value={totalUnits} set={setTotalUnits} placeholder="Total Units"/>
      </Section>

      <Section title="Configurations">
        {configurations.map((c, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={c.type}
              set={(v) => updateConfig(i, "type", v)}
              placeholder="2 BHK"
            />
            <Input
              value={c.carpetArea}
              set={(v) => updateConfig(i, "carpetArea", v)}
              placeholder="Carpet Area"
            />
            <button onClick={() => removeConfig(i)}>❌</button>
          </div>
        ))}
        <button onClick={addConfig}>+ Add Configuration</button>
      </Section>

      <Section title="Amenities">
        <Input value={amenities} set={setAmenities} placeholder="Pool, Gym, Garden"/>
      </Section>

      <Section title="Images (paste URLs comma separated)">
        <Input value={propertyImages} set={setPropertyImages} placeholder="Property Images"/>
        <Input value={unitPlanImages} set={setUnitPlanImages} placeholder="Unit Plans"/>
        <Input value={floorPlanImages} set={setFloorPlanImages} placeholder="Floor Plans"/>
        <Input value={qrCodeImage} set={setQrCodeImage} placeholder="QR Code Image"/>
      </Section>

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-6 py-4 rounded-xl w-full"
      >
        {loading ? "Submitting..." : "Submit Property"}
      </button>
    </div>
  );
}

// Small reusable UI
function Section({ title, children }) {
  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-xl">{title}</h2>
      {children}
    </div>
  );
}

function Input({ value, set, placeholder }) {
  return (
    <input
      className="w-full border p-3 rounded-xl"
      value={value}
      placeholder={placeholder}
      onChange={(e) => set(e.target.value)}
    />
  );
}
