import React, { useState } from "react";
import "../pretendardvariable.css";

import Calendar from "./Calendar";
import QuickSelector from "./QuickSelector";
import MonthYearSelector from "./MonthYearSelector";

const DatePicker = ({
  isOpen,
  setIsOpen,
  returnStareDate,
  returnEndDate,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  returnStareDate: React.Dispatch<React.SetStateAction<Date | null>>;
  returnEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const nextMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1
  );

  const onClickClose = () => {
    setIsOpen(false);
    returnStareDate(startDate);
    returnEndDate(endDate);
    console.log("startDate: " + startDate);
    console.log("endDate: " + endDate);
  };

  return (
    <div
      className={`b(1) bc(#d3d3d3) r(6) py(10) w(520)  ${isOpen ? "" : "none"}`}
    >
      <div className="hbox">
        <QuickSelector
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setCurrentDate={setCurrentDate}
        />
        <div>
          <MonthYearSelector
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
          <div className="hbox gap(5)">
            <Calendar
              currentDate={currentDate}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
            <Calendar
              currentDate={nextMonthDate}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </div>
        </div>
      </div>
      <div className="display(flex) flex-direction(row-reverse) pr(10)">
        <div
          onClick={onClickClose}
          className="bg(#749d5f) b(#749d5f) c(white) px(15) py(1) font(12) 400 pointer r(5) w(56) user-select-none active:brightness(0.9)"
        >
          확인
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
