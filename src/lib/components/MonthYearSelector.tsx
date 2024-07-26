import { useState } from "react";
import styled from "styled-components";

import LeftArrow from "../../assets/LeftArrow";
import RightArrow from "../../assets/RightArrow";
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

  const onClickBack = () => {
    setModalOpen(false);
  };

  return (
    <Wrap>
      <ModalBackground
        $isOpen={modalOpen}
        onClick={onClickBack}
      ></ModalBackground>
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
      <LeftRightArrow onClick={onClickLeftArrow}>
        <LeftArrow />
      </LeftRightArrow>
      <div
        style={{
          marginRight: "30px",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      >
        <Monthviewer onClick={() => onClickMonth(true)}>
          {thisMonth.getFullYear()}년{" "}
          {thisMonth.getMonth() + 1 < 10
            ? `0` + (thisMonth.getMonth() + 1)
            : thisMonth.getMonth() + 1}
          월
        </Monthviewer>
      </div>
      <div
        style={{
          marginLeft: "30px",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      >
        <Monthviewer onClick={() => onClickMonth(false)}>
          {nextMonth.getFullYear()}년{" "}
          {nextMonth.getMonth() + 1 < 10
            ? "0" + (nextMonth.getMonth() + 1)
            : nextMonth.getMonth() + 1}
          월
        </Monthviewer>
      </div>
      <LeftRightArrow onClick={onClickRightArrow}>
        <RightArrow />
      </LeftRightArrow>
    </Wrap>
  );
};

export default MonthYearSelector;

const Wrap = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  position: relative;
  font-family: "Pretendard Variable", Pretendard, -apple-system,
    BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
    "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
`;

const LeftRightArrow = styled.div`
  cursor: pointer;
  &:hover {
    filter: brightness(0.5);
  }
`;

interface ModalBackgroundProps {
    $isOpen: boolean;
}

const ModalBackground = styled.div<ModalBackgroundProps>`
  width: 528px;
  height: 315px;
  position: absolute;
  top: -8px;
  left: -100px;
  z-index: 10;
  background: #ffffff;
  opacity: 0.5;
  border-radius: 6px;
  display: ${({$isOpen}) => ($isOpen ? "" : "none")};
`;

const Monthviewer = styled.div`
  font-size: 16px;
  font-family: "Pretendard Variable", Pretendard, -apple-system,
    BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
    "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  font-weight: 500;
  line-height: 16px;
  cursor: pointer;
  &:active {
    color: #8b8b8b;
  }
`;
