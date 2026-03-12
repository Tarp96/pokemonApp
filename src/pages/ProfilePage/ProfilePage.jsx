import { firstLetterUpperCase } from "../../utils/helperFunctions";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { EditProfileModal } from "../../components/EditProfileModal";

export const ProfilePage = () => {
  const {
    userId,
    username,
    coinBalance,
    coinsSpent,
    highScore,
    avatarId,
    quoteId,
  } = useOutletContext();

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    console.log("avatarId in ProfilePage:", avatarId);
    console.log(`/assets/trainerAvatars/pt${avatarId}.webp`);
  }, []);

  return (
    <div className="profileLayout">
      {isEditing && (
        <EditProfileModal
          userId={userId}
          currentAvatarId={avatarId}
          currentQuoteId={quoteId}
          onClose={() => setIsEditing(false)}
        />
      )}
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

        <div className="profileDivider"></div>

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
        <button
          onClick={() => setIsEditing(true)}
          className="editProfileButton"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};
