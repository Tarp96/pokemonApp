import forgotPasswordImage from "../../assets/forgotpassImage.jpg";
import { useState, useEffect } from "react";
import { doPasswordReset } from "../../services/auth/authService";
import { getFirebaseErrorMessage } from "../../utils/firebase/getFirebaseErrorMessage";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(null);

  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    try {
      setIsSending(true);

      await doPasswordReset(email);

      setMessage("Password reset email sent!");
      setRedirectCountdown(4);
    } catch (err) {
      setError(getFirebaseErrorMessage(err.code));
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (redirectCountdown === null) return;

    if (redirectCountdown === 0) {
      navigate("/login");
      return;
    }

    const timer = setTimeout(() => {
      setRedirectCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [redirectCountdown, navigate]);

  return (
    <div className="forgotPasswordPage">
      <motion.div
        className="forgotPasswordPageContainer"
        initial={{
          opacity: 0,
          x: 30,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          x: -30,
          scale: 0.98,
        }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
        }}
      >
        <div className="forgotPasswordImageContainer">
          <img src={forgotPasswordImage} alt="Pokemon artwork" />
        </div>

        <div className="forgotPasswordFormContainer">
          <div className="forgotPasswordContent">
            <h1 className="forgotPasswordPageTitle">Forgot your password?</h1>

            <p>
              {!isSending
                ? "Enter your email address and we’ll send you a password reset link."
                : "Sending...."}
            </p>

            <form
              className="forgotPasswordForm"
              onSubmit={handlePasswordReset}
              disabled={isSending || message}
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button type="submit" disabled={isSending}>
                {isSending ? "Sending..." : "Send Reset Email"}
              </button>
            </form>

            <NavLink to="/login" className="backToLoginLink">
              ← Back to Login
            </NavLink>

            {message && (
              <div className="forgotPasswordSuccessContainer">
                <p className="forgotPasswordSuccessMessage">{message}</p>

                <p className="forgotPasswordRedirectText">
                  Redirecting to login in {redirectCountdown}...
                </p>
              </div>
            )}

            {error && <p className="forgotPasswordErrorMessage">{error}</p>}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
