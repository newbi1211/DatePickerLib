import { useState } from "react";

import LeftArrow from "../assets/LeftArrow";
import RightArrow from "../assets/RightArrow";
import MonthYearModal from "./MonthYearModal";

const MonthYearSelector = ({
  currentDate,
  setCurrentDate,
}: {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState(false);

  const thisMonth = new Date(currentDate.getFullYear(), currentDate.getMonth());
  const nextMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1
  );

  const onClickRightArrow = () => {
    setCurrentDate(nextMonth);
  };

  const onClickLeftArrow = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const onClickMonth = (position: boolean) => {
    setModalOpen(true);
    setModalPosition(position);
  };

  const onClcikBack = () => {
    setModalOpen(false);
  };

  return (
    <div className="hbox items-center justify-between px(10) relative">
      <div
        onClick={onClcikBack}
        className={`w(518) h(322) absolute top(-15) left(-89) z(5) bg(#ffffff.6) r(6) ${
          modalOpen ? "" : "none"
        }`}
      ></div>
      <MonthYearModal
        currentDate={
          modalPosition
            ? currentDate
            : new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
        }
        setCurrentDate={setCurrentDate}
        isLeft={modalPosition}
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
      />
      <div className="pointer hover:brightness(0.5)" onClick={onClickLeftArrow}>
        <LeftArrow />
      </div>
      <div className="user-select-none mr(30) pointer font(16) 500 line-height(16px)">
        <div
          onClick={() => onClickMonth(true)}
          className="font(16) 500 line-height(16px) active:c(#8b8b8b)"
        >
          {thisMonth.getFullYear()}년{" "}
          {thisMonth.getMonth() + 1 < 10
            ? `0` + (thisMonth.getMonth() + 1)
            : thisMonth.getMonth() + 1}
          월
        </div>
      </div>
      <div className="user-select-none ml(30)">
        <div
          onClick={() => onClickMonth(false)}
          className="pointer font(16) 500 line-height(16px) font-family('Ptetendard') active:c(#8b8b8b)"
        >
          {nextMonth.getFullYear()}년{" "}
          {nextMonth.getMonth() + 1 < 10
            ? "0" + (nextMonth.getMonth() + 1)
            : nextMonth.getMonth() + 1}
          월
        </div>
      </div>
      <div
        className="pointer hover:brightness(0.5)"
        onClick={onClickRightArrow}
      >
        <RightArrow />
      </div>
    </div>
  );
};

export default MonthYearSelector;
