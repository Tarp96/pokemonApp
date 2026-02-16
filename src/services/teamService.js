import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../firebaseConfig";

export const getUserTeam = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const teamRef = collection(db, "users", user.uid, "team");
  const snapshot = await getDocs(teamRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
