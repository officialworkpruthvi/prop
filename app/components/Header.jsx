"use client";

import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import { listenToAuth, logoutUser } from "@/lib/auth";
import dynamic from "next/dynamic";

// Optional: dynamically load LoginModal to be extra safe
const DynamicLoginModal = dynamic(() => import("./LoginModal"), { ssr: false });

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => listenToAuth(setUser), []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className={`font-bold text-xl ${scrolled ? "text-gray-900" : "text-white"}`}>
            Matrubhumi
          </div>

          <div className="flex items-center gap-3">
            {!user && (
              <button
                onClick={() => setLoginOpen(true)}
                className="px-4 py-2 rounded-full text-sm font-semibold bg-green-600 text-white"
              >
                Sign In
              </button>
            )}

            {user && (
              <div className="relative">
                <img
                  src={user.photoURL}
                  onClick={() => setDropdown(!dropdown)}
                  className="w-10 h-10 rounded-full cursor-pointer border"
                />
                {dropdown && (
                  <div className="absolute right-0 mt-3 bg-white shadow-xl rounded-xl p-3 w-48">
                    <p className="font-medium">{user.displayName}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <hr className="my-2" />
                    <button
                      onClick={() => (window.location.href = "/dashboard")}
                      className="block w-full text-left py-2 hover:text-green-600"
                    >
                      My Dashboard
                    </button>
                    <button
                      onClick={logoutUser}
                      className="block w-full text-left py-2 text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <DynamicLoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
