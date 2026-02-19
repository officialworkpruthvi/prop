import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";


// 🔹 Submit Seller Request
export const submitSellerRequest = async (data) => {
  await addDoc(collection(db, "seller_requests"), {
    ...data,
    status: "pending",
    createdAt: serverTimestamp(),
  });
};


// 🔹 Get Seller Requests for Logged User (Dashboard)
export const getUserSellerRequests = async (email) => {
  const q = query(
    collection(db, "seller_requests"),
    where("userEmail", "==", email),
    orderBy("createdAt", "desc")
  );

  const snap = await getDocs(q);

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
