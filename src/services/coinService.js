import { db } from "../firebaseConfig";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  onSnapshot,
} from "firebase/firestore";

export const getUserCoins = async (uid) => {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) return 0;

  return snapshot.data().coins ?? 0;
};
