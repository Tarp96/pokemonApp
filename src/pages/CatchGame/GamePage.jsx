import { useState } from "react";
import pokeballLogo from "/assets/pokeb.png";

export const GamePage = () => {
  const [gameStarted, setGameStarted] = useState(false);

  if (!gameStarted) {
    return (
      <div className="gamePageContainer">
        <div className="gamePageContent">
          <img src={pokeballLogo} alt="Pokeball" className="gamePageLogo" />
          <h1 className="gamePageMainTitle">Pokémon Memory Game</h1>
          <p className="gamePageSubtitle">
            Test your memory — can you find all matching Pokémon pairs?
          </p>
          <button
            className="gamePageStartButton"
            onClick={() => setGameStarted(true)}
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="gamePageContainer">
      <div className="gamePageContent">
        <h1 className="gamePageMainTitle">Game In Progress!</h1>
        {/* Your game logic or board will go here */}
      </div>
    </div>
  );
};
