"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";

type Listing = {
  id: string;
  propertyName: string;
  developerName: string;
  address: string;
  status: string;
  price?: {
    startingPrice?: number;
    priceLabel?: string;
  };
};

export default function AdminDashboard() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);

  // ---------------- FETCH LISTINGS ----------------
  const fetchListings = async () => {
    setLoading(true);

    const snapshot = await getDocs(collection(db, "listings"));
    const data = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<Listing, "id">),
    }));

    setListings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // ---------------- DELETE ----------------
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    setLoading(true);
    await deleteDoc(doc(db, "listings", id));
    await fetchListings();
    setLoading(false);
  };

  // ---------------- UI ----------------
  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: 20 }}>Admin · Property Listings</h1>

      {loading && <p>Loading...</p>}
      {!loading && listings.length === 0 && <p>No listings found.</p>}

      {listings.map((item) => (
        <div key={item.id} style={cardStyle}>
          <div>
            <strong>{item.propertyName}</strong>

            <p style={{ margin: "4px 0", fontSize: 14 }}>
              Developer: {item.developerName}
            </p>

            <p style={{ margin: "4px 0", fontSize: 14 }}>
              {item.address}
            </p>

            <p style={{ margin: "4px 0", fontWeight: 500 }}>
              ₹ {item.price?.priceLabel || "Price not set"}
            </p>

            <small>
              URL: <code>/property/{item.id}</code>
            </small>
            <br />
            <small>Status: {item.status}</small>
          </div>

          <div>
            <a
              href={`/admin/dashboard/edit/${item.id}`}
              style={smallBtn}
            >
              Edit
            </a>

            <button
              onClick={() => handleDelete(item.id)}
              style={{ ...smallBtn, background: "#ff4d4f" }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const containerStyle: React.CSSProperties = {
  maxWidth: 900,
  margin: "40px auto",
  padding: 24,
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
};

const cardStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid #e5e5e5",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "12px",
  background: "#fafafa",
};

const smallBtn: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  fontSize: "13px",
  background: "#444",
  color: "#fff",
  marginLeft: "6px",
  textDecoration: "none",
};
