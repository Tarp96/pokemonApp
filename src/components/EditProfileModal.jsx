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
        <h2>Edit Profile</h2>

        <div className="avatarSection">
          <h3>Choose Avatar</h3>

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
          <button disabled={saving} className="saveButton" onClick={handleSave}>
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};
