export const PaymentModal = ({
  name,
  price,
  coinBalance,
  coinAmountAfterPurchase,
}) => {
  return (
    <>
      <h2>Buy {name}?</h2>
      <p>{price}</p>
      <p>{coinBalance}</p>
      <p>{coinAmountAfterPurchase}</p>

      <button>Buy</button>
      <button>Cancel</button>
    </>
  );
};
