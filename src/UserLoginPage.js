import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Mycontext from "./context/createContext";
import { ValidatePhoneNumber } from "./Validations/userDetailsValidation";
import "./styles/userLoginPage.css"; // Make sure this file exists with styles

const UserLoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const { userPhoneNumber, setUserPhoneNumber } = useContext(Mycontext);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setUserPhoneNumber(value);
    setPhoneNumberError(ValidatePhoneNumber(value));
  };

  const NavigateToDashboard = () => {
    if (phoneNumber.length === 10 && !phoneNumberError) {
      navigate("/MainDashboardPage");
    }
  };

  return (
    <div className="container">
      <h2 className="title" style={{color:"white"}}>Enter Your Phone Number to Proceed</h2>
      <div className="input-wrapper">
        <i className="fa fa-phone icon" />
        <input
        
          type="tel"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={handleInput}
          className="input-user-login"
        />
      </div>
      {phoneNumberError && <p className="error">{phoneNumberError}</p>}
      <button className="button" onClick={NavigateToDashboard}>
        Proceed
      </button>
    </div>
  );
};

export default UserLoginPage;
