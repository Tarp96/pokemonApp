import { NavLink, useNavigate } from "react-router-dom";

export const Header = () => {
  let navigate = useNavigate();

  return (
    <>
      <header className="headerContainer">
        <div>
          <img
            src="assets/pikalogo.png"
            alt=""
            className="pageTitlePokeBallImg"
          />
        </div>
        <div className="pageTitleDiv">
          <img
            src="assets/pokelogo.png"
            alt="Title that says Pokemon in yellow text"
            className="headerImage"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="headerNavigationButtonsDiv">
          <NavLink to="/" className="headerNavBtn">
            Home
          </NavLink>
          <NavLink to="/profilepage" className="headerNavBtn">
            Profile
          </NavLink>
          <NavLink to="/login" className="headerNavBtn">
            Log In
          </NavLink>
        </div>
      </header>
    </>
  );
};
