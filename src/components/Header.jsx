import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <header className="headerContainer">
        <div className="pageTitleDiv">
          <h1 className="pageTitleText">Pokemon</h1>
        </div>
        <div className="headerNavigationButtonsDiv">
          <NavLink to="/" className="headerNavBtn">
            Home
          </NavLink>
          <NavLink to="/profilepage" className="headerNavBtn">
            Profile
          </NavLink>
        </div>
      </header>
    </>
  );
};
