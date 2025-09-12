export const InformationList = ({
  labelOne,
  labelTwo,
  labelThree,
  labelFour,
  labelFive,
  labelSix,
  listItemOne,
  listItemTwo,
  listItemThree,
  listItemFour,
  listItemFive,
  listItemSix,
}) => {
  return (
    <>
      <div className="infoList">
        <ul>
          <li>
            <span className="listItemTopic">{labelOne}: </span>
            {listItemOne}
          </li>
          <li>
            <span className="listItemTopic">{labelTwo}:</span> {listItemTwo}
          </li>
          <li>
            <span className="listItemTopic">{labelThree}: </span>
            {listItemThree}
          </li>
          <li>
            <span className="listItemTopic">{labelFour}: </span>

            {listItemFour}
          </li>
          <li>
            <span className="listItemTopic">{labelFive}:</span> {listItemFive}
          </li>
          <li>
            <span className="listItemTopic">{labelSix}:</span> {listItemSix}
          </li>
        </ul>
      </div>
    </>
  );
};
