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
      <li key={index}>
        {item.score} {item.username}
      </li>
    );
  });

  return (
    <>
      <div className="leaderboardPageContainer">
        <ol>{displayLeaderboard}</ol>
      </div>
    </>
  );
};
