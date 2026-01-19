import { useState, useEffect } from "react";
import { GameStartScreen } from "./GameStartScreen";
import { GamePlayScreen } from "./GamePlayScreen";
import { toast } from "react-toastify";
import { useAuth } from "./../../contexts/authContext/AuthContext";

export const GamePage = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const { userLoggedIn, logout } = useAuth();

  function startGame() {
    if (difficulty) {
      setGameStarted(true);
    } else {
      toast.error("Please select a difficulty before starting the game", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  }

  if (!userLoggedIn) {
    return <p>Seems you havent logged in or created an account yet!</p>;
  }

  return !gameStarted ? (
    <GameStartScreen
      selectedDifficulty={difficulty}
      onDifficultyChange={setDifficulty}
      onStart={startGame}
      isLoggedIn={userLoggedIn}
    />
  ) : (
    <GamePlayScreen difficulty={difficulty} />
  );
};
