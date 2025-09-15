import { useNavigate } from "react-router-dom";
import { firstLetterUpperCase } from "../utils/helperFunctions";

export default function PrevNextMonButton({ mon, direction }) {
  const navigate = useNavigate();

  if (!mon) return null;

  return (
    <button
      onClick={() => navigate(`/pokemon/${mon.name}`)}
      className="prevAndNextMonButton"
    >
      <div className="prevAndNextInnerContainer">
        {direction === "prev" ? (
          <>
            <div className="secondInnerDiv">
              <img
                src={mon?.sprites?.other["official-artwork"]?.front_default}
                alt={mon.name}
              />
            </div>
            <div className="firstInnerDiv">
              <div className="monId">#{mon.id}</div>
              <div className="monName">{firstLetterUpperCase(mon.name)}</div>
            </div>
          </>
        ) : (
          <>
            <div className="firstInnerDiv">
              <div className="monId">#{mon.id}</div>
              <div className="monName">{firstLetterUpperCase(mon.name)}</div>
            </div>
            <div className="secondInnerDiv">
              <img
                src={mon?.sprites?.other["official-artwork"]?.front_default}
                alt={mon.name}
              />
            </div>
          </>
        )}
      </div>
    </button>
  );
}
