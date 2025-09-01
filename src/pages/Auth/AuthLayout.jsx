import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <>
      <h2>Log in or register!</h2>
      <Outlet />
    </>
  );
};
