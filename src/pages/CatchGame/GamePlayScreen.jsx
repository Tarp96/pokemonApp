import { useEffect, useState } from "react";

export const GamePlayScreen = ({ difficulty }) => {
  const GAME_DURATION = 15;

  const [position, setPosition] = useState({ top: 100, left: 100 });
  const [movesLeft, setMovesLeft] = useState(5);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);

  const gameOver = timeLeft <= 0;

  const generateRandomPosition = () => {
    const maxWidth = 700;
    const maxHeight = 800;

    return {
      top: Math.floor(Math.random() * maxHeight),
      left: Math.floor(Math.random() * maxWidth),
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

  return (
    <div>
      <div className="gameStartPageContainer">
        <div className="gameStatContainer">{movesLeft}</div>
        <div
          className="targetItem"
          style={{
            top: position.top,
            left: position.left,
          }}
        >
          <img src="/assets/gengar.png" alt="Gengar" className="gamePokemon" />
        </div>
      </div>
    </div>
  );
};
