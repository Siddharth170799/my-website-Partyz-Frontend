// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom"; // React Router for navigation
// import Mycontext from "./context/createContext";
// import axios from "axios";
// import { postBookingDate, PostBookingDatesDetails } from "./config/useLocalConfig";

// import { ValidateEmail,ValidateGuests,ValidateName,ValidatePhoneNumber } from "./Validations/userDetailsValidation";

// const UserDetailsForm = () => {
//   const { userPhoneNumber } = useContext(Mycontext);
//   const [name, setName] = useState("");
//   const [nameError, setNameError] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState(userPhoneNumber);
//   const [phoneNumberError, setPhoneNumberError] = useState("");
//   const [dateOfBooking, setDateOfBooking] = useState("");
//   const [typeOfEvent, setTypeOfEvent] = useState("");
//   const [numberOfGuests, setNumberOfGuests] = useState("");
//   const [guestsError, setGuestsError] = useState("");
//   const [userAddress, setUserAddress] = useState("");
//   const [email, setEmail] = useState("");
//   const [emailError, setEmailError] = useState("");

//   const [bookingDoneMessage, setBookingDoneMessage] = useState("");
//   const [globalErrorMessage, setGlobalErrorMessage] = useState("");
//   const navigate = useNavigate();

//   const { hallBookedDate } = useContext(Mycontext);
//   const { selectedHallName } = useContext(Mycontext);

//   const postUserDetails = async () => {
//     if (name !== "" && phoneNumber !== "" && email !== "" && dateOfBooking === "" && typeOfEvent !== "" && numberOfGuests !== "" && userAddress !== "") {
//       try {

//         const userDetails = await axios.post(PostBookingDatesDetails, {
//           name,
//           phoneNumber: userPhoneNumber,
//           email,
//           dateOfBooking: hallBookedDate,
//           typeOfEvent,
//           numberOfGuests,
//           userAddress,
//         });

//         await axios.post(postBookingDate, {
//           bookingDate: hallBookedDate,
//           functionHallName: selectedHallName,
//           phoneNumber,
//           request: "Pending",
//           nameOfThePersonBooked: name,
//           typeOfEvent,
//           SupervisorId: `${selectedHallName}/123`,
//           numberOfGuests,
//         });

//         setGlobalErrorMessage("");
//         setBookingDoneMessage("Request Pending");
//         setTimeout(() => {
//           navigate("/UserBookingsPage");
//         }, 3000);
//       } catch (error) {
//         setGlobalErrorMessage("Error submitting booking.");
//         setBookingDoneMessage("");
//       }
//     } else {
//       setGlobalErrorMessage("Enter all the fields.");
//       setBookingDoneMessage("");
//     }
//   };

//   const handleEmail = (text) => {
//     setEmail(text);
//     setEmailError(ValidateEmail(text));
//   };

//   const handlePhoneNumber = (number) => {
//     setPhoneNumber(number);
//     setPhoneNumberError(ValidatePhoneNumber(number));
//   };

//   const handleName = (name) => {
//     setName(name);
//     setNameError(ValidateName(name));
//   };

//   const handleGuests = (guests) => {
//     setNumberOfGuests(guests);
//     setGuestsError(ValidateGuests(guests));
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.header}>Event Booking Details</h2>

//       <input
//         type="text"
//         placeholder="Name"
//         value={name}
//         onChange={(e) => handleName(e.target.value)}
//         style={styles.input}
//       />
//       {nameError && <p style={styles.errorMessage}>{nameError}</p>}

//       <input
//         type="text"
//         placeholder="Phone Number"
//         value={phoneNumber}
//         onChange={(e) => handlePhoneNumber(e.target.value)}
//         style={styles.input}
//       />
//       {/* Phone number error message (if any) */}
//       {phoneNumberError && <p style={styles.errorMessage}>{phoneNumberError}</p>}

//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => handleEmail(e.target.value)}
//         style={styles.input}
//       />
//       {emailError && <p style={styles.errorMessage}>{emailError}</p>}

//       <input
//         type="text"
//         placeholder="Date of Booking"
//         value={hallBookedDate}
//         style={styles.input}
//         disabled
//       />

//       <select
//         value={typeOfEvent}
//         onChange={(e) => setTypeOfEvent(e.target.value)}
//         style={styles.select}
//       >
//         <option value="">Select Event Type</option>
//         <option value="Wedding">Wedding</option>
//         <option value="Reception">Reception</option>
//         <option value="Engagement">Engagement</option>
//         <option value="Birthday">Birthday Party</option>
//         <option value="Corporate">Corporate Event</option>
//       </select>

//       <input
//         type="number"
//         placeholder="Number of Guests"
//         value={numberOfGuests}
//         onChange={(e) => handleGuests(e.target.value)}
//         style={styles.input}
//       />
//       {guestsError && <p style={styles.errorMessage}>{guestsError}</p>}

//       <input
//         type="text"
//         placeholder="User Address"
//         value={userAddress}
//         onChange={(e) => setUserAddress(e.target.value)}
//         style={styles.input}
//       />

//       <button onClick={postUserDetails} style={styles.button}>
//         Submit
//       </button>

//       {globalErrorMessage && <p style={styles.globalErrorMessage}>{globalErrorMessage}</p>}
//       {bookingDoneMessage && <p style={styles.bookingDoneMessage}>{bookingDoneMessage}</p>}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: "20px",
//     maxWidth: "600px",
//     margin: "0 auto",
//     backgroundColor: "#f9f9f9",
//     borderRadius: "8px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//   },
//   header: {
//     textAlign: "center",
//     fontSize: "24px",
//     marginBottom: "20px",
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     marginBottom: "15px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//     fontSize: "16px",
//   },
//   select: {
//     width: "100%",
//     padding: "10px",
//     marginBottom: "15px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//     fontSize: "16px",
//   },
//   button: {
//     width: "100%",
//     padding: "12px",
//     backgroundColor: "#007BFF",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     fontSize: "16px",
//     cursor: "pointer",
//   },
//   errorMessage: {
//     color: "red",
//     fontSize: "14px",
//     marginBottom: "10px",
//   },
//   globalErrorMessage: {
//     color: "red",
//     textAlign: "center",
//     fontSize: "16px",
//   },
//   bookingDoneMessage: {
//     color: "green",
//     textAlign: "center",
//     fontSize: "16px",
//   },
// };

// export default UserDetailsForm;

import React, { useContext, useState } from "react";
import axios from "axios";
import Mycontext from "./context/createContext";
import {
  ValidateEmail,
  ValidateGuests,
  ValidateName,
  ValidatePhoneNumber,
} from "./Validations/userDetailsValidation";
import { useNavigate } from "react-router-dom";
import {
  PostBookingDatesDetails,
  postBookingDate,
} from "./config/useLocalConfig";

const UserDetailsForm = () => {
  const { userPhoneNumber, hallBookedDate, selectedHallName } =
    useContext(Mycontext);
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
  const [submitButton,setSubmitButton] = useState(false)
  const navigate = useNavigate();

  const postUserDetails = async () => {
    if (name !== "") {
      if (phoneNumber !== "") {
        if (email !== "") {
          if (dateOfBooking === "") {
            if (typeOfEvent !== "") {
              if (numberOfGuests !== "") {
                if (userAddress !== "") {
                  await axios.post(PostBookingDatesDetails, {
                    name,
                    phoneNumber: userPhoneNumber,
                    email,
                    dateOfBooking: hallBookedDate,
                    typeOfEvent,
                    numberOfGuests,
                    userAddress,
                  });

                  await axios.post(postBookingDate, {
                    bookingDate: hallBookedDate,
                    functionHallName: selectedHallName,
                    phoneNumber: phoneNumber,
                    request: "Pending",
                    nameOfThePersonBooked: name,
                    typeOfEvent: typeOfEvent,
                    SupervisorId: `${selectedHallName}/123`,
                    numberOfGuests: numberOfGuests,
                  });

                  setGlobalErrorMessage("");
                  setBookingDoneMessage("Request Pending");
                  setSubmitButton(true)
                  setTimeout(() => {
                    navigate("/UserBookingsPage");
                  }, 3000);
                }
              } else {
                setGlobalErrorMessage("Enter All the fields");
                setBookingDoneMessage("");
              }
            } else {
              setGlobalErrorMessage("Enter All the fields");
              setBookingDoneMessage("");
            }
          } else {
            setGlobalErrorMessage("Enter All the fields");
            setBookingDoneMessage("");
          }
        } else {
          setGlobalErrorMessage("Enter All the fields");
          setBookingDoneMessage("");
        }
      } else {
        setGlobalErrorMessage("Enter All the fields");
        setBookingDoneMessage("");
      }
    } else {
      setGlobalErrorMessage("Enter All the fields");
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
    <div
      style={{
        maxWidth: "500px",
        marginTop:"3%",
        margin: "auto",
        background: "rgb(8, 57, 147)",
        padding: "2rem",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ textAlign: "center", color: "black" }}>
        Event Booking Details Form
      </h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => handleName(e.target.value)}
        style={styles.input}
      />
      {nameError && <p style={styles.error}>{nameError}</p>}
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => handlePhoneNumber(e.target.value)}
        style={styles.input}
        readOnly
      />

      {phoneNumberError && (
        <p style={styles.errorMessage}>{phoneNumberError}</p>
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => handleEmail(e.target.value)}
        style={styles.input}
      />
      {emailError && <p style={styles.error}>{emailError}</p>}

      <input
        type="text"
        placeholder="Date of Booking"
        value={hallBookedDate}
        readOnly
        style={styles.input}
      />

      <select
        value={typeOfEvent}
        onChange={(e) => setTypeOfEvent(e.target.value)}
        style={styles.input}
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
      {guestsError && <p style={styles.error}>{guestsError}</p>}

      <input
        type="text"
        placeholder="User Address"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
        style={styles.input}
      />

      <button style={styles.button} disabled={submitButton} onClick={postUserDetails}>
        Submit
      </button>

      <p style={styles.error}>{globalErrorMessage}</p>
      <p style={{ color: "green", textAlign: "center" }}>
        {bookingDoneMessage}
      </p>
    </div>
  );
};

const styles = {
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
};

export default UserDetailsForm;
