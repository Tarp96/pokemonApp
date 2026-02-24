import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

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
    <>
      <div className="registerContainer">
        <div className="registerCard">
          <img
            src="https://64.media.tumblr.com/f3cf3c3c5083acf7ab7444abc7698737/50fc556398e85aa7-a2/s1280x1920/59b1238ca19f82b5e7b1b24061911267a3e9abbc.jpg"
            alt="Pokémon Logo"
            className="registerPagePicture"
          />
          <h2 className="registerTitle">Join the Adventure!</h2>

          <form onSubmit={handleRegister} className="registerForm">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

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
