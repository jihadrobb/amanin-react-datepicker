import React, { useEffect, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { AnimatePresence, motion } from "framer-motion";

const CalendarModal = ({
  selectedDate,
  setSelectedDate,
  listEvent,
  closeModal,
}) => {
  const [monthFocused, setMonthFocused] = useState(selectedDate || new Date());
  const [monthData, setMonthData] = useState([]);
  const [buttonOnHover, setButtonOnHover] = useState(null);

  const onChangeMonth = (increment) => {
    let month = monthFocused.getMonth();
    let year = monthFocused.getFullYear();

    month += increment;
    if (month === 12) {
      month = 0;
      year += 1;
    } else if (month === -1) {
      month = 11;
      year -= 1;
    }
    setMonthFocused(new Date(year, month));
  };

  const getMonthData = (date) => {
    if (!date) date = monthFocused;

    let monthDate = new Date(date.getFullYear(), date.getMonth());
    let daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    let firstDay = monthDate.getDay();
    let lastDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      daysInMonth
    ).getDay();
    let monthDays = [];
    // console.log("first >>>", firstDay);
    // console.log("last >>>", lastDay);
    // console.log(
    //   `Days in ${monthDate.toLocaleDateString("en-EN", {
    //     month: "long",
    //   })} is ${daysInMonth}`
    // );

    // fill date from previous month
    let decrement = 1;
    for (let i = firstDay - 1; i >= 0; i--) {
      let tempDate = new Date(monthDate);
      tempDate.setDate(tempDate.getDate() - decrement);
      monthDays.unshift({
        date: tempDate,
        events: getEventOfDay(tempDate),
        isActualMonth: false,
      });
      decrement++;
    }

    // fill date from this month
    for (let i = 1; i <= daysInMonth; i++) {
      let tempDate = new Date(monthDate);
      tempDate.setDate(i);
      monthDays.push({
        date: tempDate,
        events: getEventOfDay(tempDate),
        isActualMonth: true,
      });
    }

    // fill date from next month
    let increment = 1;
    for (let i = lastDay + 1; i <= 6; i++) {
      let tempDate = new Date(date.getFullYear(), date.getMonth(), daysInMonth);
      tempDate.setDate(tempDate.getDate() + increment);
      monthDays.push({
        date: tempDate,
        events: getEventOfDay(tempDate),
        isActualMonth: false,
      });
      increment++;
    }
    setMonthData(monthDays);
  };

  const getEventOfDay = (date) => {
    let checkDate = new Date(date)?.getTime();
    if (!checkDate) return [];

    return listEvent.filter((ev) => ev.date?.getTime() === checkDate);
  };

  const getDisplayedMonthYear = () =>
    monthFocused.toLocaleDateString("id-ID", {
      month: "long",
      year: "numeric",
    });

  useEffect(() => {
    if (!monthFocused) return;

    getMonthData();
  }, [monthFocused]);

  return (
    <div style={styles.backdrop}>
      <AnimatePresence>
        <ClickAwayListener onClickAway={closeModal}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
            style={styles.container}
          >
            <div style={styles.headerContainer}>
              <div
                style={{
                  ...styles.prevButton,
                  backgroundColor:
                    buttonOnHover === "prev" ? "#000C66" : "#7EC8E3",
                  color: buttonOnHover === "prev" ? "#fff" : "#000",
                }}
                onClick={() => onChangeMonth(-1)}
                onMouseEnter={() => setButtonOnHover("prev")}
                onMouseLeave={() => setButtonOnHover(null)}
              >
                Prev
              </div>
              <div style={styles.monthTitle}>{getDisplayedMonthYear()}</div>
              <div
                style={{
                  ...styles.prevButton,
                  backgroundColor:
                    buttonOnHover === "next" ? "#000C66" : "#7EC8E3",
                  color: buttonOnHover === "next" ? "#fff" : "#000",
                }}
                onClick={() => onChangeMonth(1)}
                onMouseEnter={() => setButtonOnHover("next")}
                onMouseLeave={() => setButtonOnHover(null)}
              >
                Next
              </div>
            </div>
            <div style={styles.daysContainer}>
              <div style={styles.dayName}>M</div>
              <div style={styles.dayName}>S</div>
              <div style={styles.dayName}>S</div>
              <div style={styles.dayName}>R</div>
              <div style={styles.dayName}>K</div>
              <div style={styles.dayName}>J</div>
              <div style={styles.dayName}>S</div>
            </div>
            <div style={styles.daysContainer}>
              {monthData.map((day, idx) => (
                <div
                  key={idx}
                  style={{
                    ...styles.dayName,
                    cursor: "pointer",
                    position: "relative",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    backgroundColor:
                      selectedDate?.toLocaleDateString() ===
                      day.date.toLocaleDateString()
                        ? "#05445E"
                        : buttonOnHover === day.date.toLocaleDateString()
                        ? "#75E6DA"
                        : "#fff",
                    color:
                      selectedDate?.toLocaleDateString() ===
                      day.date.toLocaleDateString()
                        ? "#fff"
                        : day.isActualMonth
                        ? "#000"
                        : "#e4e4e4",
                  }}
                  onMouseEnter={() =>
                    setButtonOnHover(day.date.toLocaleDateString())
                  }
                  onMouseLeave={() => setButtonOnHover(null)}
                  onClick={() => {
                    setSelectedDate(day.date);
                    closeModal();
                  }}
                >
                  <span style={{ margin: 5, fontSize: 14 }}>
                    {day.date.getDate()}
                  </span>
                  {getEventOfDay(day.date).length > 0 ? (
                    <div style={styles.eventDot} />
                  ) : null}
                </div>
              ))}
            </div>
            {getEventOfDay(buttonOnHover).length > 0 ? (
              <div>
                <p style={styles.eventDayTitle}>
                  {new Date(buttonOnHover).toLocaleDateString("id-ID", {
                    dateStyle: "full",
                  })}
                  :
                </p>
                {getEventOfDay(buttonOnHover).map((ev, idx) => (
                  <div key={idx} style={{ fontSize: 13 }}>
                    • {ev.name}
                  </div>
                ))}
              </div>
            ) : null}
          </motion.div>
        </ClickAwayListener>
      </AnimatePresence>
    </div>
  );
};

export default CalendarModal;

const styles = {
  backdrop: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "30vh",
    // justifyContent: "center",
  },
  container: {
    backgroundColor: "lightblue",
    width: 300,
    padding: 10,
    borderRadius: 5,
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  daysContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "3px 0",
    flexWrap: "wrap",
  },
  dayName: {
    backgroundColor: "darkgrey",
    width: 300 / 7,
    aspectRatio: "1/1",
    color: "#fff",
    cursor: "default",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  prevButton: {
    padding: "5px 8px",
    borderRadius: 5,
    cursor: "pointer",
  },
  monthTitle: {
    fontWeight: "bold",
    fontSize: 16,
    cursor: "default",
  },
  eventDot: {
    position: "absolute",
    top: 5,
    left: 5,
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: "lightblue",
  },
  eventDayTitle: { margin: "3px 0", fontWeight: "bold", fontSize: 13 },
};
