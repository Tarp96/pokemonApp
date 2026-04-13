import { db } from "../../firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";

export const getUserProfile = async (uid) => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    throw new Error("User not found");
  }

  return snap.data();
};

export const updateUserAvatar = async (uid, avatarId) => {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, { avatarId });
};

export const updateUserQuote = async (uid, quoteId) => {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, { quoteId });
};
