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

  const commonCss =
    "pointer w(90) h(35) pack font(16) c(#8a8c8e) rr(6) hover:bg(#d8d8d87d) transition-property(background) transition-duration(0.2s)";

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
    new Date(toDay.getFullYear(), toDay.getMonth(), toDay.getDate() - 29),
    new Date(toDay.getFullYear(), toDay.getMonth(), toDay.getDate()),
  ];
  const lastMonth = [
    new Date(toDay.getFullYear(), toDay.getMonth(), toDay.getDate() - 59),
    new Date(toDay.getFullYear(), toDay.getMonth(), toDay.getDate() - 30),
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
        ? "bg(#749d5f)! c(white)!"
        : "";

    return temp;
  };

  return (
    <div className="user-select-none">
      <div
        className={`${commonCss} ${isActive(toDay, toDay)}`}
        onClick={() => onClickSelector(toDay, toDay)}
      >
        오늘
      </div>
      <div
        className={`${commonCss} ${isActive(yesterDay, yesterDay)}`}
        onClick={() => onClickSelector(yesterDay, yesterDay)}
      >
        어제
      </div>
      <div
        className={`${commonCss} ${isActive(thisWeek[0], thisWeek[1])}`}
        onClick={() => onClickSelector(thisWeek[0], thisWeek[1])}
      >
        이번주
      </div>
      <div
        className={`${commonCss} ${isActive(lastWeek[0], lastWeek[1])}`}
        onClick={() => onClickSelector(lastWeek[0], lastWeek[1])}
      >
        지난주
      </div>
      <div
        className={`${commonCss} ${isActive(thisMonth[0], thisMonth[1])}`}
        onClick={() => onClickSelector(thisMonth[0], thisMonth[1])}
      >
        이번달
      </div>
      <div
        className={`${commonCss} ${isActive(lastMonth[0], lastMonth[1])}`}
        onClick={() => onClickSelector(lastMonth[0], lastMonth[1])}
      >
        지난달
      </div>
      <div
        className={`${commonCss} ${isActive(thisYear[0], thisYear[1])}`}
        onClick={() => onClickSelector(thisYear[0], thisYear[1])}
      >
        올해
      </div>
      <div
        className={`${commonCss} ${isActive(lastYear[0], lastYear[1])}`}
        onClick={() => onClickSelector(lastYear[0], lastYear[1])}
      >
        작년
      </div>
    </div>
  );
};

export default QuickSelector;
