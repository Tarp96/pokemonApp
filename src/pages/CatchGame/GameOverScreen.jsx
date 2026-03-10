import { useGameOveLogic } from "../../hooks/useGameOverLogic";

import { useNavigate } from "react-router-dom";

export const GameOverScreen = ({
  score,
  difficulty,
  multiplier,
  coinsEarned,
  onPlayAgain,
}) => {
  const navigate = useNavigate();

  const { userCoins, userHighScore, isNewHighScore, animateStats } =
    useGameOveLogic(coinsEarned);

  return (
    <div className="gameOverContainer">
      <div className="uiCard uiAuthSplit">
        <div className="uiAuthContent">
          <div className="uiAuthHero">
            <img
              src="assets/pokeHappy.jpg"
              alt="Person holding a big trophy"
              className="uiCardHero square pokeTrophyImg"
            />
          </div>

          <div className="uiCardBody">
            <h2 className="gameOverTitle">🎮 Game Over</h2>

            <div
              className={`gameOverStats ${animateStats ? "animateStats" : ""}`}
            >
              <div className="statRow" role="group" aria-label="Score">
                <span className="label">Score</span>
                <span className="value">{score}</span>
              </div>

              <div
                className={`statRow ${isNewHighScore ? "highScoreHighlight" : ""}`}
                role="group"
                aria-label="High score"
              >
                <span className="label">High Score</span>
                <span className="value">{userHighScore}</span>
              </div>

              <div className="statRow" role="group" aria-label="Difficulty">
                <span className="label">Difficulty</span>
                <span
                  className={`value difficulty ${difficulty.toLowerCase()}`}
                >
                  {difficulty}
                </span>
              </div>

              <div className="statRow" role="group" aria-label="Multiplier">
                <span className="label">Multiplier</span>
                <span className="value">x{multiplier}</span>
              </div>

              <div className="rewardSection">
                <div
                  className="statRow highlight"
                  role="group"
                  aria-label="Coins Earned"
                >
                  <span className="label">Coins Earned</span>
                  <span className="value coins">💰 {coinsEarned}</span>
                </div>

                <div
                  className="statRow highlight"
                  role="group"
                  aria-label="Coins Total"
                >
                  <span className="label">Coins Total</span>
                  <span className="value coins">💰 {userCoins}</span>
                </div>
              </div>
            </div>

            <div className="gameOverBtnContainer">
              <button onClick={onPlayAgain} className="uiButtonPrimary">
                <img
                  src="/assets/pokeb.png"
                  alt="Pokeball"
                  className="gameOverBtnIcon"
                />
                Play Again
              </button>

              <button
                className="uiButtonPrimary uiButtonSecondary"
                onClick={() => navigate("leaderboard")}
              >
                🏆 Leaderboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
