import { useState } from "react";
import pokeballLogo from "/assets/pokeb.png";

export const GamePage = () => {
  return (
    <>
      <div className="gameStartPageContainer">
        <div className="gamePageContent">
          <h1>Ready to play?</h1>
          <p>Catch the pokemon that appears to earn coins</p>
        </div>
        <div className="difficultyButtonContainer">
          <h2>Choose difficulty</h2>
          <p>Higher dificulty gives more coins</p>
          <button className="difficultyBtn easy">Easy</button>
          <button className="difficultyBtn medium">Medium</button>
          <button className="difficultyBtn hard">Hard</button>
        </div>
        <div>
          <button className="gameStartButton">Start</button>
        </div>
      </div>
    </>
  );
};
