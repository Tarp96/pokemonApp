import { useState, useEffect } from "react";
import { GameStartScreen } from "./GameStartScreen";
import { GamePlayScreen } from "./GamePlayScreen";

export const GamePage = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  return !gameStarted ? (
    <GameStartScreen
      selectedDifficulty={difficulty}
      onDifficultyChange={setDifficulty}
      onStart={() => setGameStarted(true)}
    />
  ) : (
    <GamePlayScreen difficulty={difficulty} />
  );
};
