import {
  getLeaderboardTop10,
  getUserRank,
} from "../../services/leaderboardService";
import { useState, useEffect } from "react";
import { auth } from "../../firebaseConfig";
import { useProfileData } from "./../../hooks/useProfileData";

export const LeaderboardScreen = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState();
  const [playerScore, setPlayerScore] = useState(null);

  const { username } = useProfileData();

  const currentUid = auth.currentUser?.uid;

  useEffect(() => {
    const rankCalc = async () => {
      if (!currentUid) return;

      const result = await getUserRank(currentUid);
      console.log("Rank result:", result);

      setUserRank(result.rank);
      setPlayerScore(result.score);
    };

    rankCalc();
  }, [currentUid]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const arr = await getLeaderboardTop10();
      setLeaderboard(arr);
      console.log(arr);
    };

    fetchLeaderboard();
  }, []);

  const displayLeaderboard = leaderboard.map((item, index) => {
    const isCurrentUser = item.uid === currentUid;

    return (
      <li
        key={item.uid}
        className={`leaderboardListItem ${
          isCurrentUser ? "leaderboardCurrentUser" : ""
        }`}
      >
        <span className="leaderboardRank">{index + 1}</span>
        <span className="leaderboardName">{item.username}</span>
        <span className="leaderboardScore">{item.score} pts</span>
      </li>
    );
  });

  return (
    <>
      <div className="leaderboardPageContainer">
        <h2 className="leaderboardPageTitle">Top 10</h2>
        <ol className="leaderboardPageList">{displayLeaderboard}</ol>
        <div className="playerRankCard">
          <h3>Your Rank</h3>
          {userRank && playerScore !== null && (
            <p>
              {userRank}) {username} — {playerScore} pts
            </p>
          )}
        </div>
      </div>
    </>
  );
};
