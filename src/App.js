
import PartyzLandingPage from "./Partyz_Landing_Page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLoginPage from "./UserLoginPage";
import Mycontext from "./context/createContext";
import { useState } from "react";
import Dashboard from "./DashBoard";
import DatePicker from "./DatePicker";
import UserDetailsForm from "./UserBookingDetailsPage";
import UserBookingsPage from "./UserBookingsPage";
import SupervisorDashboardPage from "./SupervisorDashBoard";

function App() {
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [selectedHallName, setselectedHallName] = useState("");
  const [hallBookedDate, sethallBookedDate] = useState("");

  return (
    <Mycontext.Provider
      value={{
        userPhoneNumber,
        setUserPhoneNumber,
        selectedHallName,
        setselectedHallName,
        hallBookedDate,
        sethallBookedDate,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PartyzLandingPage />} />
          <Route path="/UserLoginPage" element={<UserLoginPage />} />
          {/* <Route path="/SupervisorDashboardPage" element={<SupervisorDashboardPage />} /> */}
          <Route path="/MainDashboardPage" element={<Dashboard />} />
          <Route path="/BookingDatePicker" element={<DatePicker />} />
          <Route path="/UserBookingDetailsPage" element={<UserDetailsForm />} />
          <Route path="/UserBookingsPage" element={<UserBookingsPage />} />
          <Route
            path="/SupervisorDashboardPage"
            element={<SupervisorDashboardPage />}
          />
        </Routes>
      </BrowserRouter>
    </Mycontext.Provider>
  );
}

export default App;
