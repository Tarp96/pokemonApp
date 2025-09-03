import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../firebaseConfig";

const favoritesRef = collection(db, "favorites");

export const isAlreadyFavorited = async (name) => {
  const user = auth.currentUser;
  if (!user) {
    return false;
  }

  const favoritesRef = collection(db, "users", user.uid, "favorites");

  try {
    const snapshot = await getDocs(favoritesRef);
    return snapshot.docs.some((doc) => doc.data().name === name);
  } catch (error) {
    console.error("Error checking favorite:", error);
    return false;
  }
};

export const addFavorite = async (pokemon) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  const favoriteRef = doc(
    db,
    "users",
    user.uid,
    "favorites",
    pokemon.id.toString()
  );

  try {
    await setDoc(favoriteRef, {
      name: pokemon.name,
      id: pokemon.id,
      sprite: pokemon.sprites.front_default,
      types: pokemon.types.map((t) => t.type.name),
      generation: pokemon.generation,
      cries: pokemon.cries?.legacy,
      savedAt: new Date(),
    });
  } catch (error) {
    console.error("Error saving favorite:", error);
  }
};

export const removeFavorite = async (pokemonName) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  const favoritesRef = collection(db, "users", user.uid, "favorites");
  const q = query(favoritesRef, where("name", "==", pokemonName));

  try {
    const snapshot = await getDocs(q);
    const batch = snapshot.docs.map((docItem) =>
      deleteDoc(doc(db, "users", user.uid, "favorites", docItem.id))
    );
    await Promise.all(batch);
  } catch (error) {
    console.error("Error removing Pokémon from favorites:", error);
  }
};

export const getAllFavorites = async () => {
  const user = auth.currentUser;
  if (!user) {
    return [];
  }

  const favoritesRef = collection(db, "users", user.uid, "favorites");

  try {
    const snapshot = await getDocs(favoritesRef);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error retrieving favorites:", error);
    return [];
  }
};
