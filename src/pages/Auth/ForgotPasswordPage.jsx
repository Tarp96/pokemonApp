import forgotPasswordImage from "../../assets/forgotpassImage.jpg";
import { useState } from "react";
import { doPasswordReset } from "../../services/auth/authService";
import { getFirebaseErrorMessage } from "../../utils/firebase/getFirebaseErrorMessage";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    try {
      setIsSending(true);
      await doPasswordReset(email);

      setMessage("Password reset email sent! Check your inbox");
    } catch (err) {
      setError(getFirebaseErrorMessage(err.code));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="forgotPasswordPage">
      <div className="forgotPasswordPageContainer">
        <div className="forgotPasswordImageContainer">
          <img src={forgotPasswordImage} alt="Pokemon artwork" />
        </div>

        <div className="forgotPasswordFormContainer">
          <div className="forgotPasswordContent">
            <h1 className="forgotPasswordPageTitle">Forgot your password?</h1>

            <p>
              Enter your email address and we’ll send you a password reset link.
            </p>

            <form className="forgotPasswordForm" onSubmit={handlePasswordReset}>
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

            {message && (
              <p className="forgotPasswordSuccessMessage">{message}</p>
            )}

            {error && <p className="forgotPasswordErrorMessage">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
