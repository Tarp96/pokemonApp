import { Outlet } from "react-router-dom";
import { PageNavigationBar } from "../../components/PageNavigationbar";

export const ProfilePageOverview = () => {
  return (
    <div className="profilePageContainer">
      <section className="profilePageTitleSection">
        <h1 className="profileMainTitle">Trainer Red</h1>
        <p className="profileSubtitle">Welcome back, Trainer!</p>
      </section>

      <div>
        <PageNavigationBar
          links={[
            { path: "", label: "Trainer Info" },
            { path: "favorites", label: "Favorites" },
          ]}
        />
      </div>

      <Outlet />
    </div>
  );
};
