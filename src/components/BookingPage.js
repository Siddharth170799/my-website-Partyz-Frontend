import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import Mycontext from "../context/createContext";
import axios from "axios"; // Ensure axios is installed

const BookingPage = ({ date, bookingDates }) => {
  const navigate = useNavigate();
  const [displayMessage, setDisplayMessage] = useState("");

  const { hallBookedDate, sethallBookedDate } = useContext(Mycontext);

  const { selectedHallName } = useContext(Mycontext);

  const datePosting = async () => {
    try {
      if (bookingDates.includes(date)) {
        setDisplayMessage("No slots available on this day");
      } else if (date) {
        // You can uncomment and adjust the URL as needed for the POST request
        // await axios.post("http://localhost:4000/api/postBookingDate", {
        //   bookingDate: date,
        // });

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

// Inline styles converted from StyleSheet
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "orange",
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
