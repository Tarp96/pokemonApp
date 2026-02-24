import { firstLetterUpperCase } from "../../utils/helperFunctions";
import { useOutletContext } from "react-router-dom";

export const ProfilePage = () => {
  const { username, coinBalance, teamSize } = useOutletContext();

  return (
    <div className="trainerInfoContainer">
      <div className="trainerInfoHeader">
        <img
          src="https://boxchatter.wordpress.com/wp-content/uploads/2013/06/pkmn-trainer-red.jpg"
          alt="Trainer Avatar"
          className="trainerAvatar"
        />
        <div className="trainerDetails">
          <h2 className="trainerName">
            {firstLetterUpperCase(username) || "Trainer"}
          </h2>
          <p className="trainerSubtitle">
            The very best, like no one ever was.
          </p>
        </div>
      </div>

      <div className="trainerStatsGrid">
        <div className="trainerStatCard">
          <h4>Pokémon Caught</h4>
          <p>84</p>
        </div>
        <div className="trainerStatCard">
          <h4>Team Size</h4>
          <p>{teamSize ?? "unavailable"}</p>
        </div>
        <div className="trainerStatCard">
          <h4>Coins</h4>
          <p>{coinBalance ?? "unavailable"}</p>
        </div>
        <div className="trainerStatCard">
          <h4>Coins Spent</h4>
          <p>120</p>
        </div>
      </div>
    </div>
  );
};
