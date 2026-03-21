import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { NavLink } from "react-router-dom";
import registerUserImage from "../../assets/registerUserPic.webp";

const RegisterUserPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: user.email,
        coins: 600,
        coinsSpent: 0,
        highScore: 0,
        quoteId: 1,
        avatarId: 1,
        createdAt: new Date(),
      });

      setSuccess("Account created successfully! 🎉 Redirecting...");
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
    } catch (err) {
      console.error("Error registering user:", err);
      setError(err.message);
    }
  };

  return (
    <div className="registerContainer">
      <div className="uiCard uiAuthSplit">
        <div className="uiAuthContent">
          <div className="uiAuthHero">
            <img
              src={registerUserImage}
              alt="Pokémon Trainers"
              className="uiCardHero square"
            />
          </div>

          <div className="uiCardBody">
            <h2 className="registerTitle">Join the Adventure!</h2>

            <p className="uiAuthInfoText">
              Create your account and start your journey as a Pokémon Trainer.
            </p>

            <form
              onSubmit={handleRegister}
              className="loginForm registerForm formSpaceControl"
              id="registerForm"
            >
              <div className="formField">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="formField">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                />
              </div>

              <div className="formField">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {error && (
                <div className="errorMessage loginRegisterFeedbackMessage">
                  {error}
                </div>
              )}

              {success && (
                <div className="successMessage loginRegisterFeedbackMessage">
                  {success}
                </div>
              )}
            </form>

            <div className="authButtonContainer">
              <div className="uiAuthLinkContainer">
                <p className="uiAuthLinkText">Already have an account?</p>
                <NavLink to="/login" className="uiAuthLink">
                  Log In <span>&gt;</span>
                  <span>&gt;</span>
                  <span>&gt;</span>
                </NavLink>
              </div>

              <button
                type="submit"
                className="uiAuthButton"
                onClick={handleRegister}
                form="registerForm"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUserPage;
