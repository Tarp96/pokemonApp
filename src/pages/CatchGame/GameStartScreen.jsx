import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export const GameStartScreen = ({
  selectedDifficulty,
  onDifficultyChange,
  onStart,
  shakeButtons,
  isLoggedIn,
}) => {
  const [showDifficultyError, setShowDifficultyError] = useState(false);

  useEffect(() => {
    if (shakeButtons && !selectedDifficulty) {
      setShowDifficultyError(true);
    }
  }, [shakeButtons, selectedDifficulty]);

  useEffect(() => {
    if (selectedDifficulty) {
      setShowDifficultyError(false);
    }
  }, [selectedDifficulty]);

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
            Log In to Play <span aria-hidden="true">🎮</span>
          </NavLink>
        </div>
      ) : (
        <div className="gameStartContainer">
          <div className="uiCard uiAuthSplit">
            <div className="uiAuthContent">
              <div className="uiAuthHero">
                <img
                  className="uiCardHero square gameStartImage"
                  src="assets/gameStartImg.png
                  "
                  alt="Pokémon artwork"
                />
              </div>

              <div className="uiCardBody">
                <div className="gameStartIntro">
                  <h1 className="gameStartTitle">Ready to play?</h1>

                  <p className="uiAuthInfoText">
                    Catch the Pokémon that appears to earn coins.
                  </p>
                </div>

                <div className="difficultySection">
                  <h2>Select difficulty</h2>

                  <p className="uiAuthInfoText">
                    Higher difficulty gives more coins.
                  </p>

                  <p className="uiAuthInfoText">
                    Selected Difficulty:{" "}
                    <strong>{selectedDifficulty || "None selected"}</strong>
                  </p>

                  {showDifficultyError && (
                    <p className="gameStartErrorMessage">
                      Please select a difficulty before starting the game.
                    </p>
                  )}

                  <div className="difficultyContainer">
                    <button
                      onClick={() => onDifficultyChange("Easy")}
                      className={`difficultyBtn easy 
                    ${selectedDifficulty === "Easy" ? "activeDifficulty" : ""}
                    ${shakeButtons ? "shake" : ""}
                  `}
                    >
                      Easy
                    </button>

                    <button
                      onClick={() => onDifficultyChange("Medium")}
                      className={`difficultyBtn medium 
                    ${selectedDifficulty === "Medium" ? "activeDifficulty" : ""}
                    ${shakeButtons ? "shake" : ""}
                   `}
                    >
                      Medium
                    </button>

                    <button
                      onClick={() => onDifficultyChange("Hard")}
                      className={`difficultyBtn hard 
                    ${selectedDifficulty === "Hard" ? "activeDifficulty" : ""}
                    ${shakeButtons ? "shake" : ""}
                   `}
                    >
                      Hard
                    </button>
                  </div>
                </div>
                <div className="authButtonContainer">
                  <button
                    className="uiButtonPrimary gameStartPrimaryBtn"
                    onClick={onStart}
                  >
                    Start
                    <img
                      src="assets/pokeb.png"
                      alt="pokeball icon"
                      className="gameStartBtnIcon"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
