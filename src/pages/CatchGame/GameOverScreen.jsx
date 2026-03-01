import { auth } from "../../firebaseConfig";
import { useState, useEffect, useRef } from "react";
import { addCoins, listenToCoins } from "../../services/coinService";

export const GameOverScreen = ({
  score,
  difficulty,
  multiplier,
  coinsEarned,
  onPlayAgain,
}) => {
  const [userCoins, setUserCoins] = useState(null);

  const rewardedRef = useRef(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const unsubscribe = listenToCoins(user.uid, setUserCoins);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const rewardCoins = async () => {
      if (rewardedRef.current || coinsEarned <= 0) return;
      rewardedRef.current = true;

      try {
        const user = auth.currentUser;
        if (!user) return;

        await addCoins(user.uid, coinsEarned);
      } catch (err) {
        console.error("Failed to add coins:", err);
      }
    };

    rewardCoins();
  }, [coinsEarned]);

  return (
    <div className="uiCard">
      <img
        src="assets/pokemonTrophy.png"
        alt="Person holding a big trophy"
        className="uiCardHero rect"
      />

      <div className="uiCardBody">
        <h2 className="gameOverTitle">🎮 Game Over</h2>

        <div className="gameOverStats">
          <div className="statRow" role="group" aria-label="Score">
            <span className="label">Score</span>
            <span className="value">{score}</span>
          </div>

          <div className="statRow" role="group" aria-label="Difficulty">
            <span className="label">Difficulty</span>
            <span className={`value difficulty ${difficulty.toLowerCase()}`}>
              {difficulty}
            </span>
          </div>

          <div className="statRow" role="group" aria-label="Multiplier">
            <span className="label">Multiplier</span>
            <span className="value">x{multiplier}</span>
          </div>

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

        <div className="gameOverBtnContainer">
          <button onClick={onPlayAgain} className="uiButtonPrimary">
            <img
              src="/assets/pokeb.png"
              alt="Pokeball"
              className="gameOverBtnIcon"
            />
            Play Again
          </button>
          <button className="uiButtonPrimary">🏆 Leaderboard</button>
        </div>
      </div>
    </div>
  );
};
