import typeColors from "../utils/typecolors";
import { firstLetterUpperCase } from "../utils/helperFunctions";
import { getTypeIcon } from "../utils/typeIcons";

export const TypeBadge = ({
  type,
  withIcon = false,
  variant = "compact",
  className = "",
}) => {
  const bg = typeColors[type] || "#888";
  const iconUrl = withIcon ? getTypeIcon(type) : null;

  return (
    <span
      className={`typeBadge ${variant} ${className}`}
      style={{ backgroundColor: bg, color: "white" }}
    >
      {iconUrl && (
        <img
          src={iconUrl}
          alt=""
          aria-hidden="true"
          className="typeBadgeIcon"
        />
      )}
      {firstLetterUpperCase(type)}
    </span>
  );
};
