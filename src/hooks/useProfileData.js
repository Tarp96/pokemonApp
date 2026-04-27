import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { listenToCoins } from "../services/user/coinService";
import { getTeamSize, getUserTeam } from "../services/pokemon/teamService";
import { listenToHighScore } from "../services/game/highScoreService";
import { listenToFavorites } from "../services/pokemon/favoritesService";

export const useProfileData = () => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [coinBalance, setCoinBalance] = useState(null);
  const [coinsSpent, setCoinsSpent] = useState(null);
  const [teamSize, setTeamSize] = useState(null);
  const [pokemonCaught, setPokemonCaught] = useState(null);
  const [team, setTeam] = useState([]);
  const [highScore, setHighScore] = useState(null);
  const [avatarId, setAvatarId] = useState(null);
  const [quoteId, setQuoteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    let isMounted = true;

    const userRef = doc(db, "users", user.uid);

    const unsubscribeUser = onSnapshot(userRef, (docSnap) => {
      if (!docSnap.exists()) return;

      const data = docSnap.data();

      if (!isMounted) return;

      setUserId(user.uid);
      setUsername(data.username ?? "");
      setCoinsSpent(data.coinsSpent ?? 0);
      setAvatarId(data.avatarId ?? 1);
      setQuoteId(data.quoteId ?? 1);
      setPokemonCaught(data.pokemonCaught ?? 0);

      setLoading(false);
    });

    const fetchTeamData = async () => {
      const size = await getTeamSize();
      const userTeam = await getUserTeam();

      if (!isMounted) return;

      setTeamSize(size);
      setTeam(userTeam);
    };

    fetchTeamData();

    const unsubscribeFavorites = listenToFavorites(user.uid, setFavorites);

    const unsubscribeCoins = listenToCoins(user.uid, (coins) => {
      if (!isMounted) return;
      setCoinBalance(coins);
    });

    const unsubscribeHighScore = listenToHighScore(user.uid, (score) => {
      if (!isMounted) return;
      setHighScore(score);
    });

    return () => {
      isMounted = false;
      unsubscribeUser();
      unsubscribeCoins();
      unsubscribeHighScore();
      unsubscribeFavorites();
    };
  }, []);

  return {
    userId,
    username,
    coinBalance,
    teamSize,
    pokemonCaught,
    coinsSpent,
    team,
    setTeam,
    highScore,
    avatarId,
    quoteId,
    loading,
    favorites,
  };
};
