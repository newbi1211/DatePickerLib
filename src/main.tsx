import "@adorable.css";

import React from "react";
import ReactDOM from "react-dom/client";

import DatePicker from "./components/DatePicker";
import Test from "./Test";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <DatePicker isOpened={true} /> */}
    <Test />
  </React.StrictMode>
);
