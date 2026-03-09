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

  const podium = leaderboard.slice(0, 3);
  const restOfLeaderboard = leaderboard.slice(3);

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

  const displayLeaderboard = restOfLeaderboard.map((item, index) => {
    const isCurrentUser = item.uid === currentUid;

    return (
      <li
        key={item.uid}
        className={`leaderboardListItem ${
          isCurrentUser ? "leaderboardCurrentUser" : ""
        }`}
      >
        <span className="leaderboardRank">{index + 4}</span>
        <span className="leaderboardName">{item.username}</span>
        <span className="leaderboardScore">{item.score} pts</span>
      </li>
    );
  });

  return (
    <>
      <div className="leaderboardPageContainer">
        <h2 className="leaderboardPageTitle">Top 10</h2>
        <div className="podiumContainer">
          {podium[1] && (
            <div className="podiumSecond">
              <div className="podiumPlace">🥈</div>
              <div className="podiumName">{podium[1].username}</div>
              <div className="podiumScore">{podium[1].score} pts</div>
            </div>
          )}

          {podium[0] && (
            <div className="podiumFirst">
              <div className="podiumPlace">🥇</div>
              <div className="podiumName">{podium[0].username}</div>
              <div className="podiumScore">{podium[0].score} pts</div>
            </div>
          )}

          {podium[2] && (
            <div className="podiumThird">
              <div className="podiumPlace">🥉</div>
              <div className="podiumName">{podium[2].username}</div>
              <div className="podiumScore">{podium[2].score} pts</div>
            </div>
          )}
        </div>
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
