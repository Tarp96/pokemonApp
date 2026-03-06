import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/AuthContext";
import { useState } from "react";

export const Header = () => {
  let navigate = useNavigate();
  const { userLoggedIn, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="headerContainer">
      <div className="headerLeft">
        <img
          src="assets/pikalogo.png"
          alt=""
          className="pageTitlePokeBallImg"
        />
      </div>

      <div className="headerCenter">
        <img
          src="assets/pokelogo.png"
          alt="Pokemon title"
          className="headerImage"
          onClick={() => navigate("/")}
        />
      </div>

      <div className="headerRight">
        <NavLink to="/" className="headerNavBtn">
          Home
        </NavLink>

        <NavLink to="/game" className="headerNavBtn">
          Game
        </NavLink>

        {!userLoggedIn && (
          <NavLink to="/login" className="headerNavBtn">
            Log In
          </NavLink>
        )}

        {userLoggedIn && (
          <div className="profileMenuWrapper">
            <button className="profileAvatarBtn" onClick={toggleMenu}>
              <img
                src="https://boxchatter.wordpress.com/wp-content/uploads/2013/06/pkmn-trainer-red.jpg"
                alt="Profile"
                className="profileAvatarImg"
              />
            </button>

            {menuOpen && (
              <div className="profileDropdown">
                <NavLink
                  to="/profilepage"
                  className="dropdownItem"
                  onClick={() => setMenuOpen(false)}
                >
                  My Profile
                </NavLink>

                <button
                  className="dropdownItem"
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
