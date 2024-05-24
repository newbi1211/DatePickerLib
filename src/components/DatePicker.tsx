import { useState } from "react";

import Calendar from "./Calendar";
import QuickSelector from "./QuickSelector";

const DatePicker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div className="b(1) bc(#d3d3d3) r(6) pt(10)">
      <div className="hbox">
        <QuickSelector />
        <Calendar
          currentDate={currentDate}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </div>
    </div>
  );
};

export default DatePicker;
