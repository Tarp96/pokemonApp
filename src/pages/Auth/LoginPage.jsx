import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "./../../services/authService";
import { useAuth } from "./../../contexts/authContext/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import loginPic from "../../assets/loginPic.jpg";

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
      <div className="uiCard uiAuthSplit">
        <div className="uiAuthContent">
          <div className="uiAuthHero">
            <img
              src={loginPic}
              alt="Pokémon Logo"
              className="uiCardHero square"
            />
          </div>
          <div className="uiCardBody">
            <h2 className="loginTitle">Welcome Trainer!</h2>

            <p className="uiAuthInfoText">
              Log in to use this platform to its full potential
            </p>

            <form
              onSubmit={handleLogin}
              className="loginForm formSpaceControl"
              id="loginForm"
            >
              <div className="formField">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitting}
                />
              </div>

              <div className="formField">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={submitting}
                />
              </div>

              <NavLink to="/forgot-password" className="uiAuthForgotLink">
                Forgot Password?
              </NavLink>

              {error && <div className="errorMessage">{error}</div>}
              {success && <div className="successMessage">{success}</div>}
            </form>
            <div className="authButtonContainer">
              <div className="uiAuthLinkContainer">
                <p className="uiAuthLinkText">Dont have an account?</p>
                <NavLink to="register" className="uiAuthLink">
                  Register
                  <span>&gt;</span>
                  <span>&gt;</span>
                  <span>&gt;</span>
                </NavLink>
              </div>

              <button
                type="submit"
                className="uiAuthButton"
                disabled={submitting}
                form="loginForm"
              >
                {submitting ? "Logging in…" : "Log In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
