import { NavLink } from "react-router-dom";

export const GameStartScreen = ({
  selectedDifficulty,
  onDifficultyChange,
  onStart,
  shakeButtons,
  isLoggedIn,
}) => {
  return (
    <div className="gameScreenContainer gameStartPageContainer">
      {!isLoggedIn ? (
        <div className="loginReminderContainer">
          <img
            src="assets/psyduckSign.jpg"
            alt="yellow duck holding a sign"
            className="loginReminderImage"
          />
          <p className="loginReminderText">
            Looks like you are not logged in. Please{" "}
            <NavLink to="/login">log in</NavLink> or create an account to play!
          </p>

          <NavLink to="/login" className="loginReminderButton">
            Log In to Play
          </NavLink>
        </div>
      ) : (
        <>
          <div className="gameStartImageContainer">
            <img className="gameStartImage" src="assets/pokeArt.png" alt="" />
          </div>
          <div className="gameStartContent">
            <div className="gameStartPanel">
              <h1>Ready to play?</h1>

              <p className="gameStartPageP">
                Catch the pokemon that appears to earn coins
              </p>
              <h2>Choose difficulty</h2>
              <p className="gameStartPageP">
                Higher difficulty gives more coins
              </p>

              <p className="gameStartPageP">
                Selected Difficulty:{" "}
                <strong>{selectedDifficulty || "None selected"}</strong>
              </p>

              <button
                onClick={() => onDifficultyChange("Easy")}
                className={`difficultyBtn easy ${shakeButtons ? "shake" : ""}`}
              >
                Easy
              </button>

              <button
                onClick={() => onDifficultyChange("Medium")}
                className={`difficultyBtn medium ${shakeButtons ? "shake" : ""}`}
              >
                Medium
              </button>

              <button
                onClick={() => onDifficultyChange("Hard")}
                className={`difficultyBtn hard ${shakeButtons ? "shake" : ""}`}
              >
                Hard
              </button>
              <div className="gameStartButtonContainer">
                <button className="gameStartButton" onClick={onStart}>
                  Start
                  <img src="assets/pokeb.png" alt="pokeball icon" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
