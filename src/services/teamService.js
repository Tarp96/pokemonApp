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

export const getTeamSize = async () => {
  const team = await getUserTeam();
  return team.length;
};

export const addPokemonToTeam = async (pokemon) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const teamRef = collection(db, "users", user.uid, "team");

  const snapshot = await getDocs(teamRef);

  if (snapshot.size >= 6) {
    throw new Error("Team is full");
  }

  const pokemonRef = doc(db, "users", user.uid, "team", pokemon.id.toString());

  await setDoc(pokemonRef, {
    name: pokemon.name,
    id: pokemon.id,
    sprite: pokemon.sprites?.front_default || null,
    types: pokemon.types?.map((t) => t.type.name) || [],
    generation: pokemon.generation ?? "unknown",
    purchasedAt: new Date(),
  });
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
