"use client";

import { useEffect, useState } from "react";

export default function SellerRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [tab, setTab] = useState("pending");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // 🔹 Lazy import admin functions to prevent SSR
      const admin = await import("@/lib/admin");
      const data = await admin.getSellerRequests();
      setRequests(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const filtered = requests.filter((r) => r.status === tab);

  const handleApprove = async (req) => {
    const admin = await import("@/lib/admin");
    await admin.approveSellerRequest(req);
    const data = await admin.getSellerRequests();
    setRequests(data);
  };

  const handleReject = async (id) => {
    const admin = await import("@/lib/admin");
    await admin.rejectSellerRequest(id);
    const data = await admin.getSellerRequests();
    setRequests(data);
  };

  const handleMessage = async (id) => {
    const msg = prompt("Message to seller");
    if (!msg) return;

    const admin = await import("@/lib/admin");
    await admin.sendSellerMessage(id, msg);
    const data = await admin.getSellerRequests();
    setRequests(data);
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Seller Requests</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        {["pending", "approved", "rejected"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-full ${
              tab === t ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid gap-6">
        {filtered.map((req) => (
          <div key={req.id} className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold">{req.propertyName}</h2>
            <p className="text-gray-500">{req.address}</p>
            <p className="text-sm mt-1">
              {req.userName} • {req.userEmail}
            </p>

            <div className="flex gap-3 mt-4 flex-wrap">
              <button
                onClick={() => setSelected(req)}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg"
              >
                View
              </button>

              {req.status === "pending" && (
                <>
                  <button
                    onClick={() => handleApprove(req)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(req.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
