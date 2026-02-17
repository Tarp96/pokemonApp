export const PaymentModal = ({
  pokemon,
  price,
  coinBalance,
  coinAmountAfterPurchase,
  purchaseOnClick,
  closeModalOnClick,
}) => {
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
