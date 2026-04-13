import { onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

export const getPokemonCaught = async (uid) => {
  const userRef = doc(db, "users", uid);
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) return 0;

  return snapShot.data().pokemonCaught ?? 0;
};

export const listenToPokemonCaught = (uid, callback) => {
  const userRef = doc(db, "users", uid);

  return onSnapshot(userRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.data().pokemonCaught ?? 0);
    }
  });
};

export const updatePokemonCaught = async (uid, score) => {
  const userRef = doc(db, "users", uid);

  await updateDoc(userRef, {
    pokemonCaught: increment(score),
  });

  console.log("Incremented pokemonCaught by:", score);
};
