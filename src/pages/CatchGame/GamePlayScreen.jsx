import { useEffect, useState, useRef } from "react";

const GAME_DURATION = 15;
const POKEMON_SIZE = 120;

export const GamePlayScreen = ({ difficulty }) => {
  const containerRef = useRef(null);

  const [position, setPosition] = useState({ top: 100, left: 100 });
  const [movesLeft, setMovesLeft] = useState(5);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);

  const gameOver = timeLeft <= 0;

  const generateRandomPosition = () => {
    const container = containerRef.current;

    if (!container) {
      return { top: 100, left: 100 };
    }

    const { clientWidth, clientHeight } = container;

    const maxLeft = Math.max(clientWidth - POKEMON_SIZE, 0);
    const maxTop = Math.max(clientHeight - POKEMON_SIZE, 0);

    return {
      top: Math.floor(Math.random() * maxTop),
      left: Math.floor(Math.random() * maxLeft),
    };
  };

  const getDifficultyDelay = () => {
    switch (difficulty) {
      case "Easy":
        return 2500;
      case "Medium":
        return 1500;
      case "Hard":
        return 800;
      default:
        return 2000;
    }
  };

  const getCoinMultiplier = () => {
    switch (difficulty) {
      case "Easy":
        return 1;
      case "Medium":
        return 1.5;
      case "Hard":
        return 2;
      default:
        return 1;
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    setPosition(generateRandomPosition());

    const intervalDelay = getDifficultyDelay();

    const moveInterval = setInterval(() => {
      setPosition(generateRandomPosition());
    }, intervalDelay);

    return () => clearInterval(moveInterval);
  }, [difficulty, gameOver]);

  const handlePokemonClick = () => {
    if (gameOver) return;

    setScore((prev) => prev + 1);
    setPosition(generateRandomPosition());
  };

  useEffect(() => {
    if (!gameOver) return;

    let coins = 0;

    if (difficulty === "Easy") {
      coins = score * 1;
    } else if (difficulty === "Medium") {
      coins = score * 1.5;
    } else {
      coins = score * 2;
    }

    setCoinsEarned(score * getCoinMultiplier());
  }, [gameOver, difficulty, score]);

  useEffect(() => {
    console.log("Coins earned:", coinsEarned);
  }, [coinsEarned]);

  if (gameOver) {
    return (
      <>
        <div className="gameOverPageContainer">
          <h2>Game Over!</h2>
          <p>Your score: {score}</p>
        </div>
      </>
    );
  }

  return (
    <div>
      <div
        className="gameScreenContainer gamePlayScreenContainer"
        ref={containerRef}
      >
        <div className="gameStatContainer">
          <div className="statItem">⏱ Time left: {timeLeft}s</div>
          <div className="statItem">🎯 Score: {score}</div>
          <div className="statItem">⭐ Difficulty: {difficulty}</div>
        </div>

        <div
          className="targetItem"
          style={{
            top: position.top,
            left: position.left,
          }}
          onClick={handlePokemonClick}
        >
          <img src="/assets/gengar.png" alt="Gengar" className="gamePokemon" />
        </div>
      </div>
    </div>
  );
};
