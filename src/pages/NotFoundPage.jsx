import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="notFoundContainer">
      <div className="notFoundCard">
        <h1>404</h1>
        <p>Oops... Seems like something went wrong</p>
      </div>
    </div>
  );
};
