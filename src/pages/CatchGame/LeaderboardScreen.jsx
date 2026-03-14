import { listenToLeaderboard } from "../../services/leaderboardService";
import { useState, useEffect } from "react";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const LeaderboardScreen = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  const navigate = useNavigate();

  const podium = leaderboard.slice(0, 3);
  const restOfLeaderboard = leaderboard.slice(3);

  const currentUid = auth.currentUser?.uid;

  useEffect(() => {
    const unsubscribe = listenToLeaderboard((data) => {
      setLeaderboard(data);
    });

    return () => unsubscribe();
  }, []);

  const displayLeaderboard = restOfLeaderboard.map((item, index) => {
    const isCurrentUser = item.uid === currentUid;

    return (
      <Link
        key={item.uid}
        to={`/trainer/${item.uid}`}
        className="leaderboardLink"
      >
        <li
          className={`leaderboardListItem ${
            isCurrentUser ? "leaderboardCurrentUser" : ""
          }`}
        >
          <span className="leaderboardRank">{index + 4}</span>
          <span className="leaderboardName">{item.username}</span>
          <span className="leaderboardScore">{item.score} pts</span>
        </li>
      </Link>
    );
  });

  return (
    <>
      <div className="leaderboardPageContainer">
        <div className="leaderboardTitleContainer">
          <img
            src="/assets/pokeTrophy.png"
            alt="Golden trophy"
            className="leaderboardTrophyPic"
          />
          <h2 className="leaderboardPageTitle"> Top 10 </h2>
          <img
            src="/assets/pokeTrophy.png"
            alt="Golden trophy"
            className="leaderboardTrophyPic"
          />
        </div>
        <div className="podiumContainer">
          {podium[1] && (
            <Link
              key={podium[0].uid}
              to={`/trainer/${podium[0].uid}`}
              className="leaderboardLink"
            >
              <div className="podiumSecond">
                <div className="podiumPlace">🥈</div>
                <div className="podiumName">{podium[1].username}</div>
                <div className="podiumScore">{podium[1].score} pts</div>
              </div>
            </Link>
          )}

          {podium[0] && (
            <Link
              key={podium[1].uid}
              to={`/trainer/${podium[1].uid}`}
              className="leaderboardLink"
            >
              <div className="podiumFirst">
                <div className="podiumPlace">🥇</div>
                <div className="podiumName">{podium[0].username}</div>
                <div className="podiumScore">{podium[0].score} pts</div>
              </div>
            </Link>
          )}

          {podium[2] && (
            <Link
              key={podium[2].uid}
              to={`/trainer/${podium[2].uid}`}
              className="leaderboardLink"
            >
              <div className="podiumThird">
                <div className="podiumPlace">🥉</div>
                <div className="podiumName">{podium[2].username}</div>
                <div className="podiumScore">{podium[2].score} pts</div>
              </div>
            </Link>
          )}
        </div>
        <ol className="leaderboardPageList">{displayLeaderboard}</ol>

        <div className="leaderboardNavContainer">
          <button
            className="uiButtonPrimary uiButtonSecondary"
            onClick={() => navigate("/game")}
          >
            ⬅ Back to Game
          </button>
        </div>
      </div>
    </>
  );
};
