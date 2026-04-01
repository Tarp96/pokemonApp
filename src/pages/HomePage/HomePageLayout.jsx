import { Header } from "../../components/Header";
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
