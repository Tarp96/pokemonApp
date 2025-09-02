import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const RegisterUserPage = () => {
  const [email, setEmail] = useState("");
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
        password
      );
      console.log("User registered:", userCredential.user);

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
    <>
      <div className="registerContainer">
        <div className="registerCard">
          <img
            src="/assets/pokeb.png"
            alt="Pokémon Logo"
            className="pokemonLogo"
          />
          <h2 className="registerTitle">Join the Adventure!</h2>

          <form onSubmit={handleRegister} className="registerForm">
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

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

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

            <button type="submit" className="registerButton">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterUserPage;
