import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { useState, useEffect } from "react";

export const GameOverScreen = ({
  score,
  difficulty,
  multiplier,
  coinsEarned,
  onPlayAgain,
}) => {
  const [userCoins, setUserCoins] = useState(null);
  const [newCoinBalance, setNewCoinBalance] = useState(0);

  useEffect(() => {
    const fetchUserCoins = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserCoins(data.coins);
      }
    };
    fetchUserCoins();
  }, []);

  function updateCoinBalance() {
    const newBalance = score + userCoins;
    setNewCoinBalance(newBalance);
    console.log("New coin balance: " + newBalance);
  }

  useEffect(() => {
    if (userCoins !== null) {
      updateCoinBalance();
    }
  }, [userCoins]);

  return (
    <div className="gameOverCard">
      <img
        src="assets/pokemonTrophy.png"
        alt="Person holding a big trophy"
        className="gameOverPicture"
      />

      <h2 className="gameOverTitle">🎮 Game Over</h2>

      <div className="gameOverStats">
        <div className="statRow">
          <span className="label">Score</span>
          <span className="value">{score}</span>
        </div>

        <div className="statRow">
          <span className="label">Difficulty</span>
          <span className={`value difficulty ${difficulty.toLowerCase()}`}>
            {difficulty}
          </span>
        </div>

        <div className="statRow">
          <span className="label">Multiplier</span>
          <span className="value">x{multiplier}</span>
        </div>

        <div className="statRow highlight">
          <span className="label">Coins Earned</span>
          <span className="value coins">💰 {coinsEarned}</span>
        </div>
      </div>

      <div className="gameOverBtnContainer">
        <button onClick={onPlayAgain} className="primary gameOverBtn">
          <img
            src="/assets/pokeb.png"
            alt="Pokeball"
            className="gameOverBtnIcon"
          />
          Play Again
        </button>
        <button className="secondary gameOverBtn">🏆 Leaderboard</button>
      </div>
    </div>
  );
};
