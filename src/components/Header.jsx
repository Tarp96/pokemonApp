import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/AuthContext";

export const Header = () => {
  let navigate = useNavigate();
  const { userLoggedIn, logout } = useAuth();

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

          <NavLink to="/game" className="headerNavBtn">
            Game
          </NavLink>

          {userLoggedIn ? (
            <NavLink to="/profilepage" className="headerNavBtn">
              Profile
            </NavLink>
          ) : null}

          {userLoggedIn ? (
            <button onClick={logout} className="headerNavBtn">
              Log Out
            </button>
          ) : (
            <NavLink to="/login" className="headerNavBtn">
              Log In
            </NavLink>
          )}
        </div>
      </header>
    </>
  );
};
