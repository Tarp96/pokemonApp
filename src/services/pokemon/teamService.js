import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
  runTransaction,
} from "firebase/firestore";

import { db, auth } from "../../firebaseConfig";

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

export const getTeamSize = async () => {
  const team = await getUserTeam();
  return team.length;
};

export const removePokemonFromTeam = async (pokemonId) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  const userRef = doc(db, "users", user.uid);
  const teamRef = doc(db, "users", user.uid, "team", pokemonId.toString());
  const teamCollectionRef = collection(db, "users", user.uid, "team");

  await runTransaction(db, async (transaction) => {
    const userSnap = await transaction.get(userRef);
    const teamSnap = await transaction.get(teamRef);

    if (!userSnap.exists()) {
      throw new Error("User not found");
    }

    if (!teamSnap.exists()) {
      throw new Error("Pokémon not found in team");
    }

    const teamSnapshot = await getDocs(teamCollectionRef);
    const realTeamCount = teamSnapshot.size;

    transaction.delete(teamRef);

    transaction.update(userRef, {
      teamCount: Math.max(realTeamCount - 1, 0),
    });
  });
};

export const getUserTeamIds = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const teamRef = collection(db, "users", user.uid, "team");
  const snapshot = await getDocs(teamRef);

  return snapshot.docs.map((doc) => doc.id);
};

export const listenToTeam = (uid, callback) => {
  const teamRef = collection(db, "users", uid, "team");

  return onSnapshot(teamRef, (snapshot) => {
    const ids = snapshot.docs.map((doc) => doc.id);
    callback(ids);
  });
};
