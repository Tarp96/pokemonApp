import { getPokemonPrice } from "../data/pokemonPricing";
import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { listenToCoins, spendCoins } from "../services/coinService";

export const PaymentModal = ({
  pokemon,

  closeModalOnClick,
}) => {
  const [coinBalance, setCoinBalance] = useState();
  const [user, setUser] = useState();
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const unsubscribe = listenToCoins(user.uid, setCoinBalance);
    setUser(user.uid);
    return () => unsubscribe();
  }, []);

  const price = pokemon?.name ? getPokemonPrice(pokemon?.name) : 0;

  function returnCoinTotalAfterPurchase(a, b) {
    return a - b;
  }

  const handlePurchase = async () => {
    if (buying) return;
    setBuying(true);

    try {
      await spendCoins(user, price);
      closeModalOnClick();
    } finally {
      setBuying(false);
    }
  };

  return (
    <div className="paymentModalOverlay">
      <div className="paymentModalContainer modalPop">
        <div className="paymentModalHeaderRow">
          <img
            src={pokemon?.sprites?.front_default}
            alt={pokemon?.name}
            className="paymentModalSprite"
          />

          <div className="paymentModalHeaderInfo">
            <h2 className="paymentModalNameTitle">{pokemon?.name}</h2>
            <p className="paymentModalPriceTag">Price: {price} coins</p>
          </div>
        </div>

        <p className="paymentModalInfo">Your coin balance: {coinBalance}</p>
        <p className="paymentModalInfo">
          Remaining coins: {returnCoinTotalAfterPurchase(coinBalance, price)}
        </p>

        <div className="paymentModalBtnRow">
          <button
            onClick={handlePurchase}
            className="paymentModalPayBtn"
            disabled={buying}
          >
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
