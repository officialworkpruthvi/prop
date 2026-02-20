"use client"; // fully client-side

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

interface Listing {
  id: string;
  propertyName: string;
  developerName: string;
  price?: { startingPrice?: number; priceLabel?: string };
  address?: string;
  mapLink?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // 🔥 Fetch Listings (lazy Firebase import)
  useEffect(() => {
    let unsubscribed = false;

    const fetchListings = async () => {
      const { db } = await import("@/lib/firebase");
      const {
        collection,
        getDocs,
        query,
        orderBy,
      } = await import("firebase/firestore");

      const q = query(collection(db, "listings"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      if (unsubscribed) return;

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Listing[];

      setListings(data);
      setLoading(false);
    };

    fetchListings();

    return () => {
      unsubscribed = true;
    };
  }, []);

  // 🔎 Search logic
  const filteredListings = useMemo(
    () =>
      listings.filter((listing) =>
        `${listing.propertyName} ${listing.developerName}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search, listings]
  );

  // 🗑 Delete property
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Delete this property?");
    if (!confirmDelete) return;

    const { db } = await import("@/lib/firebase");
    const { deleteDoc, doc } = await import("firebase/firestore");

    await deleteDoc(doc(db, "listings", id));
    setListings((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold">Property Dashboard</h1>

          <div className="flex gap-2">
            <button
              onClick={() => router.push("/admin/add-property")}
              className="bg-black text-white px-5 py-2 rounded-lg text-sm hover:opacity-90 transition"
            >
              + Add Property
            </button>
            <button
              onClick={() => router.push("/admin/seller-requests")}
              className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm"
            >
              Seller Requests
            </button>
          </div>
        </div>

        {/* SEARCH */}
        <div>
          <input
            type="text"
            placeholder="Search by property or developer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
          {loading ? (
            <div className="p-6 text-gray-500">Loading properties...</div>
          ) : filteredListings.length === 0 ? (
            <div className="p-6 text-gray-500">No properties found.</div>
          ) : (
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-6 py-3">Property</th>
                  <th className="px-6 py-3">Developer</th>
                  <th className="px-6 py-3">Starting Price</th>
                  <th className="px-6 py-3">Address</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredListings.map((listing) => (
                  <tr key={listing.id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium">{listing.propertyName}</td>
                    <td className="px-6 py-4">{listing.developerName}</td>
                    <td className="px-6 py-4">
                      {listing.price?.startingPrice?.toLocaleString() || "-"} {listing.price?.priceLabel}
                    </td>
                    <td className="px-6 py-4">{listing.address}</td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button
                        onClick={() => router.push(`/admin/edit-property/${listing.id}`)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(listing.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => router.push(`/property/${listing.id}`)}
                        className="text-green-600 hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
