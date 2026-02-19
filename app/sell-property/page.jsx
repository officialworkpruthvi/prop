"use client";

import { useEffect, useState } from "react";
import { listenToAuth } from "@/lib/auth";
import { submitSellerRequest } from "@/lib/firestore";

export default function SellPropertyPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // ===== AUTH CHECK =====
  useEffect(() => {
    const unsub = listenToAuth(setUser);
    return () => unsub();
  }, []);

  // ===== BASIC INFO =====
  const [propertyName, setPropertyName] = useState("");
  const [developerName, setDeveloperName] = useState("");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [status, setStatus] = useState("Under Construction");

  const [startingPrice, setStartingPrice] = useState("");
  const [address, setAddress] = useState("");

  // ===== SUBMIT =====
  const handleSubmit = async () => {
    if (!user) {
      alert("Please sign in first");
      return;
    }

    setLoading(true);

    const data = {
      userId: user.uid,
      userName: user.displayName,
      userEmail: user.email,
      userPhoto: user.photoURL,

      propertyName,
      developerName,
      propertyType,
      statusText: status,
      startingPrice,
      address,
    };

    try {
      await submitSellerRequest(data);
      alert("Request submitted 🎉");
      setPropertyName("");
      setDeveloperName("");
      setStartingPrice("");
      setAddress("");
    } catch (err) {
      alert("Error submitting request");
    }

    setLoading(false);
  };

  // ===== UI =====
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-6">
        <div>
          <h1 className="text-3xl font-semibold mb-4">
            Please sign in to sell property
          </h1>
          <p className="text-gray-500">
            Click the Sign In button in header first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-semibold mb-8">Sell Your Property</h1>

      <div className="space-y-4">

        <input
          placeholder="Property Name"
          className="w-full border p-3 rounded-xl"
          value={propertyName}
          onChange={(e) => setPropertyName(e.target.value)}
        />

        <input
          placeholder="Developer Name"
          className="w-full border p-3 rounded-xl"
          value={developerName}
          onChange={(e) => setDeveloperName(e.target.value)}
        />

        <input
          placeholder="Starting Price"
          className="w-full border p-3 rounded-xl"
          value={startingPrice}
          onChange={(e) => setStartingPrice(e.target.value)}
        />

        <input
          placeholder="Address"
          className="w-full border p-3 rounded-xl"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-black text-white px-6 py-3 rounded-xl w-full"
        >
          {loading ? "Submitting..." : "Submit for Review"}
        </button>

      </div>
    </div>
  );
}
