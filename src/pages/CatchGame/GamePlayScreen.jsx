import { useState } from "react";

export const GamePlayScreen = () => {
  const [position, setPosition] = useState({ top: 100, left: 100 });

  return (
    <div>
      <div className="gameStartPageContainer">
        <div className="gamePageContent">
          <h1>Now Playing Game</h1>
        </div>
      </div>
    </div>
  );
};
