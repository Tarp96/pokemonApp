export const GameOverScreen = ({
  score,
  difficulty,
  multiplier,
  coinsEarned,
}) => {
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
          <span className="value">x{coinMultiplier}</span>
        </div>

        <div className="statRow highlight">
          <span className="label">Coins Earned</span>
          <span className="value coins">💰 {coinsEarned}</span>
        </div>
      </div>
    </div>
  );
};
