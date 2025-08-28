import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import db from "../firebaseConfig";

const favoritesRef = collection(db, "favorites");

export const isAlreadyFavorited = async (name) => {
  const snapshot = await getDocs(collection(db, "favorites"));
  return snapshot.docs.map((doc) => doc.data().name).includes(name);
};

export const addFavorite = async (pokemon) => {
  try {
    await addDoc(favoritesRef, {
      name: pokemon.name,
      id: pokemon.id,
      sprite: pokemon.sprites.front_default,
      types: pokemon.types.map((t) => t.type.name),
    });
  } catch (error) {
    console.error("Error adding pokemon to database:", error);
  }
};

export const removeFavorite = async (pokemonName) => {
  try {
    const q = query(favoritesRef, where("name", "==", pokemonName));
    const snapshot = await getDocs(q);

    snapshot.forEach(async (docItem) => {
      await deleteDoc(doc(db, "favorites", docItem.id));
    });
  } catch (error) {
    console.error("Error removing pokemon from favorites", error);
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
