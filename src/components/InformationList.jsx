export const InformationList = ({ items = [] }) => {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div className="infoList">
      <ul>
        {items.map(({ label, value }, idx) => (
          <li key={label ?? idx}>
            <span className="listItemTopic">{label}:</span> {value ?? "—"}
          </li>
        ))}
      </ul>
    </div>
  );
};
