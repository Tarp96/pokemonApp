import { getPokemonPrice } from "../../data/pokemonPricing";
import { useState, useEffect, useRef } from "react";
import { auth } from "../../firebaseConfig";
import { listenToCoins, purchasePokemon } from "../../services/coinService";
import { useAuth } from "../../contexts/authContext/AuthContext";
import { useNavigate } from "react-router-dom";

export const PaymentModal = ({ pokemon, closeModalOnClick }) => {
  const [coinBalance, setCoinBalance] = useState();
  const [user, setUser] = useState();
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [displayCoins, setDisplayCoins] = useState(coinBalance ?? 0);
  const [errorMessage, setErrorMessage] = useState("");

  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const unsubscribe = listenToCoins(user.uid, setCoinBalance);
    setUser(user.uid);
    return () => unsubscribe();
  }, []);

  const modalRef = useRef(null);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const focusableSelectors = `
    button,
    [href],
    input,
    select,
    textarea,
    [tabindex]:not([tabindex="-1"])
  `;

    const focusableElements = modal.querySelectorAll(focusableSelectors);

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    modal.addEventListener("keydown", handleKeyDown);

    return () => {
      modal.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModalOnClick();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (coinBalance == null) return;

    let frame;

    const animate = () => {
      setDisplayCoins((prev) => {
        const diff = coinBalance - prev;

        if (Math.abs(diff) < 1) {
          return coinBalance;
        }

        return prev + diff * 0.2;
      });

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(frame);
  }, [coinBalance]);

  const price = pokemon?.name ? getPokemonPrice(pokemon?.name) : 0;

  function returnCoinTotalAfterPurchase(a, b) {
    return a - b;
  }

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleOverlayClick = () => {
    if (paymentStatus === "processing") return;
    closeModalOnClick();
  };

  const handlePurchase = async () => {
    if (!user) return;
    if (!userLoggedIn) return;

    try {
      setPaymentStatus("processing");

      await purchasePokemon(user, pokemon, price);

      setPaymentStatus("success");

      await delay(600);
      closeModalOnClick();
    } catch (err) {
      console.error(err);
      setPaymentStatus("error");
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="paymentModalOverlay" onClick={handleOverlayClick}>
      <div
        className={`paymentModalContainer modalPop ${
          paymentStatus === "success"
            ? "successFlash"
            : paymentStatus === "error"
              ? "errorFlash"
              : ""
        }`}
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        onClick={(e) => e.stopPropagation()}
        aria-modal="true"
        aria-labelledby="payment-modal-title"
        aria-describedby="payment-modal-description"
      >
        {!userLoggedIn ? (
          <div className="paymentModalAuthWarning" role="alert">
            <p>You need to be logged in to purchase Pokémon.</p>
            <button
              onClick={() => navigate("/login")}
              className="paymentModalPayBtn"
            >
              Go to Login
            </button>
          </div>
        ) : (
          <div>
            <div className="paymentModalHeaderRow">
              <img
                src={
                  pokemon?.sprites?.front_default ||
                  pokemon?.sprite ||
                  pokemon?.sprites?.other?.["official-artwork"]?.front_default
                }
                alt={`${pokemon?.name} sprite`}
                className="paymentModalSprite"
              />

              <div className="paymentModalHeaderInfo">
                <h2 id="payment-modal-title" className="paymentModalNameTitle">
                  {pokemon?.name}
                </h2>
              </div>
            </div>

            <p
              className={`paymentModalInfo ${
                displayCoins !== coinBalance ? "coinAnimating" : ""
              }`}
            >
              Your coin balance: {Math.floor(displayCoins)}
            </p>
            <p className="paymentModalInfo">
              Remaining coins:{" "}
              {coinBalance != null
                ? returnCoinTotalAfterPurchase(coinBalance, price)
                : "..."}
            </p>

            {paymentStatus === "processing" && (
              <p className="paymentModalStatus processing">
                Payment processing...
              </p>
            )}

            {paymentStatus === "success" && (
              <p className="paymentModalStatus success">
                Purchase successful! 🎉
              </p>
            )}

            {paymentStatus === "error" && (
              <p className="paymentModalStatus error">{errorMessage}!</p>
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
        )}
      </div>
    </div>
  );
};
