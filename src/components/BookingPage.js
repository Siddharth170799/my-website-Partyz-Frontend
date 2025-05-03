import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Mycontext from "../context/createContext";

const BookingPage = ({ date, bookingDates }) => {
  console.log(bookingDates);
  console.log(date);
  const navigate = useNavigate();
  const [displayMessage, setDisplayMessage] = useState("");

  const { hallBookedDate, sethallBookedDate } = useContext(Mycontext);

  const { selectedHallName } = useContext(Mycontext);

  const datePosting = async () => {
    try {
      if (bookingDates.includes(date)) {
        setDisplayMessage("No slots available on this day");
      } else if (date) {
        sethallBookedDate(date);
        setDisplayMessage(""); // Reset the message after successful booking
        navigate("/UserBookingDetailsPage"); // React Router navigation to the next page
      }
    } catch (error) {
      console.error("Error posting date:", error);
    }
  };

  return (
    <div style={styles.container}>
      <p>{displayMessage}</p>
      <button style={styles.button} onClick={datePosting}>
        Confirm Date
      </button>
    </div>
  );
};


const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  button: {
    backgroundColor: "blue",
    padding: "10px",
    borderRadius: "5px",
    color: "white",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
  },
};

export default BookingPage;
