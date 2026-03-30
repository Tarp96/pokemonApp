import { TbStar, TbStarFilled } from "react-icons/tb";

export const FavoriteButton = ({ onClick, isClicked }) => {
  return (
    <div>
      <button
        onClick={onClick}
        aria-label={isClicked ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={isClicked}
      >
        {isClicked ? <TbStarFilled className="filledIcon" /> : <TbStar />}
      </button>
    </div>
  );
};
