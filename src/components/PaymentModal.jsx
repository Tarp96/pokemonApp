import { getPokemonPrice } from "../data/pokemonPricing";
import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { listenToCoins, spendCoins } from "../services/coinService";
import { addPokemonToTeam } from "../services/teamService";

export const PaymentModal = ({ pokemon, closeModalOnClick }) => {
  const [coinBalance, setCoinBalance] = useState();
  const [user, setUser] = useState();
  const [paymentStatus, setPaymentStatus] = useState("idle");

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
    if (!user) return;

    try {
      setPaymentStatus("processing");

      await spendCoins(user, price);

      setPaymentStatus("success");

      setTimeout(async () => {
        closeModalOnClick();

        await addPokemonToTeam(pokemon);
      }, 600);
    } catch (err) {
      console.error(err);
      setPaymentStatus("idle");
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
          Remaining coins:{" "}
          {coinBalance != null
            ? returnCoinTotalAfterPurchase(coinBalance, price)
            : "..."}
        </p>

        {paymentStatus === "processing" && (
          <p className="paymentModalStatus processing">Payment processing...</p>
        )}

        {paymentStatus === "success" && (
          <p className="paymentModalStatus success">Purchase successful! 🎉</p>
        )}

        <div className="paymentModalBtnRow">
          <button
            onClick={handlePurchase}
            className="paymentModalPayBtn"
            disabled={paymentStatus !== "idle"}
          >
            {paymentStatus === "processing" ? "Processing..." : "Buy"}
          </button>
          <button
            onClick={closeModalOnClick}
            className="paymentModalCancelBtn"
            disabled={paymentStatus === "processing"}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
