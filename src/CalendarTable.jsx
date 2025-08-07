import React from "react";
import NamazUpdate1 from "./NamazUpdate1";
import "./CalendarTable.css";

const CalendarTable = ({ year, month }) => {
  // Get the first day of the month (0-indexed: 0 for January)
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday, etc.

  // Get the number of days in the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  // Add empty cells for the days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<td key={`empty-${i}`}></td>);
  }

  // Add the actual days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(
      <td key={i}>
        {i}
        <br /> {/* Line break for each date */}
        {new Date(year, month, i).toLocaleString("en-US", { weekday: "short" })}
        <NamazUpdate1 />
      </td>
    );
  }

  const rows = [];
  let cells = [];
  days.forEach((day, index) => {
    cells.push(day);
    if ((index + firstDayOfMonth + 1) % 7 === 0 || index === days.length - 1) {
      rows.push(<tr key={`row-${rows.length}`}>{cells}</tr>);
      cells = [];
    }
  });

  return (
    <table width="100% ">
      <thead>
        <tr>
          <th>Sun</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default CalendarTable;
