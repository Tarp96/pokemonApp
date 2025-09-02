import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "./../../services/authService";
import { useAuth } from "./../../contexts/authContext/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { userLoggedIn, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      await doSignInWithEmailAndPassword(email, password);
      setSuccess("Logged in successfully! 🎉 Redirecting…");
      setTimeout(() => navigate("/", { replace: true }), 1500);
    } catch (err) {
      console.error("Login error:", err);
      const msg =
        err.code === "auth/user-not-found"
          ? "No account found for this email."
          : err.code === "auth/wrong-password"
          ? "Incorrect password."
          : err.code === "auth/invalid-email"
          ? "Please enter a valid email address."
          : err.code === "auth/too-many-requests"
          ? "Too many attempts. Please try again later."
          : "Failed to log in. Please try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const googleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((err) => {});
    }
  };

  if (!loading && userLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="loginContainer">
      <div className="loginCard">
        <img
          src="https://www.redbrick.me/wp-content/uploads/2020/03/ESb0DWWXkAMxSzI.jpg"
          alt="Pokémon Logo"
          className="loginPagePicture"
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
            disabled={submitting}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={submitting}
          />

          {error && <div className="errorMessage">{error}</div>}
          {success && <div className="successMessage">{success}</div>}

          <button type="submit" className="loginButton" disabled={submitting}>
            {submitting ? "Logging in…" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
