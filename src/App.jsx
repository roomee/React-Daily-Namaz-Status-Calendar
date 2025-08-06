import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NamazUpdate1 from "./NamazUpdate1";
import CalendarTable from "./CalendarTable"; // Assuming CalendarTable.jsx

function App() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth(); // 0-indexed month

  return (
    <>
      <div>
        <h1>
          Calendar for{" "}
          {new Date(currentYear, currentMonth).toLocaleString("en-US", {
            month: "long",
          })}{" "}
          {currentYear}
        </h1>
        <CalendarTable year={currentYear} month={currentMonth} />
      </div>
      <hr />
    </>
  );
}

export default App;
