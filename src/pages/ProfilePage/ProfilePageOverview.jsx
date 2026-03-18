import { Outlet } from "react-router-dom";
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
    avatarId,
    quoteId,
    loading,
  } = useProfileData();

  return (
    <div className="profilePageContainer">
      <section className="profilePageTitleSection">
        <h1 className="profileMainTitle">Welcome back {username}!</h1>
      </section>

      <div>
        <PageNavigationBar
          links={[
            { path: "", label: "Trainer Info" },
            { path: "team", label: "Your Team" },
            { path: "favorites", label: "Favorites" },
          ]}
        />
      </div>

      <Outlet
        context={{
          userId,
          username,
          coinBalance,
          coinsSpent,
          team,
          highScore,
          avatarId,
          quoteId,
          loading,
        }}
      />
    </div>
  );
};
