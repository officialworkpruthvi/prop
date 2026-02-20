"use client"; // ✅ keep this

import { useEffect, useState } from "react";

export default function SellPropertyPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [firebase, setFirebase] = useState<any>(null); // lazy import

  useEffect(() => {
    // import Firebase only on client
    import("@/lib/auth").then((mod) => {
      const { listenToAuth } = mod;
      setFirebase(mod);

      const unsub = listenToAuth(setUser);
      return () => unsub();
    });
  }, []);

  const handleSubmit = async () => {
    if (!user || !firebase) return alert("Sign in first");

    setLoading(true);
    const { submitSellerRequest } = firebase;

    const data = { userEmail: user.email, /* ...rest of your form data */ };

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
    <div>
      <h1>Sell Property</h1>
      <button onClick={handleSubmit}>
        {loading ? "Submitting..." : "Submit Property"}
      </button>
    </div>
  );
}
