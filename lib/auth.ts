"use client";

import { db, auth } from "./firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const provider = new GoogleAuthProvider();

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
    }

    return user;
  } catch (err) {
    console.error("Google Sign-in Error:", err);
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error("Logout Error:", err);
  }
};

export const listenToAuth = (callback: (user: any) => void) => {
  if (typeof window === "undefined") return () => {};
  return onAuthStateChanged(auth, (user) => callback(user));
};
