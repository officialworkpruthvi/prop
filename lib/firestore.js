import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const submitSellerRequest = async (data) => {
  await addDoc(collection(db, "seller_requests"), {
    ...data,
    status: "pending",
    adminMessage: "",
    createdAt: serverTimestamp(),
  });
};
