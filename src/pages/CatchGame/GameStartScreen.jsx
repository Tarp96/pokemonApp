import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProfileData } from "../../hooks/useProfileData";
import { useNavigate } from "react-router-dom";
import psyduckSign from "../../assets/psyduckSign.webp";
import gameStartImage from "../../assets/gameStartImg.webp";
import pokeball from "../../assets/pokeb.webp";
import { ImageWithSkeleton } from "../../components/SkeletonLoading/ImageWithSkeleton";

export const GameStartScreen = ({
  selectedDifficulty,
  onDifficultyChange,
  onStart,
  shakeButtons,
  isLoggedIn,
}) => {
  const [showDifficultyError, setShowDifficultyError] = useState(false);

  const navigate = useNavigate();

  const { highScore } = useProfileData();

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
          <ImageWithSkeleton
            src={psyduckSign}
            alt="Yellow duck holding a sign"
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
                <ImageWithSkeleton
                  src={gameStartImage}
                  alt="Pokemon Artwork"
                  className="uiCardHero square gameStartImage"
                />
              </div>

              <div className="uiCardBody">
                <div className="gameStartIntro">
                  <h1 className="gameStartTitle">Ready to play?</h1>

                  <p className="uiAuthInfoText">
                    Catch the Pokémon that appears to earn coins.
                  </p>
                </div>
                <div className="startPageStats">
                  <span className="statIcon">⭐</span>
                  <span className="statLabel">Your High Score</span>
                  <span className="statValue">{highScore} pts</span>
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
                      src={pokeball}
                      alt="pokeball icon"
                      className="gameStartBtnIcon"
                    />
                  </button>
                  <button
                    className="gameStartSecondaryBtn"
                    onClick={() => navigate("leaderboard")}
                  >
                    Leaderboard
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
