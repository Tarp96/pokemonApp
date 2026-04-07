import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/AuthContext";
import { useState, useEffect, useRef } from "react";
import pikalogo from "../assets/pikalogo.webp";
import pokemonlogo from "../assets/pokelogo.webp";

export const Header = () => {
  let navigate = useNavigate();
  const { userLoggedIn, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="headerContainer">
      <div className="headerLeft">
        <img
          src={pikalogo}
          alt="Pikachu official artwork"
          className="pageTitlePokeBallImg"
        />
      </div>

      <div className="headerCenter">
        <img
          src={pokemonlogo}
          alt="Pokemon title"
          className="headerImage"
          onClick={() => navigate("/")}
        />
      </div>

      <div className="headerRight">
        <NavLink to="/" className="headerNavBtn" aria-label="Home">
          Home
        </NavLink>

        <NavLink to="/game" className="headerNavBtn" aria-label="Game">
          Game
        </NavLink>

        {!userLoggedIn && (
          <NavLink to="/login" className="headerNavBtn" aria-label="Log In">
            Log In
          </NavLink>
        )}

        {userLoggedIn && (
          <div className="profileMenuWrapper" ref={menuRef}>
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
                  Profile
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
