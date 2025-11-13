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
        <div>
          <button className="gameStartButton">Start</button>
        </div>
      </div>
    </>
  );
};
