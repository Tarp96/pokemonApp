import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <header className="headerContainer">
        <div className="pageTitleDiv">
          <img
            src="assets/pokelogo.png"
            alt="Title that says Pokemon in yellow text"
            className="headerImage"
          />
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
