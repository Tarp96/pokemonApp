import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { NavLink } from "react-router-dom";
import registerImage from "../../assets/registerPageArt.png";
import { ImageWithSkeleton } from "../../components/SkeletonLoading/ImageWithSkeleton";
import { getFirebaseErrorMessage } from "../../utils/firebase/getFirebaseErrorMessage";

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
      const message = getFirebaseErrorMessage(err.code);
      setError(message);
      console.error(err);
    }
  };

  return (
    <div className="registerContainer">
      <div className="uiCard uiAuthSplit">
        <div className="uiAuthContent">
          <div className="uiAuthHero">
            <ImageWithSkeleton
              src={registerImage}
              alt="Pokémon Trainers"
              className="uiCardHero"
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
                  required
                  id="username"
                  type="text"
                  autoComplete="username"
                  aria-describedby="username-error"
                  aria-invalid={!!(touched.username && usernameError)}
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
                  <span
                    id="username-error"
                    className="fieldError animatedError"
                  >
                    {usernameError}
                  </span>
                )}
              </div>

              <div className="formField registerFormField">
                <label htmlFor="email">Email</label>
                <input
                  required
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-describedby="email-error"
                  aria-invalid={!!(touched.email && emailError)}
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
                  <span id="email-error" className="fieldError animatedError">
                    {emailError}
                  </span>
                )}
              </div>

              <div className="formField registerFormField">
                <label htmlFor="password">Password</label>

                <div
                  className="strengthBar"
                  role="progressbar"
                  aria-valuenow={
                    passwordStrength === "Weak"
                      ? 33
                      : passwordStrength === "Medium"
                        ? 66
                        : passwordStrength === "Strong"
                          ? 100
                          : 0
                  }
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label="Password strength"
                >
                  <div
                    className={`strengthFill ${passwordStrength.toLowerCase()}`}
                  ></div>
                </div>

                <div className="passwordWrapper">
                  <input
                    required
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    aria-describedby="password-error"
                    aria-invalid={!!(touched.password && passwordError)}
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
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
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
                  <span
                    id="password-error"
                    className="fieldError animatedError"
                  >
                    {passwordError}
                  </span>
                )}
              </div>

              <div className="formField registerFormField">
                <label htmlFor="confirmPassword">Confirm Password</label>

                <div className="passwordWrapper">
                  <input
                    required
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    aria-describedby="confirmPassword-error"
                    aria-invalid={
                      !!(touched.confirmPassword && confirmPasswordError)
                    }
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() =>
                      setTouched((prev) => ({
                        ...prev,
                        confirmPassword: true,
                      }))
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
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {touched.confirmPassword && confirmPasswordError && (
                  <span
                    id="confirmPassword-error"
                    className="fieldError animatedError"
                  >
                    {confirmPasswordError}
                  </span>
                )}
              </div>

              {error && (
                <div
                  className="errorMessage loginRegisterFeedbackMessage"
                  aria-live="assertive"
                >
                  {error}
                </div>
              )}

              {success && (
                <div
                  className="successMessage loginRegisterFeedbackMessage"
                  aria-live="polite"
                >
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
