import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import pokemonQuotes from "../../data/pokemonQuotes";
import { firstLetterUpperCase } from "./../../utils/format/helperFunctions";
import pokeball from "../../assets/pokeb.webp";
import { BadgeRow } from "./../../components/badges/BadgeRow";
import { FaArrowLeft } from "react-icons/fa6";

export const TrainerCardPage = () => {
  const { userId } = useParams();

  const [profile, setProfile] = useState(null);
  const [team, setTeam] = useState([]);
  const [pokemonCaught, setPokemonCaught] = useState(0);
  const [error, setError] = useState(null);

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
          const data = docSnap.data();

          setProfile(data);

          setPokemonCaught(data.pokemonCaught ?? 0);
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
        <NavLink
          to="/game/leaderboard"
          className="navigateBackButton"
          aria-label="Go back to leaderboard"
        >
          <FaArrowLeft className="backIcon" />
          <span className="backText">Back</span>
        </NavLink>
        <div className="trainerCardFlexContainer">
          <div className="trainerCardContent">
            <div className="trainerCardTitleContainer">
              <img
                src={pokeball}
                alt="Pokeball"
                className="trainerCardTitleImage"
              />
              <h2 className="trainerCardTitle">Trainer {profile.username}</h2>
            </div>

            <p className="trainerCardQuote">{quote}</p>
            <div className="profileDivider"></div>

            <div className="trainerCardStats">
              <div className="trainerCardStatRow">
                <span className="trainerCardStatLabel">High Score</span>
                <span className="trainerCardStatValue">
                  {profile.highScore ?? 0}
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
        <BadgeRow pokemonCaught={profile.pokemonCaught ?? 0} />

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
                        src={pokeball}
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
