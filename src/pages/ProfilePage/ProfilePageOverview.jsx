import { Outlet } from "react-router-dom";
import { PageNavigationBar } from "../../components/PageNavigationbar";
import { firstLetterUpperCase } from "../../utils/helperFunctions";
import { useProfileData } from "../../hooks/useProfileData";

export const ProfilePageOverview = () => {
  const { username, coinBalance, teamSize, coinsSpent, team } =
    useProfileData();

  return (
    <div className="profilePageContainer">
      <section className="profilePageTitleSection">
        <h1 className="profileMainTitle">
          {firstLetterUpperCase(username) || "Trainer"}
        </h1>
        <p className="profileSubtitle">Welcome back, Trainer!</p>
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

      <Outlet context={{ username, coinBalance, teamSize, coinsSpent, team }} />
    </div>
  );
};
