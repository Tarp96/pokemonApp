import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import pokemonQuotes from "../../data/pokemonQuotes";

export const TrainerCardPage = () => {
  const { userId } = useParams();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchTrainer = async () => {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    };
    fetchTrainer();
  }, [userId]);

  if (!profile) {
    return <p>Loading...</p>;
  }

  const quote =
    pokemonQuotes.find((q) => q.id === profile.quoteId)?.quote ||
    "A true trainer never gives up";

  return (
    <div className="trainerCardPage">
      <div className="trainerCard">
        <div className="trainerCardFlexContainer">
          <div className="trainerCardContent">
            <div className="trainerCardTitleContainer">
              <img
                src="/assets/pokeb.png"
                alt="Pokeball"
                className="trainerCardTitleImage"
              />
              <h2 className="trainerCardTitle">Trainer {profile.username}</h2>
            </div>

            <p className="trainerCardQuote">{quote}</p>
            <div className="profileDivider"></div>

            <div className="trainerCardStats">
              <div className="trainerCardStatRow">
                <span className="trainerCardStatLabel">Pokémon Caught</span>
                <span className="trainerCardStatValue">
                  {profile.pokemonCaught ?? 0}
                </span>
              </div>

              <div className="trainerCardStatRow">
                <span className="trainerCardStatLabel">High Score</span>
                <span className="trainerCardStatValue">
                  {profile.highScore ?? 0}
                </span>
              </div>

              <div className="trainerCardStatRow">
                <span className="trainerCardStatLabel">Coins</span>
                <span className="trainerCardStatValue">
                  {profile.coins ?? 0}
                </span>
              </div>
            </div>
          </div>
          <div className="trainerAvatarContainer">
            <div className="trainerCardAvatarFrame">
              <img
                src={`/assets/trainerAvatars/pt${profile.avatarId}.webp`}
                alt="Trainer Avatar"
              />
            </div>
          </div>
        </div>
        <div className="profileDivider"></div>
        <div className="trainerCardTeamDisplayContainer">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
      </div>
    </div>
  );
};
