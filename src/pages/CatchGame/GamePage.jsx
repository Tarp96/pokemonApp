import { useState, useEffect } from "react";
import { GameStartScreen } from "./GameStartScreen";
import { GamePlayScreen } from "./GamePlayScreen";
import { toast } from "react-toastify";
import { useAuth } from "./../../contexts/authContext/AuthContext";

export const GamePage = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [shakeButtons, setShakeButtons] = useState(false);

  const { userLoggedIn } = useAuth();

  function startGame() {
    if (difficulty) {
      setGameStarted(true);
      setShakeButtons(false);
    } else {
      setShakeButtons(true);
      setTimeout(() => setShakeButtons(false), 500);
      toast.error("Please select a difficulty before starting the game", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  }

  return !gameStarted ? (
    <GameStartScreen
      selectedDifficulty={difficulty}
      onDifficultyChange={setDifficulty}
      onStart={startGame}
      shakeButtons={shakeButtons}
      isLoggedIn={userLoggedIn}
    />
  ) : (
    <GamePlayScreen difficulty={difficulty} />
  );
};
