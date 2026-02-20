"use client";

import { db } from "./firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

declare global {
  interface Window {
    // No OTP stuff needed
  }
}

const provider = new GoogleAuthProvider();

/* ---------------- SIGN IN ---------------- */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Create / get user document
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
