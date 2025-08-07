import React, { useState } from "react";
import NamazUpdate1 from "./NamazUpdate1";
import "./CalendarGrid.css";

const CalendarGrid = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const actualFirstDay = new Date(year, month, 1).getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const firstDayOfMonth = (actualFirstDay - 5 + 7) % 7; // Make Friday the first day

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const days = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dateObj = new Date(year, month, i);
    const weekday = dateObj.toLocaleDateString("en-US", { weekday: "short" });

    days.push(
      <div key={`day-${i}`} className="calendar-day">
        <div className="date">{i}</div>
        {/* <div className="weekday">{weekday}</div> */}
        <NamazUpdate1 date={dateObj} />
      </div>
    );
  }

  const monthLabel = currentDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="calendar container">
      <div className="calendar-header d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-primary" onClick={prevMonth}>
          &lt; Prev
        </button>
        <h2 className="mb-0">{monthLabel}</h2>
        <button className="btn btn-primary" onClick={nextMonth}>
          Next &gt;
        </button>
      </div>

      <div className="calendar-weekdays d-grid">
        {["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"].map((day) => (
          <div key={day} className="calendar-weekday text-center fw-bold">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid d-grid">{days}</div>
    </div>
  );
};

export default CalendarGrid;
