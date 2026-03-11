import { firstLetterUpperCase } from "../../utils/helperFunctions";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

export const ProfilePage = () => {
  const { username, coinBalance, coinsSpent, highScore, avatarId } =
    useOutletContext();

  useEffect(() => {
    console.log("avatarId in ProfilePage:", avatarId);
    console.log(`/assets/trainerAvatars/pt${avatarId}.webp`);
  }, []);

  return (
    <div className="profileLayout">
      <div className="trainerLeftColumn">
        <div className="trainerDetails">
          <h2 className="trainerName">
            {firstLetterUpperCase(username) || "Trainer"}
          </h2>

          <p className="trainerSubtitle">
            {" "}
            Even if we don't understand each other, that is not a reason to
            reject one another. There are two sides to every argument. Is there
            a side that has the answer to everything?
          </p>
        </div>

        <div className="trainerStatsList">
          <div className="trainerStatRow">
            <span>Pokémon Caught</span>
            <span>4</span>
          </div>

          <div className="trainerStatRow">
            <span>High Score</span>
            <span>{highScore ?? "unavailable"}</span>
          </div>

          <div className="trainerStatRow">
            <span>Coins</span>
            <span>{coinBalance ?? "unavailable"}</span>
          </div>

          <div className="trainerStatRow">
            <span>Coins Spent</span>
            <span>{coinsSpent ?? "unavailable"}</span>
          </div>
        </div>
      </div>

      <div className="trainerAvatarColumn">
        <img
          src={`/assets/trainerAvatars/pt${avatarId}.webp`}
          alt="Trainer Avatar"
          className="trainerAvatar"
        />
      </div>
    </div>
  );
};
