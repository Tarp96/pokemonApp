export const InformationList = ({ items }) => (
  <div className="infoList">
    <ul>
      {items.map(({ label, value }) => (
        <li key={label}>
          <span className="listItemTopic">{label}: </span>
          {value}
        </li>
      ))}
    </ul>
  </div>
);
