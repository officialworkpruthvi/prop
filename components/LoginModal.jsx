"use client";
import { signInWithGoogle } from "@/lib/auth";

export default function LoginModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md shadow-xl">
        <h2 className="text-2xl font-semibold mb-2">Welcome</h2>
        <p className="text-gray-500 mb-6">
          Sign in to continue
        </p>

        <button
          onClick={async () => {
            await signInWithGoogle();
            onClose();
          }}
          className="w-full bg-white border rounded-xl py-3 flex items-center justify-center gap-3 hover:shadow transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5"
          />
          Continue with Google
        </button>

        <button
          onClick={onClose}
          className="mt-5 text-sm text-gray-400 w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
