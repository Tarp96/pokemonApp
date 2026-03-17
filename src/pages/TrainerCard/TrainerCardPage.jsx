import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import pokemonQuotes from "../../data/pokemonQuotes";
import { firstLetterUpperCase } from "./../../utils/helperFunctions";

export const TrainerCardPage = () => {
  const { userId } = useParams();

  const [profile, setProfile] = useState(null);
  const [team, setTeam] = useState([]);
  const [error, setError] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchTrainer = async () => {
      try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        const teamRef = collection(db, "users", userId, "team");
        const teamSnap = await getDocs(teamRef);

        const teamPokemon = teamSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (!isMounted) return;

        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }

        setTeam(teamPokemon);
      } catch (error) {
        console.error("Error fetching trainer data:", error);
        setError("Unable to load trainer profile.");
      }
    };

    fetchTrainer();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  if (error) {
    return (
      <div className="trainerCardPage">
        <div className="trainerCard errorCard">
          <h3>ERROR! ⚠ Trainer Card Unavailable</h3>
          <p>{error}</p>
          <img
            src="/assets/pikaconfused.gif"
            alt="A confused Pikachu leaning side to side"
            className="trainerCardErrorImage"
          />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="trainerCardPage">
        <div className="trainerCard skeletonCard">
          <div className="trainerCardFlexContainer">
            <div className="trainerCardContent">
              <div className="skeletonTitle"></div>

              <div className="skeletonQuote"></div>

              <div className="trainerCardStats">
                <div className="skeletonStat"></div>
                <div className="skeletonStat"></div>
                <div className="skeletonStat"></div>
              </div>
            </div>

            <div className="skeletonAvatar"></div>
          </div>

          <div className="trainerCardTeamSection">
            <div className="trainerCardTeamDisplayContainer">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="skeletonTeamSlot"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
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
          <div className="trainerCardTeamSection">
            <div className="trainerCardTeamHeader">
              <h3>Team</h3>
              <span>{team.length} / 6</span>
            </div>

            <div className="trainerCardTeamDisplayContainer">
              {[...Array(6)].map((_, index) => {
                const pokemon = team[index];

                return (
                  <div
                    key={index}
                    className={`trainerTeamSlot ${
                      pokemon?.types?.length ? `type-${pokemon.types[0]}` : ""
                    }`}
                  >
                    {pokemon ? (
                      <>
                        <img src={pokemon.sprite} alt={pokemon.name} />
                        <span className="pokemonTooltip">
                          {firstLetterUpperCase(pokemon.name)}
                        </span>
                      </>
                    ) : (
                      <img
                        src="/assets/pokeb.png"
                        alt="Empty slot"
                        className="emptySlot"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
