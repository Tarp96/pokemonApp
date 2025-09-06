import typeColors from "../utils/typecolors";
import { firstLetterUpperCase } from "../utils/helperFunctions";
import { getTypeIcon } from "../utils/typeIcons";

export const TypeBadge = ({ type }) => {
  const color = typeColors[type] || "#ccc";
  const icon = getTypeIcon(type);

  return (
    <span
      style={{
        padding: "5px 12px",
        fontSize: "14px",
        borderRadius: "20px",
        fontWeight: "bold",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        textTransform: "capitalize",
        backgroundColor: color,
        color: "white",
        marginRight: "8px",
        marginBottom: "8px",
      }}
    >
      {icon && (
        <img
          src={icon}
          alt={`${type} type`}
          style={{ width: "18px", height: "18px" }}
        />
      )}
      {firstLetterUpperCase(type)}
    </span>
  );
};
