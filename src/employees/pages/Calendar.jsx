import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import {
  setMockDate,
  getCurrentDate,
  enableSimulation,
  disableSimulation,
  isSimulationEnabled,
} from "../../utils/time";

const CalendarPage = () => {
  const [value, setValue] = useState(new Date());
  const [simulation, setSimulation] = useState(false);

  const handleToggle = () => {
    if (simulation) {
      disableSimulation();
    } else {
      enableSimulation();
    }
    setSimulation(!simulation);
  };

  const handleChange = (date) => {
    setValue(date);
    setMockDate(date);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📅 Calendar System</h2>

      {/* Toggle Simulation */}
      <label>
        <input
          type="checkbox"
          checked={simulation}
          onChange={handleToggle}
        />
        Enable Simulation Mode
      </label>

      {/* Calendar */}
      <Calendar
        onChange={handleChange}
        value={value}
      />

      {/* Current System Date */}
      <div style={{ marginTop: "20px" }}>
        <h3>Current System Date:</h3>
        <p>{getCurrentDate().toDateString()}</p>
      </div>

      {/* Warning */}
      {simulation && (
        <div style={{ background: "#fef3c7", padding: "10px", marginTop: "10px" }}>
          ⚠️ Simulation Mode Active (Testing Only)
        </div>
      )}
    </div>
  );
};

export default CalendarPage;