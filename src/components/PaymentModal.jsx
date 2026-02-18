import { getPokemonPrice } from "../data/pokemonPricing";
import { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { listenToCoins } from "../services/coinService";

export const PaymentModal = ({
  pokemon,
  purchaseOnClick,
  closeModalOnClick,
}) => {
  const [coinBalance, setCoinBalance] = useState();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const unsubscribe = listenToCoins(user.uid, setCoinBalance);

    return () => unsubscribe();
  }, []);

  const price = pokemon?.name ? getPokemonPrice(pokemon?.name) : 0;

  return (
    <div className="paymentModalOverlay">
      <div className="paymentModalContainer modalPop">
        <h2>Buy {pokemon?.name}?</h2>
        <p>Price: {price}</p>

        <button onClick={purchaseOnClick}>Buy</button>
        <button onClick={closeModalOnClick}>Cancel</button>
      </div>
    </div>
  );
};
