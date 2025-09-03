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
  const snapshot = await getDocs(collection(db, "favorites"));
  return snapshot.docs.map((doc) => doc.data().name).includes(name);
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
  try {
    const snapshot = await getDocs(favoritesRef);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error retrieving favorites", error);
    return [];
  }
};
