import forgotPasswordImage from "../../assets/forgotpassImage.jpg";
import { useState } from "react";
import { doPasswordReset } from "../../services/auth/authService";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  const handlePasswordReset = async (e) => {
    e.preventDefault();

    try {
      await doPasswordReset(email);

      setMessage("Password reset email sent! Check your inbox")
    } catch (err) {
      setError(err.message);
    }
  }

return (
  <div className="forgotPasswordPage">
    <div className="forgotPasswordPageContainer">
      <div className="forgotPasswordImageContainer">
        <img src={forgotPasswordImage} alt="Pokemon artwork" />
      </div>

      <div className="forgotPasswordFormContainer">
        <div className="forgotPasswordContent">
          <h1>Forgot your password?</h1>

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

            <button type="submit">
              Send Reset Email
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);
};
