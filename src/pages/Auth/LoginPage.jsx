import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "./../../services/authService";
import { useAuth } from "./../../contexts/authContext/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import loginPic from "../../assets/loginPic.webp";
import { ImageWithSkeleton } from "../../components/SkeletonLoading/ImageWithSkeleton";

const LoginPage = () => {
  const { userLoggedIn, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isFormValid = email && password;

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

  const googleSignIn = async (e) => {
    e.preventDefault();

    if (isSigningIn) return;

    setIsSigningIn(true);
    setError("");

    try {
      await doSignInWithGoogle();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google sign-in failed. Please try again.");
    } finally {
      setIsSigningIn(false);
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
            <ImageWithSkeleton
              src={loginPic}
              alt="Official Pokemon Explorers of the sky artwork"
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
              className="loginForm formSpaceControl loginFormSpecific"
              id="loginForm"
            >
              <div className="formField">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  disabled={submitting}
                  autoFocus
                />
              </div>

              <div className="formField">
                <div className="passwordWrapper">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={submitting}
                  />

                  <button
                    type="button"
                    className="togglePassword"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <NavLink to="/forgot-password" className="uiAuthForgotLink">
                Forgot Password?
              </NavLink>

              {error && <div className="errorMessage">{error}</div>}
              {success && <div className="successMessage">{success}</div>}
            </form>
            <div className="authButtonContainer">
              <div className="uiAuthLinkContainer">
                <p className="uiAuthLinkText">Don't have an account?</p>
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
                disabled={submitting || !isFormValid}
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
