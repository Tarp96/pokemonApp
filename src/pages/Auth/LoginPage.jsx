import React, { useState } from "react";
import "./LoginPage.css";
import pokemonLogo from "../assets/pokemon_logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={pokemonLogo} alt="Pokémon Logo" className="pokemon-logo" />
        <h2 className="login-title">Welcome Trainer!</h2>

        <form onSubmit={handleLogin} className="login-form">
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

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
