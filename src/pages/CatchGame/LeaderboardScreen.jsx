import { listenToLeaderboard } from "../../services/leaderboardService";
import { useState, useEffect } from "react";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import pokemonTrophy from "../../assets/poketrophy.webp";

export const LeaderboardScreen = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const podium = leaderboard.slice(0, 3);
  const restOfLeaderboard = leaderboard.slice(3);

  const currentUid = auth.currentUser?.uid;

  useEffect(() => {
    const unsubscribe = listenToLeaderboard((data) => {
      setLeaderboard(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="leaderboardPageContainer">
        <p>Loading leaderboard....</p>;
      </div>
    );
  }

  const displayLeaderboard = restOfLeaderboard.map((item, index) => {
    const isCurrentUser = item.uid === currentUid;

    return (
      <li
        className={`leaderboardListItem ${
          isCurrentUser ? "leaderboardCurrentUser" : ""
        }`}
        aria-current={isCurrentUser ? "true" : undefined}
        key={item.uid}
      >
        <Link
          key={item.uid}
          to={`/trainer/${item.uid}`}
          className="leaderboardLink"
          aria-label={`View profile of ${item.username}, rank ${index + 4}, ${item.score} points`}
        >
          <span className="leaderboardRank">
            <span className="visually-hidden">Rank </span>
            {index + 4}
          </span>
          <span className="leaderboardName">{item.username}</span>
          <span className="leaderboardScore">{item.score} pts</span>
        </Link>
      </li>
    );
  });

  return (
    <>
      <div className="leaderboardPageContainer">
        <div className="leaderboardTitleContainer">
          <img src={pokemonTrophy} alt="" className="leaderboardTrophyPic" />
          <h1 className="leaderboardPageTitle">Top 10</h1>
          <img src={pokemonTrophy} alt="" className="leaderboardTrophyPic" />
        </div>
        <div className="podiumContainer">
          {podium[1] && (
            <Link
              key={podium[1].uid}
              to={`/trainer/${podium[1].uid}`}
              className="leaderboardLink"
            >
              <div
                className="podiumSecond"
                aria-label={`Second place: ${podium[1].username}, ${podium[1].score} points`}
              >
                <div className="podiumPlace">🥈</div>
                <div className="podiumName">{podium[1].username}</div>
                <div className="podiumScore">{podium[1].score} pts</div>
              </div>
            </Link>
          )}

          {podium[0] && (
            <Link
              key={podium[0].uid}
              to={`/trainer/${podium[0].uid}`}
              className="leaderboardLink"
            >
              <div
                className="podiumFirst"
                aria-label={`First place: ${podium[0].username}, ${podium[0].score} points`}
              >
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
              <div
                className="podiumThird"
                aria-label={`Third place: ${podium[2].username}, ${podium[2].score} points`}
              >
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
            aria-label="Go back to Game start page"
          >
            ⬅ Back to Game
          </button>
        </div>
      </div>
    </>
  );
};
