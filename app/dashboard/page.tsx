"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getUserRequests } from "@/lib/user";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) return;

      setUser(u);
      const data = await getUserRequests(u.email);
      setRequests(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) return <p className="p-10">Loading dashboard...</p>;

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Properties</h1>

      {requests.length === 0 && (
        <p>You have not submitted any properties yet.</p>
      )}

      <div className="grid gap-6">
        {requests.map((req) => (
          <div key={req.id} className="border p-6 rounded-lg">
            <h2 className="text-xl font-semibold">{req.title}</h2>
            <p>{req.location}</p>
            <p className="mt-2">₹ {req.price}</p>

            <div className="mt-3">
              <span className="font-semibold">Status: </span>
              <span
                className={
                  req.status === "approved"
                    ? "text-green-600"
                    : req.status === "rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }
              >
                {req.status}
              </span>
            </div>

            {req.adminMessage && (
              <div className="mt-3 bg-gray-100 p-3 rounded">
                <strong>Admin message:</strong>
                <p>{req.adminMessage}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
