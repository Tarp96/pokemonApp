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

export const addCoins = async (uid, amount) => {
  const userRef = doc(db, "users", uid);

  await updateDoc(userRef, {
    coins: increment(amount),
  });
};

export const spendCoins = async (uid, amount) => {
  const userRef = doc(db, "users", uid);

  const snapshot = await getDoc(userRef);
  const currentCoins = snapshot.data()?.coins ?? 0;

  if (currentCoins < amount) {
    throw new Error("Not enough coins");
  }

  await updateDoc(userRef, {
    coins: increment(-amount),
    coinsSpent: increment(amount),
  });
  console.log("Current:", currentCoins, "Price:", amount);
};

export const listenToCoins = (uid, callback) => {
  const userRef = doc(db, "users", uid);

  return onSnapshot(userRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data().coins ?? 0);
    }
  });
};
