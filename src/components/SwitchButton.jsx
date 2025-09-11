export const SwitchButton = ({ onClick, condition }) => {
  return (
    <>
      <button
        className={`tabButton ${!condition ? "active" : ""}`}
        onClick={onClick}
      >
        Normal
      </button>
      <button
        className={`tabButton ${condition ? "active" : ""}`}
        onClick={onClick}
      >
        Shiny
      </button>
    </>
  );
};
