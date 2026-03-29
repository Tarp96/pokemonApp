export const getFirebaseErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "This email is already registered. Try logging in.";

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/weak-password":
      return "Password should be at least 6 characters.";

    case "auth/user-not-found":
      return "No account found with this email.";

    case "auth/wrong-password":
      return "Incorrect password. Please try again.";

    default:
      return "Something went wrong. Please try again.";
  }
};
