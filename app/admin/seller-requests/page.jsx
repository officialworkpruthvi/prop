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
  const [tab, setTab] = useState("pending");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const data = await getSellerRequests();
    setRequests(data);
    setLoading(false);
  };

  const filtered = requests.filter(r => r.status === tab);

  const handleApprove = async (req) => {
    await approveSellerRequest(req);
    fetchData();
  };

  const handleReject = async (id) => {
    await rejectSellerRequest(id);
    fetchData();
  };

  const handleMessage = async (id) => {
    const msg = prompt("Message to seller");
    if (!msg) return;
    await sendSellerMessage(id, msg);
    fetchData();
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Seller Requests</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        {["pending","approved","rejected"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-full ${
              tab===t ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid gap-6">
        {filtered.map(req => (
          <div key={req.id} className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold">{req.propertyName}</h2>
            <p className="text-gray-500">{req.address}</p>
            <p className="text-sm mt-1">
              {req.userName} • {req.userEmail}
            </p>
            {req.sellerPhone && (
  <p className="text-sm text-green-700 mt-1">
    📞 {req.sellerPhone}
  </p>
)}

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

            {req.adminMessage && (
              <p className="text-blue-600 mt-3 text-sm">
                Admin: {req.adminMessage}
              </p>
            )}
          </div>
        ))}
      </div>

      {selected && <PreviewModal req={selected} close={()=>setSelected(null)} />}
    </div>
  );
}
function PreviewModal({ req, close }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-6 z-50">
      <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-8">
        <button onClick={close} className="float-right text-xl">✕</button>

        <h2 className="text-2xl font-semibold mb-6">{req.propertyName}</h2>

        <Section title="Basic Info">
          <p>Developer: {req.developerName}</p>
          <p>Type: {req.propertyType}</p>
          <p>Status: {req.statusText}</p>
          <p>RERA: {req.reraId}</p>
        </Section>

        <Section title="Price">
          <p>Starting Price: {req.startingPrice}</p>
          <p>{req.priceLabel}</p>
          <p>Possession: {req.possessionDate}</p>
        </Section>

        <Section title="Location">
          <p>{req.address}</p>
          <a href={req.mapLink} target="_blank" className="text-blue-600">
            View Map
          </a>
        </Section>

        <Section title="Project">
          <p>Area: {req.projectArea}</p>
          <p>Units: {req.totalUnits}</p>
        </Section>

        <Section title="Configurations">
          {req.configurations?.map((c,i)=>(
            <p key={i}>{c.type} • {c.carpetArea}</p>
          ))}
        </Section>

        <Section title="Amenities">
          {req.amenities?.join(", ")}
        </Section>
      </div>
    </div>
  );
}

function Section({title, children}) {
  return (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      {children}
    </div>
  );
}
