import { getPokemonPrice } from "../data/pokemonPricing";

export const PaymentModal = ({
  pokemon,
  purchaseOnClick,
  closeModalOnClick,
}) => {
  const price = pokemon?.name ? getPokemonPrice(pokemon?.name) : 0;

  return (
    <div className="paymentModalOverlay">
      <div className="paymentModalContainer modalPop">
        <h2>Buy {pokemon?.name}?</h2>
        <p>{price}</p>
        <p>{coinBalance}</p>
        <p>{coinAmountAfterPurchase}</p>

        <button onClick={purchaseOnClick}>Buy</button>
        <button onClick={closeModalOnClick}>Cancel</button>
      </div>
    </div>
  );
};
