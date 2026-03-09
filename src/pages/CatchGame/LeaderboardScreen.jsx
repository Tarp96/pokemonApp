import { getLeaderboardTop10 } from "../../services/leaderboardService";
import { useState, useEffect } from "react";

export const LeaderboardScreen = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const arr = await getLeaderboardTop10();
      setLeaderboard(arr);
      console.log(arr);
    };

    fetchLeaderboard();
  }, []);

  const displayLeaderboard = leaderboard.map((item, index) => {
    return (
      <li key={item.uid} className="leaderboardListItem">
        <span className="leaderboardRank">{index + 1})</span>
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
      </div>
    </>
  );
};
