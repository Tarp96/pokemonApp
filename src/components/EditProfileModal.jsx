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
  const [saving, setSaving] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatarId);
  const [selectedQuote, setSelectedQuote] = useState(currentQuoteId);

  const handleSave = async () => {
    setSaving(true);

    await updateUserAvatar(userId, selectedAvatar);
    await updateUserQuote(userId, selectedQuote);

    setSaving(false);
    onClose();
  };

  return (
    <div className="modalOverlay">
      <div className="editProfileModal">
        <div className="editProfileModalHeaderContainer">
          <h2>Edit Profile</h2>
          <button className="closeEditModalButton" onClick={onClose}>
            X
          </button>
        </div>

        <div className="avatarSection">
          <h3>Choose Avatar</h3>

          <div className="avatarPreview">
            <div className="avatarPreviewFrame">
              <img
                src={`/assets/trainerAvatars/pt${selectedAvatar}.webp`}
                alt="Selected avatar"
              />
            </div>
          </div>

          <div className="avatarGrid">
            {Array.from({ length: TOTAL_AVATARS }, (_, i) => {
              const id = i + 1;

              return (
                <div
                  key={id}
                  className={`avatarFrame ${
                    selectedAvatar === id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedAvatar(id)}
                >
                  <img
                    src={`/assets/trainerAvatars/pt${id}.webp`}
                    alt={`Trainer avatar ${id}`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="quoteSection">
          <h3>Select a quote from the Pokemon Universe</h3>

          <div className="quoteList">
            {pokemonQuotes.map((q) => (
              <div
                key={q.id}
                className={`quoteCard ${
                  selectedQuote === q.id ? "selected" : ""
                }`}
                onClick={() => setSelectedQuote(q.id)}
              >
                {q.quote}
              </div>
            ))}
          </div>
        </div>

        <div className="modalActions">
          <button onClick={onClose} className="cancelProfileEditButton">
            Cancel
          </button>
          <button disabled={saving} className="saveButton" onClick={handleSave}>
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};
