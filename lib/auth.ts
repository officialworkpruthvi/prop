// lib/auth.ts
"use client";

import { db } from "./firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

const provider = new GoogleAuthProvider();

/* ---------------- SIGN IN ---------------- */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        createdAt: serverTimestamp(),
      });
      console.log("New user saved to Firestore");
    }

    return user;
  } catch (err) {
    console.error("Google Sign-in Error:", err);
  }
};

/* ---------------- LOGOUT ---------------- */
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error("Logout Error:", err);
  }
};

/* ---------------- AUTH LISTENER ---------------- */
export const listenToAuth = (callback: (user: any) => void) => {
  if (typeof window === "undefined") return () => {}; // prevent SSR errors
  return onAuthStateChanged(auth, (user) => callback(user));
};

// Setup invisible recaptcha (browser only)
export const setupRecaptcha = (containerId: string) => {
  if (typeof window === "undefined") return; // prevent SSR
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: "invisible",
    });
  }
};

// Send OTP (browser only)
export const sendOTP = async (phoneNumber: string) => {
  if (typeof window === "undefined") return;
  setupRecaptcha("recaptcha-container");

  const appVerifier = window.recaptchaVerifier;
  const confirmationResult = await signInWithPhoneNumber(
    auth,
    phoneNumber,
    appVerifier
  );
  window.confirmationResult = confirmationResult;
};

// Verify OTP (browser only)
export const verifyOTP = async (otp: string) => {
  if (typeof window === "undefined") return null;
  const result = await window.confirmationResult.confirm(otp);
  return result.user;
};
