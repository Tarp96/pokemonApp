import { Outlet } from "react-router-dom";

export const ProfilePageOverview = () => {
  return (
    <div>
      <header className="profilePageHeaderContainer">
        <h2 className="profilePageTitle">Your Page</h2>
      </header>

      <Outlet />
    </div>
  );
};
