import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "./../../services/authService";
import { useAuth } from "./../../contexts/authContext/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithEmailAndPassword(email, password);
    }
  };

  const googleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((err) => {});
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginCard">
        <h2>Log in or register!</h2>
        <img
          src="assets/pokeb.png"
          alt="Pokémon Logo"
          className="pokemonLogo"
        />
        <h2 className="loginTitle">Welcome Trainer!</h2>

        <form onSubmit={handleLogin} className="loginForm">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <div className="errorMessage">{error}</div>}

          <button type="submit" className="loginButton" onClick={handleLogin}>
            Log In
          </button>
        </form>
        <div className="createAccountInfoDiv">
          <NavLink to="register" className="navigateToRegisterBtn">
            Dont have an account? Create one here!
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
