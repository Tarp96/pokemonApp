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
        aria-pressed={!condition}
        aria-label={`${firstText} view`}
      >
        {firstText}
      </button>

      <button
        className={`tabButton ${condition ? "active" : ""} ${className}`}
        onClick={onClick}
        aria-pressed={condition}
        aria-label={`${secondText} view`}
      >
        {secondText}
      </button>
    </>
  );
};
