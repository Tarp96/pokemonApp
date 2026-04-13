import { firstLetterUpperCase } from "../../utils/helperFunctions";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { EditProfileModal } from "../../components/modals/EditProfileModal";
import { FaRegEdit } from "react-icons/fa";
import pokemonQuotes from "../../data/pokemonQuotes";
import ProfileTrainerSkeleton from "../../components/SkeletonLoading/ProfileTrainerSkeleton";
import { ImageWithSkeleton } from "../../components/SkeletonLoading/ImageWithSkeleton";

export const ProfilePage = () => {
  const {
    userId,
    username,
    coinBalance,
    coinsSpent,
    highScore,
    pokemonCaught,
    avatarId,
    quoteId,
    loading,
  } = useOutletContext();

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    console.log("avatarId in ProfilePage:", avatarId);
    console.log(`/assets/trainerAvatars/pt${avatarId}.webp`);
  }, [avatarId]);

  const selectedQuote = pokemonQuotes.find((q) => q.id === quoteId)?.quote;
  const isAvatarReady = avatarId !== null;

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
            <span>Coins</span>
            <span>{coinBalance ?? "unavailable"}</span>
          </div>

          <div className="trainerStatRow">
            <span>High Score</span>
            <span>{highScore ?? "unavailable"}</span>
          </div>

          <div className="trainerStatRow">
            <span>Pokemon Caught</span>
            <span>{pokemonCaught ?? "unavailable"}</span>
          </div>

          <div className="trainerStatRow">
            <span>Coins Spent</span>
            <span>{coinsSpent ?? "unavailable"}</span>
          </div>
        </div>
      </div>

      <div className="trainerAvatarColumn">
        <div className="trainerAvatarFrame">
          <ImageWithSkeleton
            key={avatarId ?? "loading"}
            src={
              isAvatarReady
                ? `/assets/trainerAvatars/pt${avatarId}.webp`
                : undefined
            }
            alt="Trainer Avatar"
          />
        </div>
      </div>
    </div>
  );
};
