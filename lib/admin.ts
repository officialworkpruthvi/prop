import { db } from "./firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

interface SellerRequest {
  id: string;
  propertyName: string;
  developerName: string;
  sellerPhone?: string;
  status?: string;
  adminMessage?: string;
  [key: string]: any;
}


// GET ALL REQUESTS
export const getSellerRequests = async () => {
  const snap = await getDocs(collection(db, "seller_requests"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const approveSellerRequest = async (req : SellerRequest) => {
  const {
    id,
    sellerPhone,
    adminMessage,
    status,
    startingPrice,
    priceLabel,
    ...rest
  } = req;

  // ⭐ Convert seller request → listing schema
  const listingData = {
    ...rest,

    price: {
      startingPrice: startingPrice || "",
      priceLabel: priceLabel || "",
    },

    publishedAt: serverTimestamp(),
    sourceRequestId: id,
  };

  // Save listing using SAME ID
  await setDoc(doc(db, "listings", id), listingData);

  // Update request status
  await updateDoc(doc(db, "seller_requests", id), {
    status: "approved",
    publishedAt: serverTimestamp(),
  });
};




// REJECT REQUEST
export const rejectSellerRequest = async (id) => {
  await updateDoc(doc(db, "seller_requests", id), {
    status: "rejected",
  });
};

// MESSAGE SELLER
export const sendSellerMessage = async (id, message) => {
  await updateDoc(doc(db, "seller_requests", id), {
    adminMessage: message,
  });
};
