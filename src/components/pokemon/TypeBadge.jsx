import typeColors from "../../utils/constants/typecolors";
import { firstLetterUpperCase } from "../../utils/format/helperFunctions";
import { getTypeIcon } from "../../utils/constants/typeIcons";

export const TypeBadge = ({
  type,
  withIcon = false,
  variant = "compact",
  className = "",
}) => {
  const style = typeColors[type] || { bg: "#888", color: "#fff" };
  const iconUrl = withIcon ? getTypeIcon(type) : null;
  const displayName = firstLetterUpperCase(type);

  const longNameClass = type.length >= 7 ? "smallText" : "";

  return (
    <span
      className={`typeBadge ${variant} ${longNameClass} ${className}`}
      style={{
        backgroundColor: style.bg,
        color: style.color,
      }}
      aria-label={displayName}
    >
      {iconUrl && (
        <img
          src={iconUrl}
          alt=""
          aria-hidden="true"
          className="typeBadgeIcon"
        />
      )}
      {displayName}
    </span>
  );
};
