import styled from "styled-components";

const QuickSelector = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  setCurrentDate,
}: {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<null | Date>>;
  setEndDate: React.Dispatch<React.SetStateAction<null | Date>>;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}) => {
  const onClickSelector = (sDate: Date, eDate: Date) => {
    if (sDate < eDate) {
      setStartDate(sDate);
      setEndDate(eDate);
    } else {
      setStartDate(eDate);
      setEndDate(sDate);
    }
    if (eDate.getMonth() - sDate.getMonth() < 2) {
      setCurrentDate(sDate);
    } else {
      setCurrentDate(eDate);
    }
  };

  const toDay = new Date();
  const yesterDay = new Date(
    toDay.getFullYear(),
    toDay.getMonth(),
    toDay.getDate() - 1
  );
  const thisWeek = [
    new Date(toDay.getFullYear(), toDay.getMonth(), toDay.getDate() - 6),
    new Date(toDay.getFullYear(), toDay.getMonth(), toDay.getDate()),
  ];
  const lastWeek = [
    new Date(toDay.getFullYear(), toDay.getMonth(), toDay.getDate() - 13),
    new Date(toDay.getFullYear(), toDay.getMonth(), toDay.getDate() - 7),
  ];
  const thisMonth = [
    new Date(toDay.getFullYear(), toDay.getMonth(), 1),
    new Date(toDay.getFullYear(), toDay.getMonth(), toDay.getDate()),
  ];
  const lastMonth = [
    new Date(toDay.getFullYear(), toDay.getMonth() - 1, 1),
    new Date(toDay.getFullYear(), toDay.getMonth(), 0),
  ];
  const thisYear = [
    new Date(toDay.getFullYear(), 0, 1),
    new Date(toDay.getFullYear(), toDay.getMonth(), toDay.getDate()),
  ];
  const lastYear = [
    new Date(toDay.getFullYear() - 1, 0, 1),
    new Date(toDay.getFullYear(), 0, 0),
  ];

  const isActive = (sDate: Date, eDate: Date) => {
    const temp =
      startDate &&
      startDate.getFullYear() === sDate.getFullYear() &&
      startDate.getMonth() === sDate.getMonth() &&
      startDate.getDate() === sDate.getDate() &&
      endDate &&
      endDate.getFullYear() === eDate.getFullYear() &&
      endDate.getMonth() === eDate.getMonth() &&
      endDate.getDate() === eDate.getDate()
        ? true
        : false;

    return temp;
  };

  return (
    <div
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        marginRight: "10px",
      }}
    >
      <QuickSelectorItem
        isActive={isActive(toDay, toDay)}
        onClick={() => onClickSelector(toDay, toDay)}
      >
        오늘
      </QuickSelectorItem>
      <QuickSelectorItem
        isActive={isActive(yesterDay, yesterDay)}
        onClick={() => onClickSelector(yesterDay, yesterDay)}
      >
        어제
      </QuickSelectorItem>
      <QuickSelectorItem
        isActive={isActive(thisWeek[0], thisWeek[1])}
        onClick={() => onClickSelector(thisWeek[0], thisWeek[1])}
      >
        이번주
      </QuickSelectorItem>
      <QuickSelectorItem
        isActive={isActive(lastWeek[0], lastWeek[1])}
        onClick={() => onClickSelector(lastWeek[0], lastWeek[1])}
      >
        지난주
      </QuickSelectorItem>
      <QuickSelectorItem
        isActive={isActive(thisMonth[0], thisMonth[1])}
        onClick={() => onClickSelector(thisMonth[0], thisMonth[1])}
      >
        이번달
      </QuickSelectorItem>
      <QuickSelectorItem
        isActive={isActive(lastMonth[0], lastMonth[1])}
        onClick={() => onClickSelector(lastMonth[0], lastMonth[1])}
      >
        지난달
      </QuickSelectorItem>
      <QuickSelectorItem
        isActive={isActive(thisYear[0], thisYear[1])}
        onClick={() => onClickSelector(thisYear[0], thisYear[1])}
      >
        올해
      </QuickSelectorItem>
      <QuickSelectorItem
        isActive={isActive(lastYear[0], lastYear[1])}
        onClick={() => onClickSelector(lastYear[0], lastYear[1])}
      >
        작년
      </QuickSelectorItem>
    </div>
  );
};

export default QuickSelector;

const QuickSelectorItem = styled.div<{ isActive: boolean }>`
  cursor: pointer;
  width: 90px;
  height: 35px;
  font-size: 16px;
  color: #8a8c8e;
  border-radius: 0 6px 6px 0;
  transition-property: background;
  transition-duration: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background: #d8d8d87d;
  }
  background: ${(props) => (props.isActive ? "#749d5f !important" : "unset")};
  color: ${(props) => (props.isActive ? "white !important" : "#8a8c8e")};
`;
