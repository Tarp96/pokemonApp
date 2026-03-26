import { db } from "../firebaseConfig";
import { formatPokemonForTeam } from "../utils/formatPokemon";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  onSnapshot,
  runTransaction,
} from "firebase/firestore";

export const getUserCoins = async (uid) => {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) return 0;

  return snapshot.data().coins ?? 0;
};

export const addCoins = async (uid, amount) => {
  const userRef = doc(db, "users", uid);

  if (typeof amount !== "number" || isNaN(amount)) {
    console.error("Invalid coin amount:", amount);
    return;
  }

  await updateDoc(userRef, {
    coins: increment(amount),
  });
};

export const purchasePokemon = async (uid, pokemon, price) => {
  const userRef = doc(db, "users", uid);
  const teamRef = doc(db, "users", uid, "team", pokemon.id.toString());

  await runTransaction(db, async (transaction) => {
    const userSnap = await transaction.get(userRef);
    const teamSnap = await transaction.get(teamRef);

    if (!userSnap.exists()) {
      throw new Error("User not found");
    }

    if (teamSnap.exists()) {
      throw new Error("You already own this Pokémon");
    }

    const currentCoins = userSnap.data().coins ?? 0;

    if (currentCoins < price) {
      throw new Error("Not enough coins");
    }

    const teamCollectionRef = collection(db, "users", uid, "team");
    const teamSnapshot = await transaction.get(teamCollectionRef);

    if (teamSnapshot.size >= 6) {
      throw new Error("Team is full");
    }

    transaction.update(userRef, {
      coins: currentCoins - price,
      coinsSpent: (userSnap.data().coinsSpent ?? 0) + price,
    });

    transaction.set(teamRef, formatPokemonForTeam(pokemon));
  });
};

export const listenToCoins = (uid, callback) => {
  const userRef = doc(db, "users", uid);

  return onSnapshot(userRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data().coins ?? 0);
    }
  });
};
