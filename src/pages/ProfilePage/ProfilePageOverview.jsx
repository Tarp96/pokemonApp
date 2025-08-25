import { Outlet } from "react-router-dom";

export const ProfilePageOverview = () => {
  return (
    <div>
      <section className="profilePageTitleSection">
        <h1 className="profileMainTitle">Trainer Red</h1>
        <p className="profileSubtitle">Welcome back, Trainer!</p>
      </section>

      <Outlet />
    </div>
  );
};
