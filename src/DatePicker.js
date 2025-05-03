import React, { useContext, useEffect, useState } from "react";
import Mycontext from "./context/createContext";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import BookingPage from "./components/BookingPage";
import { GetBookingDateDetails } from "./config/useLocalConfig";
import "./styles/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const DatePicker = ({ posting }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingDates, setBookingDates] = useState([]);
  const [bookingDates2, setBookingDates2] = useState([]);
  const { selectedHallName } = useContext(Mycontext);

  const handleDayPress = (date) => {
    const formattedDate = date.toLocaleDateString("en-CA");
    setSelectedDate(formattedDate);
  };

  const bookingDatesData = async () => {
    const details = await axios.get(GetBookingDateDetails);

    const filteredDetails = details.data.filter(
      (item) => item?.FunctionHallName === selectedHallName
    );

    const approvedPendingDates = filteredDetails.filter(
      (item) => item.Request === "Approved" || item.Request === "Pending"
    );

    const dateList = approvedPendingDates.map((item) => {
      const localDate = new Date(item?.Date);
      const correctedDate = new Date(
        localDate.getTime() + localDate.getTimezoneOffset() * 60000
      );
      return correctedDate.toLocaleDateString("en-CA"); // → 'YYYY-MM-DD'
    });

    setBookingDates2(dateList);
  };

  useEffect(() => {
    bookingDatesData();
  }, [selectedDate, posting]);

  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: "3%" }}>Pick a Date</h2>
      <div className="container">
        <Calendar
          onClickDay={handleDayPress}
          value={selectedDate}
          tileContent={({ date }) => {
            const localDateStr = date.toLocaleDateString("en-CA"); // 'YYYY-MM-DD'
            return bookingDates2.includes(localDateStr) ? (
              <div className="dot" />
            ) : null;
          }}
        />

        {selectedDate ? (
          <p style={styles.selectedDate}>Selected Date: {selectedDate}</p>
        ) : (
          <p style={styles.selectedDate}>Select a Date</p>
        )}

        <BookingPage date={selectedDate} bookingDates={bookingDates2} />
      </div>
    </>
  );
};

const styles = {
  selectedDate: {
    marginTop: "20px",
    fontSize: "16px",
  },
};

export default DatePicker;
