import { useState } from "react";
import "../../pretendardvariable.css";
import styled from "styled-components";

import Calendar from "./Calendar";
import QuickSelector from "./QuickSelector";
import MonthYearSelector from "./MonthYearSelector";

const DatePicker = ({
  isOpen,
  setIsOpen,
  returnStartDate,
  returnEndDate,
}: {
  isOpen: boolean;
  // setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // returnStartDate: React.Dispatch<React.SetStateAction<Date>>;
  // returnEndDate: React.Dispatch<React.SetStateAction<Date>>;
  setIsOpen: any;
  returnStartDate: any;
  returnEndDate: any;
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);

  const nextMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1
  );

  const onClickClose = () => {
    if (endDate === null) {
      returnStartDate(startDate);
      returnEndDate(startDate);
      console.log("startDate: " + startDate);
      console.log("endDate: " + startDate);
    } else {
      returnStartDate(startDate);
      returnEndDate(endDate);
      console.log("startDate: " + startDate);
      console.log("endDate: " + endDate);
    }

    setIsOpen(false);
  };

  return (
    <DatePickerWrap $isOpen={isOpen}>
      <div style={{ display: "flex", flexFlow: "row" }}>
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
          <div style={{ display: "flex", flexFlow: "row", gap: "5px" }}>
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
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          paddingRight: "10px",
        }}
      >
        <Button onClick={onClickClose}>확인</Button>
      </div>
    </DatePickerWrap>
  );
};

export default DatePicker;

interface DatePickerWrapProps {
  $isOpen: boolean;
}

const DatePickerWrap = styled.div<DatePickerWrapProps>`
  border: 1px solid #d3d3d3;
  border-radius: 6px;
  padding: 10px 0;
  width: 530px;
  font-family: "Pretendard Variable", Pretendard, -apple-system,
    BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
    "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  display: ${({$isOpen}) => ($isOpen ? "" : "none")};
  background-color: white;
`;

const Button = styled.div`
  background: #749d5f;
  border: 1px solid #749d5f;
  color: white;
  padding: 1px 15px;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  border-radius: 5px;
  user-select: none;
  -webkit-user-select: none;
  text-align: center;
`;
