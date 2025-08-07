import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CalendarGrid from "./CalendarGrid";

function App() {
  return (
    <div className="app">
      <h1 className="text-center my-4">Prayer Calendar</h1>
      <CalendarGrid />
    </div>
  );
}

export default App;
