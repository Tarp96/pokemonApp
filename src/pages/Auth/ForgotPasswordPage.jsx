import loginArt from "../../assets/loginPic.webp";

export const ForgotPasswordPage = () => {
  return (
    <>
      <div className="forgotPasswordPageContainer">
        <div className="forgotPasswordImageContainer">
          <img src={loginArt} alt="" />
        </div>
        <div className="forgotPasswordFormContainer">
          <h1>Forgot your password?</h1>
        </div>
      </div>
    </>
  );
};
