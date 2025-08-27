import { TbStar, TbStarFilled } from "react-icons/tb";

export const FavoriteButton = ({ onClick, isClicked }) => {
  return (
    <div>
      <button onClick={onClick}>
        <TbStar />
      </button>
    </div>
  );
};
