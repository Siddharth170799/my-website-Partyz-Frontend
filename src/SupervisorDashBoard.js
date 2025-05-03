import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  SupervisorIdPostingBackend,
  getFunctionHallsBySupervisorUserId,
  getUpdateBookingRequestUrl

} from "./config/useLocalConfig";
import "./styles/SupervisorDashBoard.css"; // Import your CSS file

const SupervisorDashboardPage = () => {
  const [userId, setUserId] = useState("");
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageButton, setMessageButton] = useState("");

  const userIdInput = (e) => {
    setUserId(e.target.value);
  };

  const userIdPostingBackend = async () => {
    await axios.post(SupervisorIdPostingBackend, {
      supervisorId: userId,
    });

    const details = await axios.get(getFunctionHallsBySupervisorUserId);
    setBookings(details?.data?.data);
  };

  const retrieveBookingrequests = async () => {
    const details = await axios.get(getFunctionHallsBySupervisorUserId);
    setBookings(details?.data?.data);
  };

  const handleApprove = async (itemId) => {
    const url = getUpdateBookingRequestUrl(itemId);
    await axios.put(url, { message: "Approved" });

    setMessage("Approved");
    setMessageButton(true);
  };

  const handleReject = async (itemId) => {
    const url = getUpdateBookingRequestUrl(itemId);
    await axios.put(url, { message: "Rejected" });

    setMessage("Rejected");
    setMessageButton(false);
  };

  useEffect(() => {
    if (message != null) {
      retrieveBookingrequests();
    }
  }, [message]);

  useEffect(() => {
    if (message === "Approved" || message === "Rejected") {
      setMessage("");
    }
  }, [messageButton]);

  return (

<div className="container">
  <h2 className="heading">My Bookings Page</h2>
  <input
    type="text"
    onChange={userIdInput}
    placeholder="Enter Supervisor ID"
    className="input"
  />
  <button onClick={userIdPostingBackend} className="button">
    Submit
  </button>

  {bookings?.map((item, index) => (
    <div
      key={index}
      className={`bookingContainer ${
        item.Request === "Approved"
          ? "approved"
          : item.Request === "Rejected"
          ? "rejected"
          : ""
      }`}
    >
      <h3 className="functionHallName">{item?.FunctionHallName}</h3>
      {item.Request !== "Pending" && (
        <span
          className={`statusMessage ${
            item.Request === "Approved"
              ? "approved"
              : item.Request === "Rejected"
              ? "rejected"
              : ""
          }`}
        >
          {item.Request}
        </span>
      )}

      <p className="details">Date: {item?.Date}</p>
      <p className="details">Booked By: {item?.NameofTheUserBooked}</p>
      <p className="details">Phone: {item?.PhoneNumber}</p>
      <p className="details">Request Status: {item?.Request}</p>
      <p className="details">Number of Guests: {item?.NumberOfGuests}</p>
      <p className="details">Event Type: {item?.TypeOfEvent}</p>
      <div className="buttonContainer">
        {!message && item.Request === "Pending" && (
          <>
            <button
              onClick={() => handleApprove(item._id)}
              className="actionButton approveButton"
            >
              Approve
            </button>
            <button
              onClick={() => handleReject(item._id)}
              className="actionButton rejectButton"
            >
              Reject
            </button>
          </>
        )}
      </div>
    </div>
  ))}
</div>



    // <div className="container">
    //   <h2 className="heading">My Bookings Page</h2>
    //   <input
    //     type="text"
    //     onChange={userIdInput}
    //     placeholder="Enter Supervisor ID"
    //     className="input"
    //   />
    //   <button onClick={userIdPostingBackend} className="button">
    //     Submit
    //   </button>

    //   {bookings?.map((item, index) => (
    //     <div key={index} className="bookingContainer">
    //       <h3 className="functionHallName">{item?.FunctionHallName}</h3>
    //       {item.Request !== "Pending" && (
    //         <span className="statusMessage">{item.Request}</span>
    //       )}

    //       <p className="details">Date: {item?.Date}</p>
    //       <p className="details">Booked By: {item?.NameofTheUserBooked}</p>
    //       <p className="details">Phone: {item?.PhoneNumber}</p>
    //       <p className="details">Request Status: {item?.Request}</p>
    //       <p className="details">Number of Guests: {item?.NumberOfGuests}</p>
    //       <p className="details">Event Type: {item?.TypeOfEvent}</p>
    //       <div className="buttonContainer">
    //         {!message && item.Request === "Pending" && (
    //           <>
    //             <button
    //               onClick={() => handleApprove(item._id)}
    //               className="actionButton approveButton"
    //             >
    //               Approve
    //             </button>
    //             <button
    //               onClick={() => handleReject(item._id)}
    //               className="actionButton rejectButton"
    //             >
    //               Reject
    //             </button>
    //           </>
    //         )}
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
};

export default SupervisorDashboardPage;
