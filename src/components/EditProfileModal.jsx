import { useState } from "react";
import {
  updateUserQuote,
  updateUserAvatar,
} from "./../services/profileService";
import pokemonQuotes from "../data/pokemonQuotes";

const TOTAL_AVATARS = 26;

export const EditProfileModal = ({
  userId,
  currentAvatarId,
  currentQuoteId,
  onClose,
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatarId);
  const [selectedQuote, setSelectedQuote] = useState(currentQuoteId);

  const handleSave = async () => {
    await updateUserAvatar(userId, selectedAvatar);
    await updateUserQuote(userId, selectedQuote);

    onClose();
  };

  return (
    <div className="modalOverlay">
      <div className="editProfileModal">
        <h2>Edit Profile</h2>

        <div className="avatarSection">
          <h3>Choose Avatar</h3>

          <div className="avatarGrid">
            {Array.from({ length: TOTAL_AVATARS }, (_, i) => {
              const id = i + 1;

              return (
                <img
                  key={id}
                  src={`/assets/trainerAvatars/pt${id}.webp`}
                  className={`avatarOption ${
                    selectedAvatar === id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedAvatar(id)}
                />
              );
            })}
          </div>
        </div>

        <div className="quoteSection">
          <h3>Choose Quote</h3>

          <select
            value={selectedQuote}
            onChange={(e) => setSelectedQuote(Number(e.target.value))}
          >
            {pokemonQuotes.map((q) => (
              <option key={q.id} value={q.id}>
                {q.quote}
              </option>
            ))}
          </select>
        </div>

        <div className="modalActions">
          <button onClick={onClose}>Cancel</button>
          <button className="saveButton" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
