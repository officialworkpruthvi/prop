import { db } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";

// =============================
// GET ALL SELLER REQUESTS
// =============================
export const getSellerRequests = async () => {
  const snapshot = await getDocs(collection(db, "seller_requests"));

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
};

// =============================
// APPROVE REQUEST → MOVE TO LISTINGS
// =============================
export const approveSellerRequest = async (request: any) => {
  // 1️⃣ publish to listings collection
  await addDoc(collection(db, "listings"), {
    ...request,
    createdAt: new Date(),
    source: "seller",
  });

  // 2️⃣ update request status
  await updateDoc(doc(db, "seller_requests", request.id), {
    status: "approved",
  });
};

// =============================
// REJECT REQUEST
// =============================
export const rejectSellerRequest = async (id: string) => {
  await updateDoc(doc(db, "seller_requests", id), {
    status: "rejected",
  });
};

// =============================
// SEND MESSAGE TO SELLER
// =============================
export const sendSellerMessage = async (id: string, message: string) => {
  await updateDoc(doc(db, "seller_requests", id), {
    adminMessage: message,
  });
};
