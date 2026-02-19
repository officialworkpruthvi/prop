import { db } from "./firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export const getLiveListings = async () => {
  const q = query(
    collection(db, "listings"),
    orderBy("publishedAt", "desc")
  );

  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};
