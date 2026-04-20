import { useNavigate } from "react-router-dom";
import psyduckImage from "../assets/psyduck404.webp";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="notFoundContainer">
      <div className="notFoundCard">
        <h1>404</h1>
        <p>Oops... Seems like something went wrong</p>
        <img
          src={psyduckImage}
          alt="confused psyduck"
          className="notFoundImage"
        />

        <button>Go Back</button>
      </div>
    </div>
  );
};
