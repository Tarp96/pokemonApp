export const SwitchButton = ({ onClick, condition, firstText, secondText }) => {
  return (
    <>
      <button
        className={`tabButton ${!condition ? "active" : ""}`}
        onClick={onClick}
      >
        {firstText}
      </button>
      <button
        className={`tabButton ${condition ? "active" : ""}`}
        onClick={onClick}
      >
        {secondText}
      </button>
    </>
  );
};
