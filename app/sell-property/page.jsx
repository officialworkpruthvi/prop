"use client";

import { useEffect, useState } from "react";

export default function SellPropertyPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [firebaseLib, setFirebaseLib] = useState(null); // ✅ just null, no `any`

  useEffect(() => {
    // Lazy-load Firebase modules only on the client
    import("@/lib/auth").then((mod) => {
      setFirebaseLib(mod); // store module reference

      const unsub = mod.listenToAuth(setUser);
      return () => unsub();
    });
  }, []);

  const handleSubmit = async () => {
    if (!user || !firebaseLib) return alert("Sign in first");

    setLoading(true);

    const { submitSellerRequest } = firebaseLib;

    const data = {
      userEmail: user.email,
      // ... add all your form data here
    };

    try {
      await submitSellerRequest(data);
      alert("Property submitted!");
    } catch (err) {
      console.error(err);
      alert("Error submitting");
    }

    setLoading(false);
  };

  if (!user) return <div>Please sign in first.</div>;

  return (
    <div className="max-w-3xl mx-auto py-16 px-6 space-y-6">
      <h1 className="text-3xl font-semibold">Sell Property</h1>

      {/* Your form inputs here */}

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-6 py-4 rounded-xl w-full"
      >
        {loading ? "Submitting..." : "Submit Property"}
      </button>
    </div>
  );
}
