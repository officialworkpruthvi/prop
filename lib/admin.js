import { db } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";


// 🔹 Get seller requests
export const getSellerRequests = async () => {
  const snapshot = await getDocs(collection(db, "seller_requests"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};


// 🔹 Approve request → move to listings
export const approveSellerRequest = async (request) => {
  // add to listings collection
  await addDoc(collection(db, "listings"), {
    ...request,
    createdAt: new Date(),
    source: "seller",
  });

  // mark request approved
  await updateDoc(doc(db, "seller_requests", request.id), {
    status: "approved",
  });
};


// 🔹 Reject request
export const rejectSellerRequest = async (id) => {
  await updateDoc(doc(db, "seller_requests", id), {
    status: "rejected",
  });
};


// 🔹 Send message to seller
export const sendSellerMessage = async (id, message) => {
  await updateDoc(doc(db, "seller_requests", id), {
    adminMessage: message,
  });
};
