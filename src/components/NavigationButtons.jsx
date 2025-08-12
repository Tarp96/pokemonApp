export const NavigationButtons = ({ prevPage, nextPage }) => {
  return (
    <div className="navigationButtonContainer">
      <div>
        <button onClick={prevPage} className="navigationButton">
          <p className="navigationButtonText">Prev</p>
        </button>
        <button onClick={nextPage} className="navigationButton">
          <p className="navigationButtonText">Next</p>
        </button>
      </div>
    </div>
  );
};
