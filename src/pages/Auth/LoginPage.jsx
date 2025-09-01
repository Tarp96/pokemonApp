import { useState } from "react";
import { Navigate, Link } from "react-router-dom";

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
    <div className="loginContainer">
      <div className="loginCard">
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

          <button type="submit" className="loginButton">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
