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
        <section
          className="loginReminderContainer"
          aria-labelledby="login-reminder-title"
        >
          <ImageWithSkeleton
            src={psyduckSign}
            alt="Psyduck holding a sign reminding you to log in"
            className="loginReminderImage"
          />

          <p id="login-reminder-title" className="loginReminderText">
            Looks like you are not logged in. Please{" "}
            <NavLink to="/login">log in</NavLink> or create an account to play!
          </p>

          <NavLink
            to="/login"
            className="loginReminderButton"
            aria-label="Log in to your account to start playing"
          >
            Log In to Play <span aria-hidden="true">🎮</span>
          </NavLink>
        </section>
      ) : (
        <main className="gameStartContainer">
          <section className="uiCard uiAuthSplit">
            <div className="uiAuthContent">
              <header className="uiAuthHero">
                <ImageWithSkeleton
                  src={gameStartImage}
                  alt="Pokemon artwork showing gameplay theme"
                  className="uiCardHero square gameStartImage"
                />
              </header>

              <div className="uiCardBody">
                <section className="gameStartIntro">
                  <h1 className="gameStartTitle">Ready to play?</h1>

                  <p className="uiAuthInfoText">
                    Catch the Pokémon that appears to earn coins.
                  </p>
                </section>

                <section
                  className="startPageStats"
                  aria-label="Player statistics"
                >
                  <span className="statIcon" aria-hidden="true">
                    ⭐
                  </span>
                  <span className="statLabel">Your High Score</span>
                  <span className="statValue">{highScore} points</span>
                </section>

                <section className="difficultySection">
                  <h2 id="difficulty-heading">Select difficulty</h2>

                  <p className="uiAuthInfoText">
                    Higher difficulty gives more coins.
                  </p>

                  <p className="uiAuthInfoText">
                    Selected Difficulty:{" "}
                    <strong>{selectedDifficulty || "None selected"}</strong>
                  </p>

                  {showDifficultyError && (
                    <p
                      className="gameStartErrorMessage"
                      role="alert"
                      aria-live="assertive"
                    >
                      Please select a difficulty before starting the game.
                    </p>
                  )}

                  <div
                    className="difficultyContainer"
                    role="group"
                    aria-labelledby="difficulty-heading"
                  >
                    <button
                      onClick={() => onDifficultyChange("Easy")}
                      className={`difficultyBtn easy 
                      ${selectedDifficulty === "Easy" ? "activeDifficulty" : ""}
                      ${shakeButtons ? "shake" : ""}
                    `}
                      aria-pressed={selectedDifficulty === "Easy"}
                    >
                      Easy
                    </button>

                    <button
                      onClick={() => onDifficultyChange("Medium")}
                      className={`difficultyBtn medium 
                      ${selectedDifficulty === "Medium" ? "activeDifficulty" : ""}
                      ${shakeButtons ? "shake" : ""}
                    `}
                      aria-pressed={selectedDifficulty === "Medium"}
                    >
                      Medium
                    </button>

                    <button
                      onClick={() => onDifficultyChange("Hard")}
                      className={`difficultyBtn hard 
                      ${selectedDifficulty === "Hard" ? "activeDifficulty" : ""}
                      ${shakeButtons ? "shake" : ""}
                    `}
                      aria-pressed={selectedDifficulty === "Hard"}
                    >
                      Hard
                    </button>
                  </div>
                </section>

                <div className="authButtonContainer">
                  <button
                    className="uiButtonPrimary gameStartPrimaryBtn"
                    onClick={onStart}
                    aria-label="Start game with selected difficulty"
                  >
                    Start
                    <img
                      src={pokeball}
                      alt=""
                      aria-hidden="true"
                      className="gameStartBtnIcon"
                    />
                  </button>

                  <button
                    className="gameStartSecondaryBtn"
                    onClick={() => navigate("leaderboard")}
                  >
                    View leaderboard
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
    </div>
  );
};
