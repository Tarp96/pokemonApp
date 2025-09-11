export const SwitchButton = ({
  onClick,
  condition,
  firstText,
  secondText,
  className = "",
}) => {
  return (
    <>
      <button
        className={`tabButton ${!condition ? "active" : ""} ${className}`}
        onClick={onClick}
      >
        {firstText}
      </button>
      <button
        className={`tabButton ${condition ? "active" : ""} ${className}`}
        onClick={onClick}
      >
        {secondText}
      </button>
    </>
  );
};
