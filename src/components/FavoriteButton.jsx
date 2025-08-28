import { TbStar, TbStarFilled } from "react-icons/tb";
import { useState } from "react";

export const FavoriteButton = ({ onClick, isClicked }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <div>
      <button onClick={onClick}>
        {isClicked ? <TbStarFilled /> : <TbStar />}
      </button>
    </div>
  );
};
