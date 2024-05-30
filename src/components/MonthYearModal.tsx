import { useEffect, useState } from "react";
import BottomArrow from "../assets/BottomArrow";
import TopArrow from "../assets/TopArrow";

const MonthYearModal = ({
  currentDate,
  setCurrentDate,
  isLeft,
  isOpen,
  setIsOpen,
}: {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  isLeft: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const toDay = new Date();
  const [tempDate, setTempDate] = useState<Date>(currentDate);
  const [openYear, setOpenYear] = useState(false);

  const onClickUpArrow = () => {
    if (openYear) {
      setTempDate(
        new Date(
          tempDate.getFullYear() + 10,
          tempDate.getMonth(),
          tempDate.getDate()
        )
      );
    } else {
      if (isLeft) {
        setTempDate(new Date(tempDate.getFullYear() + 1, tempDate.getMonth()));
      } else {
        setTempDate(
          new Date(tempDate.getFullYear() + 1, tempDate.getMonth() - 1)
        );
      }
    }
  };

  const onClickDownArrow = () => {
    if (openYear) {
      setTempDate(
        new Date(
          tempDate.getFullYear() - 10,
          tempDate.getMonth(),
          tempDate.getDate()
        )
      );
    } else {
      if (isLeft) {
        setTempDate(new Date(tempDate.getFullYear() - 1, tempDate.getMonth()));
      } else {
        setTempDate(
          new Date(tempDate.getFullYear() - 1, tempDate.getMonth() - 1)
        );
      }
    }
  };

  const onClickMonth = (index: number) => {
    if (isLeft) {
      setCurrentDate(new Date(tempDate.getFullYear(), index - 1));
    } else {
      setCurrentDate(new Date(tempDate.getFullYear(), index - 2));
    }
    setIsOpen(false);
  };

  const onClickYear = (index: number) => {
    tempDate.setFullYear(index);
    setOpenYear(false);
  };

  useEffect(() => {
    setOpenYear(false);
  }, [isOpen]);

  const monthRender = () => {
    const render = [];
    for (let i = 1; i <= 16; i++) {
      if (i <= 12) {
        if (
          currentDate.getFullYear() === tempDate.getFullYear() &&
          i === currentDate.getMonth() + 1
        ) {
          render.push(
            <div
              key={i}
              className="user-select-none pack font(11) w(30) h(30) 600 c(black) pointer border-box b(0.25) bc(#749d5f) r(50%) hover:bg(#749d5f)! hover:c(#ffffff)!  pt(1)"
              onClick={() => onClickMonth(i)}
            >
              {i}
            </div>
          );
        } else {
          render.push(
            <div
              key={i}
              className="user-select-none pack font(11) w(30) h(30) 600 c(black) pointer r(50%) hover:bg(#749d5f)! hover:c(#ffffff)! pt(1)"
              onClick={() => onClickMonth(i)}
            >
              {i}
            </div>
          );
        }
      } else {
        render.push(
          <div
            key={i}
            className="user-select-none pack font(11) w(30) h(30) 600 c(#727272)"
          >
            {i - 12}
          </div>
        );
      }
    }

    return render;
  };

  const yearRender = () => {
    const render = [];
    const startYear = tempDate.getFullYear() - (tempDate.getFullYear() % 10);
    for (let i = 0; i < 16; i++) {
      if (i < 10) {
        render.push(
          <div
            key={i}
            onClick={() =>
              onClickYear(
                tempDate.getFullYear() - (tempDate.getFullYear() % 10) + i
              )
            }
            className={`user-select-none font(11) pointer 600 line-height(11px) w(35) h(35) pack hover:bg(#749d5f)! hover:c(#ffffff)! r(50%)`}
          >
            {tempDate.getFullYear() - (tempDate.getFullYear() % 10) + i}
          </div>
        );
      } else {
        render.push(
          <div
            key={i}
            className="user-select-none font(11) 600 line-height(11px) c(#8a8a8a) w(35) h(35) pack"
          >
            {startYear + i}
          </div>
        );
      }
    }

    return render;
  };

  const modalRender = () => {
    if (!openYear) {
      return (
        <div className="p(0) m(0) h(100%)">
          <div className="hbox w(200) pack mb(5)">
            <div
              onClick={() => setOpenYear(true)}
              className="mr(5) user-select-none pointer"
            >
              {tempDate.getFullYear()}년
            </div>
            <div
              className="mr(3) hover:c(#5c5c5c) pointer h(8) w(8) pack"
              onClick={onClickDownArrow}
            >
              <BottomArrow />
            </div>
            <div
              className="hover:c(#5c5c5c) pointer h(8) w(8) pack"
              onClick={onClickUpArrow}
            >
              <TopArrow />
            </div>
          </div>
          <div className="grid(4) h(100%-30px) justify-items-center">
            {monthRender()}
          </div>
        </div>
      );
    } else {
      return (
        <div className="h(100%)">
          <div className="hbox w(200) pack mb(5)">
            <div className="mr(5) user-select-none pointer">
              {tempDate.getFullYear() - (tempDate.getFullYear() % 10)} ~{" "}
              {tempDate.getFullYear() - (tempDate.getFullYear() % 10) + 9}
            </div>
            <div
              className="mr(3) hover:c(#5c5c5c) pointer h(8) w(8) pack"
              onClick={onClickDownArrow}
            >
              <BottomArrow />
            </div>
            <div
              className="hover:c(#5c5c5c) pointer h(8) w(8) pack"
              onClick={onClickUpArrow}
            >
              <TopArrow />
            </div>
          </div>
          <div className="grid(4) h(100%-30px) justify-items-center">
            {yearRender()}
          </div>
        </div>
      );
    }
  };

  return (
    <div
      className={`b(1) bc(#8a8c8e) r(8) bg(white) absolute z(10) p(5) h(280) top(-5) ${
        isLeft ? "left(0)" : "right(0)"
      } ${isOpen ? "" : "none"}`}
    >
      {modalRender()}
    </div>
  );
};

export default MonthYearModal;
