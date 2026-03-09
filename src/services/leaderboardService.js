import { db } from "../firebaseConfig";
import {
  getDoc,
  doc,
  setDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  onSnapshot,
  where,
  getCountFromServer,
} from "firebase/firestore";

export const updateLeaderboard = async (uid, username, score) => {
  const leaderboardRef = doc(db, "leaderboard", uid);

  await setDoc(leaderboardRef, {
    uid,
    username,
    score,
    updatedAt: new Date(),
  });
};

export const getLeaderboardTop10 = async () => {
  const leaderboardQuery = query(
    collection(db, "leaderboard"),
    orderBy("score", "desc"),
    limit(10),
  );

  const snapshot = await getDocs(leaderboardQuery);

  return snapshot.docs.map((doc) => doc.data());
};

export const listenToLeaderboard = (callback) => {
  const leaderboardQuery = query(
    collection(db, "leaderboard"),
    orderBy("score", "desc"),
    limit(10),
  );

  return onSnapshot(leaderboardQuery, (snapshot) => {
    const leaderboard = snapshot.docs.map((doc) => doc.data());
    callback(leaderboard);
  });
};

export const getUserRank = async (uid) => {
  const playerDoc = await getDoc(doc(db, "leaderboard", uid));

  if (!playerDoc.exists()) {
    return { rank: null, score: null };
  }

  const playerScore = playerDoc.data().score;

  const betterScoresQuery = query(
    collection(db, "leaderboard"),
    where("score", ">", playerScore),
  );

  const snapshot = await getCountFromServer(betterScoresQuery);

  const rank = snapshot.data().count + 1;

  return {
    rank: rank,
    score: playerScore,
  };
};
