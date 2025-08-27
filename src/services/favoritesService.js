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

export const addFavorite = async (pokemonName) => {
  try {
    const docRef = await addDoc(favoritesRef, { name: pokemonName });
    return docRef.id;
  } catch (error) {
    console.error("Error adding favorite", error);
  }
};
