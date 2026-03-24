import { Outlet, useLocation } from "react-router-dom";
import { PageNavigationBar } from "../../components/PageNavigationbar";
import { useProfileData } from "../../hooks/useProfileData";

export const ProfilePageOverview = () => {
  const {
    userId,
    username,
    coinBalance,
    coinsSpent,
    team,
    highScore,
    pokemonCaught,
    avatarId,
    quoteId,
    loading,
    favorites,
  } = useProfileData();

  const location = useLocation();

  return (
    <div className="profilePageContainer">
      <section className="profilePageTitleSection">
        <h1 className="profileMainTitle">Welcome back {username}!</h1>
      </section>

      <div>
        <PageNavigationBar
          links={[
            { path: "", label: "Trainer Info" },
            { path: "team", label: "Team" },
            { path: "badges", label: "Badges" },
            { path: "favorites", label: "Favorites" },
          ]}
        />
      </div>

      <div className="profileContentWrapper">
        <div key={location.pathname} className="profileTabContent fadeSlide">
          <Outlet
            context={{
              userId,
              username,
              coinBalance,
              coinsSpent,
              team,
              highScore,
              pokemonCaught,
              avatarId,
              quoteId,
              loading,
              favorites,
            }}
          />
        </div>
      </div>
    </div>
  );
};
