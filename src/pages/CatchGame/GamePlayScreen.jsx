import { useEffect, useState } from "react";

export const GamePlayScreen = () => {
  const [position, setPosition] = useState({ top: 100, left: 100 });
  const [movesLeft, setMovesLeft] = useState(5);
  const [timeLeft, setTimeLeft] = useState(10);
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

  useEffect(() => {
    setPosition(generateRandomPosition());

    const interval = setInterval(() => {
      setMovesLeft((prev) => {
        if (prev > 1) {
          setPosition(generateRandomPosition());
          return prev - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
