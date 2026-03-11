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
      <div className="trainerStatsGrid">
        <div className="trainerStatCard">
          <h4>Pokémon Caught</h4>
          <p>84</p>
        </div>

        <div className="trainerStatCard">
          <h4>High Score</h4>
          <p>{highScore ?? "unavailable"}</p>
        </div>

        <div className="trainerStatCard">
          <h4>Coins</h4>
          <p>{coinBalance ?? "unavailable"}</p>
        </div>

        <div className="trainerStatCard">
          <h4>Coins Spent</h4>
          <p>{coinsSpent ?? "unavailable"}</p>
        </div>
      </div>

      <div className="trainerInfoHeader">
        <img
          src={`/assets/trainerAvatars/pt${avatarId}.webp`}
          alt="Trainer Avatar"
          className="trainerAvatar"
        />

        <div className="trainerDetails">
          <h2 className="trainerName">{firstLetterUpperCase(username)}</h2>
          <p className="trainerSubtitle">The best like no one ever was!</p>
        </div>
      </div>
    </div>
  );
};
