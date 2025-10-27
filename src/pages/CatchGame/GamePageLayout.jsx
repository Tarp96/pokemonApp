import { Outlet } from "react-router-dom";

export const GamePageLayout = () => {
  return (
    <div className="gamePageLayoutContainer">
      <Outlet />
    </div>
  );
};
