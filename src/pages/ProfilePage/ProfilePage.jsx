import { firstLetterUpperCase } from "../../utils/helperFunctions";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { EditProfileModal } from "../../components/EditProfileModal";
import { FaRegEdit } from "react-icons/fa";
import pokemonQuotes from "../../data/pokemonQuotes";
import ProfileTrainerSkeleton from "../../components/SkeletonLoading/ProfileTrainerSkeleton";

export const ProfilePage = () => {
  const {
    userId,
    username,
    coinBalance,
    coinsSpent,
    highScore,
    avatarId,
    quoteId,
    loading,
  } = useOutletContext();

  const [isEditing, setIsEditing] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const hasAvatar = avatarId !== null && avatarId !== undefined;

  useEffect(() => {
    setImageLoaded(false);
  }, [avatarId]);

  useEffect(() => {
    console.log("avatarId in ProfilePage:", avatarId);
    console.log(`/assets/trainerAvatars/pt${avatarId}.webp`);
  }, []);

  const selectedQuote = pokemonQuotes.find((q) => q.id === quoteId)?.quote;

  if (loading) {
    return <ProfileTrainerSkeleton />;
  }

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
          <div className="trainerNameContainer">
            <h2 className="trainerName">
              {firstLetterUpperCase(username) || "Trainer"}
            </h2>
            <button
              onClick={() => setIsEditing(true)}
              className="editProfileButton"
            >
              Edit Profile
              <FaRegEdit />
            </button>
          </div>

          {selectedQuote ? (
            <p
              className={`trainerSubtitle ${
                selectedQuote ? "quoteLoaded" : "quoteLoading"
              }`}
            >
              {selectedQuote || " "}
            </p>
          ) : (
            <p className="trainerSubtitle loading">Loading quote...</p>
          )}
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
        <div className="trainerAvatarFrame">
          {(!imageLoaded || !hasAvatar) && (
            <div className="imageSkeleton">
              <img
                src="/assets/pokeballIcon.svg"
                alt=""
                className="imageSkeletonIcon"
              />
            </div>
          )}

          {hasAvatar && (
            <img
              src={`/assets/trainerAvatars/pt${avatarId}.webp`}
              alt="Trainer Avatar"
              className={`trainerAvatar ${imageLoaded ? "loaded" : ""}`}
              onLoad={() => {
                setTimeout(() => setImageLoaded(true), 200);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
