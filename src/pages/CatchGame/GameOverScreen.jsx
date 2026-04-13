import { useGameOverLogic } from "../../hooks/game/useGameOverLogic";
import gameOverImage from "../../assets/pokeHappy.webp";
import pokeball from "../../assets/pokeb.webp";
import { ImageWithSkeleton } from "../../components/SkeletonLoading/ImageWithSkeleton";

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
    useGameOverLogic(coinsEarned, score);

  return (
    <main className="gameOverContainer">
      <section className="uiCard uiAuthSplit">
        <div className="uiAuthContent">
          <header className="uiAuthHero">
            <ImageWithSkeleton
              src={gameOverImage}
              alt="Happy Pokémon celebrating your results"
              className="uiCardHero square pokeTrophyImg"
            />
          </header>

          <div className="uiCardBody">
            <h1 className="gameOverTitle">
              <span aria-hidden="true">🎮</span> Game Over
            </h1>

            <section
              className={`gameOverStats ${animateStats ? "animateStats" : ""}`}
              aria-label="Game results"
            >
              <dl>
                <div className="statRow">
                  <dt className="label">Score</dt>
                  <dd className="value">{score}</dd>
                </div>

                <div
                  className={`statRow ${
                    isNewHighScore ? "highScoreHighlight" : ""
                  }`}
                >
                  <dt className="label">High Score</dt>
                  <dd className="value">
                    {userHighScore}
                    {isNewHighScore && (
                      <span className="sr-only"> - New high score!</span>
                    )}
                  </dd>
                </div>

                <div className="statRow">
                  <dt className="label">Difficulty</dt>
                  <dd
                    className={`value difficulty ${difficulty.toLowerCase()}`}
                  >
                    {difficulty}
                  </dd>
                </div>

                <div className="statRow">
                  <dt className="label">Multiplier</dt>
                  <dd className="value">x{multiplier}</dd>
                </div>
              </dl>

              <section className="rewardSection" aria-label="Rewards earned">
                <dl>
                  <div className="statRow highlight">
                    <dt className="label">Coins Earned</dt>
                    <dd className="value coins">
                      <span aria-hidden="true">💰</span> {coinsEarned}
                    </dd>
                  </div>

                  <div className="statRow highlight">
                    <dt className="label">Coins Total</dt>
                    <dd className="value coins">
                      <span aria-hidden="true">💰</span> {userCoins}
                    </dd>
                  </div>
                </dl>
              </section>
            </section>

            <div className="gameOverBtnContainer">
              <button
                onClick={onPlayAgain}
                className="uiButtonPrimary"
                aria-label="Play again"
              >
                <img
                  src={pokeball}
                  alt=""
                  aria-hidden="true"
                  className="gameOverBtnIcon"
                />
                Play Again
              </button>

              <button
                className="uiButtonPrimary uiButtonSecondary"
                onClick={() => navigate("leaderboard")}
              >
                <span aria-hidden="true">🏆</span> Leaderboard
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
