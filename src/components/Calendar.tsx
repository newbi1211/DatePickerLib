import React from "react";

const Calendar = ({
  currentDate,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: {
  currentDate: Date;
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<null | Date>>;
  setEndDate: React.Dispatch<React.SetStateAction<null | Date>>;
}) => {
  const toDay = new Date();

  const onClickDate = (date: Date, i: number) => {
    const tempDate = new Date(date.getFullYear(), date.getMonth(), i + 1);

    if (!startDate || (startDate && endDate)) {
      setStartDate(tempDate);
      setEndDate(null);
    } else if (startDate && tempDate < startDate) {
      setEndDate(startDate);
      setStartDate(tempDate);
    } else if (startDate.toDateString() === tempDate.toDateString()) {
      setEndDate(null);
      setStartDate(null);
    } else {
      setEndDate(tempDate);
    }
  };

  const dateRender = () => {
    const dates = [];
    const firstDateOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDateOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const lastMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );

    const firstDate = firstDateOfMonth.getDay() * -1;
    const lastDate = lastDateOfMonth.getDate();
    const lastDateofLastMonth = lastMonthDate.getDate();

    for (let i = firstDate; i < 42 + firstDate; i++) {
      if (i < 0) {
        dates.push(
          <div key={i} className="w(30) h(30) pack invisible">
            {lastDateofLastMonth + i}
          </div>
        );
      } else if (i >= 0 && i < lastDate) {
        const tempDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          i + 1
        );
        const isToday =
          toDay.getFullYear() === tempDate.getFullYear() &&
          toDay.getMonth() === tempDate.getMonth() &&
          toDay.getDate() === tempDate.getDate()
            ? "border-box b(0.25) bc(#749d5f)"
            : "";
        const isStart =
          startDate &&
          startDate.getFullYear() === tempDate.getFullYear() &&
          startDate.getMonth() === tempDate.getMonth() &&
          startDate.getDate() === tempDate.getDate()
            ? `bg(#749d5f) c(white)! transition-property(border-radius) transition-duration(0.1s) ${
                startDate && endDate && startDate != endDate ? "rr(0)!" : ""
              }`
            : "c(black)";
        const isEnd =
          endDate &&
          endDate.getFullYear() === tempDate.getFullYear() &&
          endDate.getMonth() === tempDate.getMonth() &&
          endDate.getDate() === tempDate.getDate()
            ? `bg(#749d5f) c(white)! transition-property(border-radius) transition-duration(0.1s) ${
                startDate && endDate && startDate != endDate ? "rl(0)!" : ""
              }`
            : "c(black)";
        const isRange =
          startDate && endDate && startDate < tempDate && tempDate < endDate
            ? "bg(#d3d3d3)! r(0)! transition-duration(0s)!"
            : "";
        dates.push(
          <div
            key={i}
            onClick={() => onClickDate(currentDate, i)}
            className={`w(30) h(30) pb(2) pack r(50%) pointer user-select-none hover:bg(#749d5f)! hover:c(white)! transition-property(background, color) transition-duration(0.2s) ${isToday} ${isStart} ${isEnd} ${isRange}`}
          >
            <span className="font(10) 500">{i + 1}</span>
          </div>
        );
      } else {
        dates.push(
          <div key={i} className={`w(30) h(30) pack invisible`}>
            {i - lastDate + 1}
          </div>
        );
      }
    }

    return dates;
  };

  return (
    <div className="w(210) h(246)">
      <div className="hbox h(30) w(100%) justify-around">
        <div className="font(10) c(#8a8c8e) text-center 500 user-select-none">
          일
        </div>
        <div className="font(10) c(#8a8c8e) text-center 500 user-select-none">
          월
        </div>
        <div className="font(10) c(#8a8c8e) text-center 500 user-select-none">
          화
        </div>
        <div className="font(10) c(#8a8c8e) text-center 500 user-select-none">
          수
        </div>
        <div className="font(10) c(#8a8c8e) text-center 500 user-select-none">
          목
        </div>
        <div className="font(10) c(#8a8c8e) text-center 500 user-select-none">
          금
        </div>
        <div className="font(10) c(#8a8c8e) text-center 500 user-select-none">
          토
        </div>
      </div>
      <div className="grid(7) row-gap(6px)">{dateRender()}</div>
    </div>
  );
};

export default Calendar;
