import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import Mycontext from "./context/createContext";
import axios from "axios";

import { ValidateEmail,ValidateGuests,ValidateName,ValidatePhoneNumber } from "./Validations/userDetailsValidation";

const UserDetailsForm = () => {
  const { userPhoneNumber } = useContext(Mycontext);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(userPhoneNumber);
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [dateOfBooking, setDateOfBooking] = useState("");
  const [typeOfEvent, setTypeOfEvent] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [guestsError, setGuestsError] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [bookingDoneMessage, setBookingDoneMessage] = useState("");
  const [globalErrorMessage, setGlobalErrorMessage] = useState("");
  const navigate = useNavigate();

  const { hallBookedDate } = useContext(Mycontext);
  const { selectedHallName } = useContext(Mycontext);

  const postUserDetails = async () => {
    if (name !== "" && phoneNumber !== "" && email !== "" && dateOfBooking === "" && typeOfEvent !== "" && numberOfGuests !== "" && userAddress !== "") {
      try {
        
        const userDetails = await axios.post("http://localhost:4000/api/postUserDetails", {
          name,
          phoneNumber: userPhoneNumber,
          email,
          dateOfBooking: hallBookedDate,
          typeOfEvent,
          numberOfGuests,
          userAddress,
        });

        await axios.post("http://localhost:4000/api/postBookingDate", {
          bookingDate: hallBookedDate,
          functionHallName: selectedHallName,
          phoneNumber,
          request: "Pending",
          nameOfThePersonBooked: name,
          typeOfEvent,
          SupervisorId: `${selectedHallName}/123`,
          numberOfGuests,
        });

        setGlobalErrorMessage("");
        setBookingDoneMessage("Request Pending");
        setTimeout(() => {
          navigate("/UserBookingsPage");
        }, 3000);
      } catch (error) {
        setGlobalErrorMessage("Error submitting booking.");
        setBookingDoneMessage("");
      }
    } else {
      setGlobalErrorMessage("Enter all the fields.");
      setBookingDoneMessage("");
    }
  };

  const handleEmail = (text) => {
    setEmail(text);
    setEmailError(ValidateEmail(text));
  };

  const handlePhoneNumber = (number) => {
    setPhoneNumber(number);
    setPhoneNumberError(ValidatePhoneNumber(number));
  };

  const handleName = (name) => {
    setName(name);
    setNameError(ValidateName(name));
  };

  const handleGuests = (guests) => {
    setNumberOfGuests(guests);
    setGuestsError(ValidateGuests(guests));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Event Booking Details</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => handleName(e.target.value)}
        style={styles.input}
      />
      {nameError && <p style={styles.errorMessage}>{nameError}</p>}

      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => handlePhoneNumber(e.target.value)}
        style={styles.input}
      />
      {/* Phone number error message (if any) */}
      {phoneNumberError && <p style={styles.errorMessage}>{phoneNumberError}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => handleEmail(e.target.value)}
        style={styles.input}
      />
      {emailError && <p style={styles.errorMessage}>{emailError}</p>}

      <input
        type="text"
        placeholder="Date of Booking"
        value={hallBookedDate}
        style={styles.input}
        disabled
      />

      <select
        value={typeOfEvent}
        onChange={(e) => setTypeOfEvent(e.target.value)}
        style={styles.select}
      >
        <option value="">Select Event Type</option>
        <option value="Wedding">Wedding</option>
        <option value="Reception">Reception</option>
        <option value="Engagement">Engagement</option>
        <option value="Birthday">Birthday Party</option>
        <option value="Corporate">Corporate Event</option>
      </select>

      <input
        type="number"
        placeholder="Number of Guests"
        value={numberOfGuests}
        onChange={(e) => handleGuests(e.target.value)}
        style={styles.input}
      />
      {guestsError && <p style={styles.errorMessage}>{guestsError}</p>}

      <input
        type="text"
        placeholder="User Address"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
        style={styles.input}
      />

      <button onClick={postUserDetails} style={styles.button}>
        Submit
      </button>

      {globalErrorMessage && <p style={styles.globalErrorMessage}>{globalErrorMessage}</p>}
      {bookingDoneMessage && <p style={styles.bookingDoneMessage}>{bookingDoneMessage}</p>}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  errorMessage: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
  globalErrorMessage: {
    color: "red",
    textAlign: "center",
    fontSize: "16px",
  },
  bookingDoneMessage: {
    color: "green",
    textAlign: "center",
    fontSize: "16px",
  },
};

export default UserDetailsForm;
