export const GameStartScreen = ({
  selectedDifficulty,
  onDifficultyChange,
  onStart,
}) => {
  return (
    <div className="gameStartPageContainer">
      <div className="gamePageContent">
        <h1>Ready to play?</h1>
        <p>Catch the pokemon that appears to earn coins</p>
      </div>

      <div className="difficultyButtonContainer">
        <h2>Choose difficulty</h2>
        <p>Higher difficulty gives more coins</p>

        <p>
          Selected Difficulty:{" "}
          <strong>{selectedDifficulty || "None selected"}</strong>
        </p>

        <button
          onClick={() => onDifficultyChange("easy")}
          className="difficultyBtn easy"
        >
          Easy
        </button>

        <button
          onClick={() => onDifficultyChange("medium")}
          className="difficultyBtn medium"
        >
          Medium
        </button>

        <button
          onClick={() => onDifficultyChange("hard")}
          className="difficultyBtn hard"
        >
          Hard
        </button>
      </div>

      <div className="gameStartButtonContainer">
        <button
          className="gameStartButton"
          onClick={onStart}
          disabled={!selectedDifficulty}
        >
          Start
          <img src="assets/pokeb.png" alt="pokeball icon" />
        </button>
      </div>
    </div>
  );
};
