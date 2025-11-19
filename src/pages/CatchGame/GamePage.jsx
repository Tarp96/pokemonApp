import { useState, useEffect } from "react";

export const GamePage = () => {
  const [difficulty, setDifficulty] = useState("Easy");

  useEffect(() => {
    decideDifficulty("Easy");
  }, []);

  function decideDifficulty(difficulty) {
    setDifficulty(difficulty);
  }

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
          <p>Selected Difficulty: {difficulty}</p>
          <button
            onClick={() => decideDifficulty("Easy")}
            className="difficultyBtn easy"
          >
            Easy
          </button>
          <button
            onClick={() => decideDifficulty("Medium")}
            className="difficultyBtn medium"
          >
            Medium
          </button>
          <button
            onClick={() => decideDifficulty("Hard")}
            className="difficultyBtn hard"
          >
            Hard
          </button>
        </div>
        <div className="gameStartButtonContainer">
          <button className="gameStartButton">
            Start
            <img src="assets/pokeb.png" alt="" />
          </button>
        </div>
      </div>
    </>
  );
};
