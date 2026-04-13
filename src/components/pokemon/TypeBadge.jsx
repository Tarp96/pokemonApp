import typeColors from "../../utils/typecolors";
import { firstLetterUpperCase } from "../../utils/helperFunctions";
import { getTypeIcon } from "../../utils/typeIcons";

export const TypeBadge = ({
  type,
  withIcon = false,
  variant = "compact",
  className = "",
}) => {
  const style = typeColors[type] || { bg: "#888", color: "#fff" };
  const iconUrl = withIcon ? getTypeIcon(type) : null;
  const displayName = firstLetterUpperCase(type);

  return (
    <span
      className={`typeBadge ${variant} ${className}`}
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
