"use client";
import { useEffect, useState } from "react";
import { listenToAuth } from "@/lib/auth";
import { getUserSellerRequests } from "@/lib/firestore";
import PropertyCard from "@/components/dashboard/PropertyCard";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = listenToAuth(async (u) => {
      if (!u) return;

      setUser(u);
      const data = await getUserSellerRequests(u.email);
      setProperties(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading)
    return (
      <div className="p-10 text-center text-gray-500">
        Loading your properties...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-10">My Properties</h1>

      {properties.length === 0 && (
        <div className="text-gray-500">No properties submitted yet.</div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
