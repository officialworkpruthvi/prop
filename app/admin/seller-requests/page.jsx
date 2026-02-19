"use client";

import { useEffect, useState } from "react";
import {
  getSellerRequests,
  approveSellerRequest,
  rejectSellerRequest,
  sendSellerMessage,
} from "@/lib/admin";

export default function SellerRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getSellerRequests();
    setRequests(data);
    setLoading(false);
  };

  const handleApprove = async (req) => {
    await approveSellerRequest(req);
    alert("Listing published 🎉");
    fetchData();
  };

  const handleReject = async (id) => {
    await rejectSellerRequest(id);
    fetchData();
  };

  const handleMessage = async (id) => {
    const msg = prompt("Enter message for seller");
    if (!msg) return;
    await sendSellerMessage(id, msg);
    alert("Message sent");
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-8">
        Seller Requests
      </h1>

      <div className="space-y-6">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white p-6 rounded-2xl shadow"
          >
            <h2 className="text-xl font-semibold">
              {req.propertyName}
            </h2>

            <p className="text-gray-600">{req.address}</p>
            <p className="text-sm mt-2">
              Seller: {req.userName} • {req.userEmail}
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleApprove(req)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Approve & Publish
              </button>

              <button
                onClick={() => handleReject(req.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Reject
              </button>

              <button
                onClick={() => handleMessage(req.id)}
                className="bg-black text-white px-4 py-2 rounded-lg"
              >
                Message Seller
              </button>
            </div>

            {req.status && (
              <p className="mt-3 text-sm text-gray-500">
                Status: {req.status}
              </p>
            )}

            {req.adminMessage && (
              <p className="mt-2 text-sm text-blue-600">
                Message: {req.adminMessage}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
