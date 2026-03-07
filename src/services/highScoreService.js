import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firstore";

export const getUserHighScore = async (uid) => {
  const userRef = doc(db, "users", uid);
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) return 0;

  return snapShot.data().highScore ?? 0;
};
