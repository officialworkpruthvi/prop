"use client";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";

// 🔐 ADMIN EMAIL ALLOWLIST
const ADMIN_EMAILS = ["samarthbhuruk@gmail.com"];

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userEmail = userCred.user.email;

      // 🚫 BLOCK NON-ADMIN USERS
      if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
        await signOut(auth);
        throw new Error("Not an admin");
      }

      // ✅ ADMIN VERIFIED
      router.push("/admin/dashboard");
    } catch (err) {
      setError("Unauthorized access");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-[360px]"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Admin Email"
          className="w-full mb-4 p-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
        >
          {loading ? "Checking access..." : "Login"}
        </button>
      </form>
    </div>
  );
}
