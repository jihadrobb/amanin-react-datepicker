import React, { useState } from "react";
import CalendarModal from "./Components/CalendarModal";

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const [listDummyEvents] = useState([
    {
      name: "Test",
      date: new Date(2022, 11, 10),
    },
    {
      name: "Amanin test",
      date: new Date(2022, 11, 12),
    },
    {
      name: "30 Nov",
      date: new Date(2022, 10, 30),
    },
    {
      name: "Last day of 2022",
      date: new Date(2022, 11, 31),
    },
    {
      name: "Prepare for 2023",
      date: new Date(2022, 11, 31),
    },
  ]);

  const getDisplayedDate = () =>
    selectedDate
      ? selectedDate.toLocaleDateString("id-ID", {
          dateStyle: "full",
        })
      : "Select Date";

  return (
    <div style={styles.container}>
      <p style={styles.title}>
        Simple React Datepicker by Muhammad Jihad Robbani
      </p>
      <div style={styles.buttonContainer}>
        <div
          style={{
            ...styles.dateDisplay,
            color: selectedDate ? "#000" : "#777",
          }}
          onClick={() => setShowCalendarModal(true)}
        >
          {getDisplayedDate()}
        </div>
        <div style={styles.clearButton} onClick={() => setSelectedDate(null)}>
          Clear
        </div>
      </div>
      {showCalendarModal ? (
        <CalendarModal
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          listEvent={listDummyEvents}
          closeModal={() => setShowCalendarModal(false)}
        />
      ) : null}
    </div>
  );
};

export default App;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100vw",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
  },
  title: { fontSize: 20, fontWeight: "bold" },
  buttonContainer: { display: "flex", alignItems: "center" },
  dateDisplay: {
    backgroundColor: "#fff",
    minWidth: 220,
    height: 35,
    borderRadius: 5,
    border: "1px solid #000",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  clearButton: {
    backgroundColor: "#fff",
    height: 35,
    width: 50,
    borderRadius: 5,
    border: "1px solid #000",
    cursor: "pointer",
    marginLeft: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
