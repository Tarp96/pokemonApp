import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { listenToCoins } from "../services/coinService";
import { getTeamSize, getUserTeam } from "../services/teamService";
import { listenToHighScore } from "../services/highScoreService";

export const useProfileData = () => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [coinBalance, setCoinBalance] = useState(null);
  const [coinsSpent, setCoinsSpent] = useState(null);
  const [teamSize, setTeamSize] = useState(null);
  const [team, setTeam] = useState([]);
  const [highScore, setHighScore] = useState(null);
  const [avatarId, setAvatarId] = useState(1);
  const [quoteId, setQuoteId] = useState(1);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    // Real-time listener for user profile
    const unsubscribeUser = onSnapshot(userRef, (docSnap) => {
      if (!docSnap.exists()) return;

      const data = docSnap.data();

      setUserId(user.uid);
      setUsername(data.username ?? "");
      setCoinsSpent(data.coinsSpent ?? 0);
      setAvatarId(data.avatarId ?? 1);
      setQuoteId(data.quoteId ?? 1);
    });

    // Fetch team data once
    const fetchTeamData = async () => {
      const size = await getTeamSize();
      setTeamSize(size);

      const userTeam = await getUserTeam();
      setTeam(userTeam);
    };

    fetchTeamData();

    const unsubscribeCoins = listenToCoins(user.uid, setCoinBalance);
    const unsubscribeHighScore = listenToHighScore(user.uid, setHighScore);

    return () => {
      unsubscribeUser();
      unsubscribeCoins();
      unsubscribeHighScore();
    };
  }, []);

  return {
    userId,
    username,
    coinBalance,
    teamSize,
    coinsSpent,
    team,
    highScore,
    avatarId,
    quoteId,
  };
};
