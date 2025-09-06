import typeColors from "../utils/typecolors";
import { firstLetterUpperCase } from "../utils/helperFunctions";
import { getTypeIcon } from "../utils/typeIcons";

export const TypeBadgeWithIcon = ({ type }) => {
  const bg = typeColors[type] || "#888";
  const icon = getTypeIcon(type);

  const iconStyle = {
    width: "18px",
    height: "18px",
    border: "1px solid #fff",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    objectFit: "contain",
    display: "block",
  };

  return (
    <span
      style={{
        backgroundColor: bg,
        color: "white",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "4px 12px",
        height: "28px",
        borderRadius: "999px",
        fontFamily: "Montserrat, sans-serif",
        fontSize: "14px",
        fontWeight: 600,
        textTransform: "capitalize",
        whiteSpace: "nowrap",
        transition: "transform 0.2s ease, opacity 0.2s ease",
      }}
    >
      {icon && <img src={icon} alt="" aria-hidden="true" style={iconStyle} />}
      {firstLetterUpperCase(type)}
    </span>
  );
};
