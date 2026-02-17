export const PaymentModal = ({
  pokemon,
  price,
  coinBalance,
  coinAmountAfterPurchase,
}) => {
  return (
    <div className="paymentModalOverlay">
      <div className="paymentModalContainer modalPop">
        <h2>Buy {pokemon?.name}?</h2>
        <p>{price}</p>
        <p>{coinBalance}</p>
        <p>{coinAmountAfterPurchase}</p>

        <button>Buy</button>
        <button>Cancel</button>
      </div>
    </div>
  );
};
