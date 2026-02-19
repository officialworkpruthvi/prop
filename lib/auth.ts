"use client";

import { db } from "./firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Google provider
const provider = new GoogleAuthProvider();

/* ---------------- SIGN IN ---------------- */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // 🔥 create / get user document
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    // If new user → save in Firestore
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        createdAt: serverTimestamp(),
      });

      console.log("New user saved to Firestore");
    } else {
      console.log("Existing user logged in");
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
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
// Setup invisible recaptcha
export const setupRecaptcha = (containerId: string) => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      containerId,
      {
        size: "invisible",
      }
    );
  }
};

// Send OTP
export const sendOTP = async (phoneNumber) => {
  setupRecaptcha("recaptcha-container");

  const appVerifier = window.recaptchaVerifier;

  const confirmationResult = await signInWithPhoneNumber(
    auth,
    phoneNumber,
    appVerifier
  );

  window.confirmationResult = confirmationResult;
};

// Verify OTP
export const verifyOTP = async (otp) => {
  const result = await window.confirmationResult.confirm(otp);
  return result.user;
};
