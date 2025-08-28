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

export const addFavorite = async (pokemon) => {
  try {
    await addDoc(collection(db, "favorites"), {
      name: pokemon.name,
      id: pokemon.id,
      sprite: pokemon.sprites.front_default,
      types: pokemon.types.map((t) => t.type.name),
    });
  } catch (error) {
    console.error("Error adding pokemon to database:", error);
  }
};
