import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Mycontext from "./context/createContext";

const UserBookingsPage = () => {
  const [myBookings, setMyBookings] = useState([]);
  const { userPhoneNumber } = useContext(Mycontext);

  const bookingsList = async () => {
    await axios.post("http://localhost:4000/api/userPhoneNumber", {
      userPhoneNumber,
    });
  };

  const post = async () => {
    try {
      const details = await axios.get(
        "http://localhost:4000/api/getAllUserBookings"
      );
      const filteredBookings = details?.data?.filter(
        (item) => item.PhoneNumber === userPhoneNumber
      );
      setMyBookings(filteredBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    bookingsList();
    post();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Bookings</h2>
      {myBookings.length > 0 ? (
        myBookings.map((booking, index) => (
          <div key={index} style={styles.bookingCard}>
            <p>Date: {booking.Date}</p>
            <p>Function Hall: {booking.FunctionHallName}</p>
            <p>Name: {booking.NameofTheUserBooked}</p>
            <p>Type of Event: {booking.TypeOfEvent}</p>
            <p
              style={
                booking.Request === "Rejected"
                  ? styles.rejectedText
                  : booking.Request === "Approved"
                  ? styles.approvedText
                  : styles.pendingText
              }
            >
              {booking.Request === "Rejected"
                ? "Booking Request Rejected"
                : booking.Request === "Approved"
                ? "Booking Request Approved"
                : "Booking Request Pending"}
            </p>
          </div>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default UserBookingsPage;

const styles = {
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bookingCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
  },
  rejectedText: {
    color: "red",
    fontWeight: "bold",
  },
  approvedText: {
    color: "green",
    fontWeight: "bold",
  },
  pendingText: {
    color: "orange",
    fontWeight: "bold",
  },
};
