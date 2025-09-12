export const InformationList = ({ items = [], className = "" }) => (
  <div className={`infoList ${className}`}>
    <ul>
      {items.map(({ label, value, wrap }, idx) => (
        <li key={label ?? idx} className={wrap ? "allow-wrap" : ""}>
          <span className="listItemTopic">{label}:</span>
          <span className="listItemValue">{value ?? "—"}</span>
        </li>
      ))}
    </ul>
  </div>
);
