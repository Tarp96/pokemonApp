export const GameOverScreen = ({
  score,
  difficulty,
  multiplier,
  coinsEarned,
  onPlayAgain,
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
