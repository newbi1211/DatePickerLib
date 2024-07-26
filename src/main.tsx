import React from "react";
import ReactDOM from "react-dom/client";
import DatePicker from "./lib/components/DatePicker";



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DatePicker
      isOpen={true}
      setIsOpen={1}
      returnEndDate={1}
      returnStartDate={1}
    ></DatePicker>
  </React.StrictMode>
);
