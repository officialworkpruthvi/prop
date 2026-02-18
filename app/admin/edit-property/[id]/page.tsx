"use client";

import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useParams, useRouter } from "next/navigation";

export default function EditListingPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ===== BASIC INFO =====
  const [propertyName, setPropertyName] = useState("");
  const [developerName, setDeveloperName] = useState("");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [status, setStatus] = useState("Under Construction");
  const [reraId, setReraId] = useState("");

  // ===== PRICE =====
  const [startingPrice, setStartingPrice] = useState("");
  const [priceLabel, setPriceLabel] = useState("");
  const [possessionDate, setPossessionDate] = useState("");

  // ===== LOCATION =====
  const [address, setAddress] = useState("");
  const [mapLink, setMapLink] = useState("");

  // ===== PROJECT =====
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

  // 🔥 FETCH PROPERTY
  useEffect(() => {
    const fetchListing = async () => {
      const ref = doc(db, "listings", id as string);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        alert("Property not found");
        router.push("/admin/dashboard");
        return;
      }

      const data: any = snap.data();

      setPropertyName(data.propertyName || "");
      setDeveloperName(data.developerName || "");
      setPropertyType(data.propertyType || "Apartment");
      setStatus(data.status || "Under Construction");
      setReraId(data.reraId || "");

      setStartingPrice(data.price?.startingPrice || "");
      setPriceLabel(data.price?.priceLabel || "");
      setPossessionDate(data.possessionDate || "");

      setAddress(data.address || "");
      setMapLink(data.mapLink || "");

      setProjectArea(data.projectArea || "");
      setTotalUnits(data.totalUnits || "");

      setConfigurations(data.configurations || [{ type: "", carpetArea: "" }]);

      setAmenities((data.amenities || []).join(", "));
      setQrCodeImage(data.qrCodeImage || "");
      setUnitPlanImages((data.unitPlanImages || []).join(", "));
      setFloorPlanImages((data.floorPlanImages || []).join(", "));
      setPropertyImages((data.propertyImages || []).join(", "));

      setLoading(false);
    };

    fetchListing();
  }, [id, router]);

  // ===== CONFIG HANDLERS =====
  const addConfiguration = () => {
    setConfigurations([...configurations, { type: "", carpetArea: "" }]);
  };

  const removeConfiguration = (index: number) => {
    setConfigurations(configurations.filter((_, i) => i !== index));
  };

  const handleConfigChange = (index: number, field: string, value: string) => {
    const updated = [...configurations];
    updated[index][field] = value;
    setConfigurations(updated);
  };

  // 💾 UPDATE DOC
  const handleUpdate = async () => {
    setSaving(true);

    try {
      const ref = doc(db, "listings", id as string);

      await updateDoc(ref, {
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

        amenities: amenities.split(",").map((a) => a.trim()),

        qrCodeImage,
        unitPlanImages: unitPlanImages.split(",").map((i) => i.trim()),
        floorPlanImages: floorPlanImages.split(",").map((i) => i.trim()),
        propertyImages: propertyImages.split(",").map((i) => i.trim()),

        updatedAt: serverTimestamp(),
      });

      alert("Property Updated 🎉");
      router.push("/admin/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error updating property");
    }

    setSaving(false);
  };

  if (loading) return <div className="p-10">Loading property...</div>;

  return (
  <div className="min-h-screen bg-[#f7f8fb] py-6 px-4">
    <div className="max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
          Edit Property
        </h1>
        <p className="text-gray-500 text-sm">
          Update property details and save changes
        </p>
      </div>

      {/* GRID LAYOUT */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* BASIC INFO */}
        <Card title="Basic Information">
          <Input label="Property Name" value={propertyName} setValue={setPropertyName}/>
          <Input label="Developer Name" value={developerName} setValue={setDeveloperName}/>
          <Input label="RERA ID" value={reraId} setValue={setReraId}/>
        </Card>

        {/* PRICE */}
        <Card title="Pricing & Possession">
          <Input label="Starting Price" value={startingPrice} setValue={setStartingPrice}/>
          <Input label="Price Label" value={priceLabel} setValue={setPriceLabel}/>
          <Input label="Possession Date" value={possessionDate} setValue={setPossessionDate}/>
        </Card>

        {/* LOCATION */}
        <Card title="Location">
          <Textarea label="Address" value={address} setValue={setAddress}/>
          <Input label="Google Map Link" value={mapLink} setValue={setMapLink}/>
        </Card>

        {/* PROJECT */}
        <Card title="Project Details">
          <Input label="Project Area" value={projectArea} setValue={setProjectArea}/>
          <Input label="Total Units" value={totalUnits} setValue={setTotalUnits}/>
        </Card>

        {/* CONFIGURATIONS FULL WIDTH */}
        <div className="lg:col-span-2">
          <Card title="Configurations">
            {configurations.map((config, index) => (
              <div
                key={index}
                className="grid sm:grid-cols-3 gap-3 mb-3"
              >
                <input
                  placeholder="2BHK"
                  value={config.type}
                  onChange={(e)=>handleConfigChange(index,"type",e.target.value)}
                  className="input"
                />
                <input
                  placeholder="Carpet Area"
                  value={config.carpetArea}
                  onChange={(e)=>handleConfigChange(index,"carpetArea",e.target.value)}
                  className="input"
                />
                <button
                  onClick={()=>removeConfiguration(index)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}

            <button onClick={addConfiguration} className="add-btn">
              + Add Configuration
            </button>
          </Card>
        </div>

        {/* MEDIA FULL WIDTH */}
        <div className="lg:col-span-2">
          <Card title="Media URLs">
            <Input label="QR Code URL" value={qrCodeImage} setValue={setQrCodeImage}/>
            <Textarea label="Unit Plan URLs" value={unitPlanImages} setValue={setUnitPlanImages}/>
            <Textarea label="Floor Plan URLs" value={floorPlanImages} setValue={setFloorPlanImages}/>
            <Textarea label="Property Image URLs" value={propertyImages} setValue={setPropertyImages}/>
          </Card>
        </div>

      </div>

      {/* SAVE BUTTON */}
      <div className="mt-8">
        <button
          onClick={handleUpdate}
          disabled={saving}
          className="w-full sm:w-auto bg-black text-white px-8 py-3 rounded-xl shadow hover:scale-[1.02] active:scale-[0.98] transition"
        >
          {saving ? "Updating Property..." : "Update Property"}
        </button>
      </div>
    </div>
  </div>
);

}

/* SMALL UI HELPERS */

function Card({ title, children }: any) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border space-y-4">
      <h2 className="font-semibold text-lg text-gray-900">{title}</h2>
      {children}
    </div>
  );
}

function Input({ label, value, setValue }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">{label}</label>
      <input
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        className="input"
      />
    </div>
  );
}

function Textarea({ label, value, setValue }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">{label}</label>
      <textarea
        rows={3}
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        className="input"
      />
    </div>
  );
}

