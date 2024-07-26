import React from "react";
import styled from "styled-components";

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
        dates.push(<DateExtra key={i}>{lastDateofLastMonth + i}</DateExtra>);
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
            ? true
            : false;
        const isStart =
          startDate &&
          startDate.getFullYear() === tempDate.getFullYear() &&
          startDate.getMonth() === tempDate.getMonth() &&
          startDate.getDate() === tempDate.getDate()
            ? startDate && endDate && startDate != endDate
              ? 2
              : 1
            : 0;
        const isEnd =
          endDate &&
          endDate.getFullYear() === tempDate.getFullYear() &&
          endDate.getMonth() === tempDate.getMonth() &&
          endDate.getDate() === tempDate.getDate()
            ? startDate && endDate && startDate != endDate
              ? 2
              : 1
            : 0;
        const isRange =
          !!(startDate && endDate && startDate < tempDate && tempDate < endDate);
        dates.push(
          <DatesItem
            key={i}
            $isToday={isToday}
            $isStart={isStart}
            $isEnd={isEnd}
            $isRange={isRange}
            onClick={() => onClickDate(currentDate, i)}
          >
            <span style={{ fontSize: "10px", fontWeight: "500" }}>{i + 1}</span>
          </DatesItem>
        );
      } else {
        dates.push(<DateExtra key={i}>{i - lastDate + 1}</DateExtra>);
      }
    }

    return dates;
  };

  return (
    <div style={{ width: "210px", height: "246px" }}>
      <Days>
        <Day>일</Day>
        <Day>월</Day>
        <Day>화</Day>
        <Day>수</Day>
        <Day>목</Day>
        <Day>금</Day>
        <Day>토</Day>
      </Days>
      <Calender>{dateRender()}</Calender>
    </div>
  );
};

export default Calendar;

const Days = styled.div`
  display: flex;
  flex-flow: row;
  height: 30px;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

const Day = styled.div`
  color: #8a8c8e;
  font-size: 10px;
  text-align: center;
  user-select: none;
`;

const Calender = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  row-gap: 6px;
`;

interface DateProps {
  $isToday: boolean;
  $isStart: number;
  $isEnd: number;
  $isRange: boolean;
}

const DatesItem = styled.div<DateProps>`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  -webkit-user-select: none;
  cursor: pointer;
  color: #000;
  transition-duration: 0.2s;
  transition-property: background, color;
  /* border-radius: 50%; */
  &:hover {
    background: #749d5f !important;
    color: white !important;
  }

  box-sizing: ${({$isToday}) => ($isToday ? "border-box" : "unset")};
  border: ${({$isToday}) => ($isToday ? "1px solid #749d5f" : "none")};

  background: ${({$isStart, $isEnd}) =>
    $isStart > 0 || $isEnd > 0 ? "#749d5f" : "none"};
  color: ${({$isStart, $isEnd}) =>
    $isStart > 0 || $isEnd > 0 ? "white !important" : ""};
  transition-property: ${({$isStart, $isEnd}) =>
    $isStart > 0 || $isEnd > 0 ? "border-radius" : "none"};
  transition-duration: ${({$isStart, $isEnd}) =>
    $isStart > 0 || $isEnd > 0 ? "0.1s" : "none"};

  border-top-right-radius: ${({$isStart}) =>
    $isStart > 1 ? "0 !important" : "50%"};
  border-bottom-right-radius: ${({$isStart}) =>
    $isStart > 1 ? "0 !important" : "50%"};

  border-top-left-radius: ${({$isEnd}) =>
    $isEnd > 1 ? "0 !important" : "50%"};
  border-bottom-left-radius: ${({$isEnd}) =>
    $isEnd > 1 ? "0 !important" : "50%"};

  background: ${({$isRange}) => ($isRange ? "#d3d3d3 !important" : "")};
  border-radius: ${({$isRange}) => ($isRange ? "0 !important" : "")};
  transition-duration: ${({$isRange}) => ($isRange ? "0s !important" : "")};

  &:active {
    opacity: 0.7;
  }
`;

const DateExtra = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
`;
