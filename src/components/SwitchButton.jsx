export const SwitchButton = ({
  onClick,
  condition,
  firstText,
  secondText,
  className = "",
}) => {
  return (
    <div role="group" aria-label="Toggle option">
      <button
        className={`tabButton ${!condition ? "active" : ""} ${className}`}
        onClick={() => !condition && onClick()}
        aria-pressed={!condition}
      >
        {firstText}
      </button>

      <button
        className={`tabButton ${condition ? "active" : ""} ${className}`}
        onClick={() => condition && onClick()}
        aria-pressed={condition}
      >
        {secondText}
      </button>
    </div>
  );
};
