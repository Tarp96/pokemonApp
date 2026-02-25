import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { listenToCoins } from "../services/coinService";
import { getTeamSize, getUserTeam } from "../services/teamService";

export const useProfileData = () => {
  const [username, setUsername] = useState("");
  const [coinBalance, setCoinBalance] = useState(null);
  const [coinsSpent, setCoinsSpent] = useState(null);
  const [teamSize, setTeamSize] = useState(null);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const fetchData = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        setUsername(data.username ?? "");
        setCoinsSpent(data.coinsSpent ?? 0);
      }

      const size = await getTeamSize();
      setTeamSize(size);
      const userTeam = await getUserTeam();
      setTeam(userTeam);
      console.log(userTeam);
    };

    fetchData();

    const unsubscribe = listenToCoins(user.uid, setCoinBalance);
    return () => unsubscribe();
  }, []);

  return { username, coinBalance, teamSize, coinsSpent, team };
};
