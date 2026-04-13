import { Header } from "../../components/layout/Header";
import { Outlet } from "react-router-dom";

export const HomePageLayout = () => {
  return (
    <>
      <Header />
      <main id="main-content" className="mainContent">
        <Outlet />
      </main>
    </>
  );
};
