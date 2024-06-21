import React from "react";
declare const Calendar: ({ currentDate, startDate, endDate, setStartDate, setEndDate, }: {
    currentDate: Date;
    startDate: Date | null;
    endDate: Date | null;
    setStartDate: React.Dispatch<React.SetStateAction<null | Date>>;
    setEndDate: React.Dispatch<React.SetStateAction<null | Date>>;
}) => import("react/jsx-runtime").JSX.Element;
export default Calendar;
