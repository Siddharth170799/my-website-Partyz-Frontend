import React, { useContext, useEffect, useState } from "react";
import Mycontext from "./context/createContext";
import axios from "axios";

import Calendar from "react-calendar"; // Import the react-calendar component
import BookingPage from "./components/BookingPage";

const DatePicker = ({ posting }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingDates, setBookingDates] = useState([]); // Array for filtered data
  const [bookingDates2, setBookingDates2] = useState([]); // Array for date-only values

  const { selectedHallName } = useContext(Mycontext);

  const handleDayPress = (date) => {
    setSelectedDate(date);
  };

  const bookingDatesData = async () => {
    const details = await axios.get("http://localhost:4000/api/getBookingDateDetails");

    const filteredDetails = details.data.filter((item) => {
      return item?.FunctionHallName === selectedHallName;
    });

    const approvedPendingDates = filteredDetails.filter((item) => {
      return item.Request === "Approved" || item.Request === "Pending";
    });

    setBookingDates(approvedPendingDates);

    const dateList = approvedPendingDates.map((item) => item?.Date);
    setBookingDates2(dateList);
  };

  useEffect(() => {
    bookingDatesData();
  }, [selectedDate, posting]);

  const markedDates = bookingDates
    .map((item) => item.Date)
    .reduce((acc, date) => {
      acc[date] = { marked: true, dotColor: "red", disabled: true };
      return acc;
    }, {});

  return (
    <div style={styles.container}>
      <Calendar
        onClickDay={handleDayPress}
        value={selectedDate}
        tileClassName={({ date }) => {
          // Highlight selected dates and marked dates
          const dateString = date.toISOString().split("T")[0];
          return markedDates[dateString] ? "marked-date" : "";
        }}
      />
      {selectedDate ? (
        <p style={styles.selectedDate}>Selected Date: {selectedDate.toDateString()}</p>
      ) : (
        <p style={styles.selectedDate}>Select a Date</p>
      )}

      <BookingPage date={selectedDate} bookingDates={bookingDates2} />
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "orange",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  selectedDate: {
    marginTop: "20px",
    fontSize: "16px",
  },
};

export default DatePicker;
