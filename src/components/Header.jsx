import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/AuthContext";
import { useState } from "react";

export const Header = () => {
  let navigate = useNavigate();
  const { userLoggedIn, logout } = useAuth();

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

        {userLoggedIn && (
          <NavLink to="/profilepage" className="headerNavBtn">
            Profile
          </NavLink>
        )}

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
  );
};
