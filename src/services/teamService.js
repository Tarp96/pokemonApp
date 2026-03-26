import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
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

export const getTeamSize = async () => {
  const team = await getUserTeam();
  return team.length;
};

export const removePokemonFromTeam = async (pokemonId) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  await deleteDoc(doc(db, "users", user.uid, "team", pokemonId.toString()));
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
