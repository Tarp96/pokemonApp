import { NavLink } from "react-router-dom";

export const GameStartScreen = ({
  selectedDifficulty,
  onDifficultyChange,
  onStart,
  isLoggedIn,
}) => {
  return (
    <div className="gameScreenContainer gameStartPageContainer">
      {!isLoggedIn ? (
        <div className="loginReminderContainer">
          <p className="loginReminderText">
            Looks like you are not logged in. Please{" "}
            <NavLink to="/login">log in</NavLink> or create an account to play!
          </p>
        </div>
      ) : (
        <>
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
              onClick={() => onDifficultyChange("Easy")}
              className="difficultyBtn easy"
            >
              Easy
            </button>

            <button
              onClick={() => onDifficultyChange("Medium")}
              className="difficultyBtn medium"
            >
              Medium
            </button>

            <button
              onClick={() => onDifficultyChange("Hard")}
              className="difficultyBtn hard"
            >
              Hard
            </button>
          </div>

          <div className="gameStartButtonContainer">
            <button className="gameStartButton" onClick={onStart}>
              Start
              <img src="assets/pokeb.png" alt="pokeball icon" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
