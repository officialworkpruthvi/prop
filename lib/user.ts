import { db } from "./firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

export const getUserRequests = async (email: string) => {
  const q = query(
    collection(db, "seller_requests"),
    where("userEmail", "==", email), // ✅ FIXED
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
};
