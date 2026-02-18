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

  function returnCoinTotalAfterPurchase(a, b) {
    return a - b;
  }

  return (
    <div className="paymentModalOverlay">
      <div className="paymentModalContainer modalPop">
        <h2 className="paymentModalNameTitle">Buy {pokemon?.name}?</h2>
        <p className="paymentModalInfo">Your coin balance: {coinBalance}</p>
        <p className="paymentModalInfo">Price: {price}</p>
        <p className="paymentModalInfo">
          Remaining coins: {returnCoinTotalAfterPurchase(coinBalance, price)}
        </p>

        <div className="paymentModalBtnRow">
          <button onClick={purchaseOnClick} className="paymentModalPayBtn">
            Buy
          </button>
          <button onClick={closeModalOnClick} className="paymentModalCancelBtn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
