import typeColors from "../utils/typecolors";
import { firstLetterUpperCase } from "../utils/helperFunctions";

export const TypeBadge = ({ type }) => {
  const color = typeColors[type] || "#ccc";

  return (
    <span
      style={{
        padding: "5px 12px",
        fontSize: "14px",
        borderRadius: "20px",
        fontWeight: "bold",
        display: "inline-block",
        textTransform: "capitalize",
        backgroundColor: color,
        color: "white",
        marginRight: "8px",
        marginBottom: "8px",
      }}
    >
      {firstLetterUpperCase(type)}
    </span>
  );
};
