import { useEffect, useState } from "react";
import BottomArrow from "../../assets/BottomArrow";
import TopArrow from "../../assets/TopArrow";
import styled from "styled-components";

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
        render.push(
          <Month
            $isThis={
              currentDate.getFullYear() === tempDate.getFullYear() &&
                i === currentDate.getMonth() + 1
            }
            key={i}
            onClick={() => onClickMonth(i)}
          >
            {i}
          </Month>
        );
      } else {
        render.push(<MonthExtra key={i}>{i - 12}</MonthExtra>);
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
          <Year
            key={i}
            onClick={() =>
              onClickYear(
                tempDate.getFullYear() - (tempDate.getFullYear() % 10) + i
              )
            }
          >
            {tempDate.getFullYear() - (tempDate.getFullYear() % 10) + i}
          </Year>
        );
      } else {
        render.push(<YearExtra key={i}>{startYear + i}</YearExtra>);
      }
    }

    return render;
  };

  const modalRender = () => {
    if (!openYear) {
      return (
        <div style={{ height: "100%" }}>
          <MonthHeader>
            <div
              onClick={() => setOpenYear(true)}
              style={{
                marginRight: "5px",
                userSelect: "none",
                WebkitUserSelect: "none",
                cursor: "pointer",
              }}
            >
              {tempDate.getFullYear()}년
            </div>
            <BottomArrowButton onClick={onClickDownArrow}>
              <BottomArrow />
            </BottomArrowButton>
            <TopArrowButton onClick={onClickUpArrow}>
              <TopArrow />
            </TopArrowButton>
          </MonthHeader>
          <MonthReader>{monthRender()}</MonthReader>
        </div>
      );
    } else {
      return (
        <div style={{ height: "100%" }}>
          <div
            style={{
              width: "200px",
              marginBottom: "5px",
              display: "flex",
              alignItems: "center",
              flexFlow: "row",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                marginRight: "5px",
                userSelect: "none",
                WebkitUserSelect: "none",
                cursor: "pointer",
              }}
            >
              {tempDate.getFullYear() - (tempDate.getFullYear() % 10)} ~{" "}
              {tempDate.getFullYear() - (tempDate.getFullYear() % 10) + 9}
            </div>
            <BottomArrowButton onClick={onClickDownArrow}>
              <BottomArrow />
            </BottomArrowButton>
            <TopArrowButton onClick={onClickUpArrow}>
              <TopArrow />
            </TopArrowButton>
          </div>
          <YearRender>{yearRender()}</YearRender>
        </div>
      );
    }
  };

  return (
    <MonthYearWrap $isLeft={isLeft} $isOpen={isOpen}>
      {modalRender()}
    </MonthYearWrap>
  );
};

export default MonthYearModal;

interface OpenAndPosition {
  $isLeft: boolean;
  $isOpen: boolean;
}

const MonthYearWrap = styled.div<OpenAndPosition>`
  border: 1px solid #8a8c8e;
  border-radius: 8px;
  background: white;
  position: absolute;
  z-index: 10;
  padding: 5px;
  height: 280px;
  width: 200px;
  top: -5px;
  left: ${({$isLeft}) => ($isLeft ? 0 : "unset")};
  right: ${({$isLeft}) => (!$isLeft ? 0 : "unset")};
  display: ${({$isOpen}) => ($isOpen ? "" : "none")};
`;

const MonthReader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  height: calc(100% - 30px);
  justify-items: center;
`;

const MonthHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row;
  width: 200px;
  margin-bottom: 5px;
`;

const TopArrowButton = styled.div`
  width: 8px;
  height: 8px;
  cursor: pointer;
  height: 8px;
  width: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: #5c5c5c;
  }
`;

// className="topBottomArrow pointer pack"
//               style={{ marginRight: "3px" }}

const BottomArrowButton = styled.div`
  cursor: pointer;
  height: 8px;
  width: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 3px;
  &:hover {
    color: #5c5c5c;
  }
`;

const YearRender = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  height: calc(100% - 30px);
  justify-items: center;
`;

const Year = styled.div`
  user-select: none;
  -webkit-user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  cursor: pointer;
  font-weight: 600;
  line-height: 11px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  &:hover {
    background: #749d5f !important;
    color: #ffffff !important;
  }
`;

const YearExtra = styled.div`
  user-select: none;
  -webkit-user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  line-height: 11px;
  color: #8a8c8e;
  width: 35px;
  height: 35px;
`;

interface MonthProps {
  $isThis: boolean;
}

const Month = styled.div<MonthProps>`
  user-select: none;
  -webkit-user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  width: 30px;
  height: 30px;
  color: #000;
  cursor: pointer;
  border-radius: 50%;
  font-weight: 600;
  box-sizing: ${({$isThis}) => ($isThis ? "border-box" : "")};
  border: ${({$isThis}) => ($isThis ? "0.25px solid #749d5f" : "")};
  &:hover {
    background: #749d5f !important;
    color: #ffffff !important;
  }
`;

const MonthExtra = styled.div`
  user-select: none;
  -webkit-user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  width: 30px;
  height: 30px;
  font-weight: 600;
  color: #8a8c8e;
`;
