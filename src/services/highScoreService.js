import { onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const getUserHighScore = async (uid) => {
  const userRef = doc(db, "users", uid);
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) return 0;

  return snapShot.data().highScore ?? 0;
};

export const listenToHighScore = (uid, callback) => {
  const userRef = doc(db, "users", uid);

  return onSnapshot(userRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data().highScore ?? 0);
    }
  });
};

export const updateHighScore = async (uid, score) => {
  const userRef = doc(db, "users", uid);

  const snapShot = await getDoc(userRef);
  const currentHighScore = snapShot.data()?.highScore ?? 0;

  if (currentHighScore >= score) {
    throw new Error("Not enough to beat the current highscore!");
  }

  await updateDoc(useRef, {
    highScore: score,
  });

  console.log("New highscore: ", score);
};
