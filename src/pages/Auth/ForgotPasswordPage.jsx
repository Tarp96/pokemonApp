import loginArt from "../../assets/loginPic.webp";
import { useState } from "react";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  return (
    <>
      <div className="forgotPasswordPageContainer">
        <div className="forgotPasswordImageContainer">
          <img src={loginArt} alt="" />
        </div>
        <div className="forgotPasswordFormContainer">
          <h1>Forgot your password?</h1>

          <form className="forgotPasswordForm">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit">Send Reset Email</button>
          </form>
        </div>
      </div>
    </>
  );
};
