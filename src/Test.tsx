import { useState } from "react";
import DatePicker from "./components/DatePicker";

const Test = () => {
  const [test, setTest] = useState(false);
  const [sd, ssd] = useState<Date | null>(null);
  const [ed, sed] = useState<Date | null>(null);

  const changeTest = () => {
    if (test == false) setTest(true);
    else setTest(false);
  };

  return (
    <div>
      <button onClick={changeTest}>asdf</button>
      <div>{`${sd}${ed}`}</div>
      <DatePicker
        isOpen={test}
        setIsOpen={setTest}
        returnStareDate={ssd}
        returnEndDate={sed}
      />
    </div>
  );
};

export default Test;
