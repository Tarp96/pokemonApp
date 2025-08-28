import { TbStar, TbStarFilled } from "react-icons/tb";

export const FavoriteButton = ({ onClick, isClicked }) => {
  return (
    <div>
      <button onClick={onClick}>
        {isClicked ? <TbStarFilled className="filledIcon" /> : <TbStar />}
      </button>
    </div>
  );
};
