import typeColors from "../utils/typecolors";
import { firstLetterUpperCase } from "../utils/helperFunctions";

export const TypeBadge = ({ type }) => {
  const color = typeColors[type] || "#ccc";

  return (
    <span
      className="typeBadge"
      style={{
        backgroundColor: color,
        color: "white",
        display: "inline-block",
        padding: "5px 12px",
        fontSize: "14px",
        borderRadius: "20px",
        fontWeight: "bold",
        textTransform: "capitalize",
        marginRight: "8px",
        marginBottom: "8px",
        transition: "all 0.3s ease",
      }}
    >
      {firstLetterUpperCase(type)}
    </span>
  );
};
