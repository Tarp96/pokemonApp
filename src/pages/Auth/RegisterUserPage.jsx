import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { NavLink } from "react-router-dom";
import registerUserImage from "../../assets/registerUserPic.webp";
import { ImageWithSkeleton } from "../../components/SkeletonLoading/ImageWithSkeleton";

const RegisterUserPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const navigate = useNavigate();

  const usernameError =
    username && username.length > 7 ? "Max 7 characters" : "";

  const emailError =
    email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? "Please enter a valid email address"
      : "";

  const passwordError =
    password && password.length < 6
      ? "Must be at least 6 characters long"
      : password && !/\d/.test(password)
        ? "Must include a number"
        : "";

  const confirmPasswordError =
    confirmPassword && confirmPassword !== password
      ? "Passwords do not match"
      : "";

  const isFormValid =
    username &&
    username.length <= 7 &&
    email &&
    !emailError &&
    password.length >= 6 &&
    /\d/.test(password) &&
    confirmPassword === password;

  const passwordStrengthCalc = (value) => {
    let score = 0;

    if (value.length >= 6) score++;
    if (value.length >= 8) score++;
    if (/\d/.test(value)) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    if (score <= 2) setPasswordStrength("Weak");
    else if (score === 3 || score === 4) setPasswordStrength("Medium");
    else setPasswordStrength("Strong");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

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
        pokemonCaught: 0,
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
            <ImageWithSkeleton
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
              <div className="formField registerFormField">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, username: true }))
                  }
                  className={
                    touched.username && usernameError
                      ? "inputError"
                      : touched.username && username
                        ? "inputSuccess"
                        : ""
                  }
                />
                {touched.username && usernameError && (
                  <span className="fieldError animatedError">
                    {usernameError}
                  </span>
                )}
              </div>

              <div className="formField registerFormField">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, email: true }))
                  }
                  className={
                    touched.email && emailError
                      ? "inputError"
                      : touched.email && email
                        ? "inputSuccess"
                        : ""
                  }
                />

                {touched.email && emailError && (
                  <span className="fieldError animatedError">{emailError}</span>
                )}
              </div>

              <div className="formField registerFormField">
                <label htmlFor="password">Password</label>
                <div className="strengthBar">
                  <div
                    className={`strengthFill ${passwordStrength.toLowerCase()}`}
                  ></div>
                </div>

                <div className="passwordWrapper">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      passwordStrengthCalc(e.target.value);
                    }}
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, password: true }))
                    }
                    className={
                      touched.password && passwordError
                        ? "inputError"
                        : touched.password && password
                          ? "inputSuccess"
                          : ""
                    }
                  />

                  <button
                    type="button"
                    className="togglePassword"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {password && (
                  <span
                    className={`passwordStrength ${passwordStrength.toLowerCase()}`}
                  >
                    {passwordStrength}
                  </span>
                )}

                {touched.password && passwordError && (
                  <span className="fieldError animatedError">
                    {passwordError}
                  </span>
                )}
              </div>

              <div className="formField registerFormField">
                <label htmlFor="confirmPassword">Confirm Password</label>

                <div className="passwordWrapper">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, confirmPassword: true }))
                    }
                    className={
                      touched.confirmPassword && confirmPasswordError
                        ? "inputError"
                        : touched.confirmPassword && confirmPassword
                          ? "inputSuccess"
                          : ""
                    }
                  />

                  <button
                    type="button"
                    className="togglePassword"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {touched.confirmPassword && confirmPasswordError && (
                  <span className="fieldError animatedError">
                    {confirmPasswordError}
                  </span>
                )}
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
                disabled={!isFormValid}
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
