import React, { useEffect, useState } from "react";
import axios from "axios";
import { GetFunctionHalls } from "./config/useLocalConfig";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import "./styles/DashBoard.css";
import Loader from "./components/Loader";

export default function Dashboard({ location }) {
  const [functionHalls, setFunctionHalls] = useState([]);
  const [filteredFunctionHalls, setFilteredFunctionHalls] = useState([]);
  const [searchByHallName, setSearchByHallName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function to fetch function halls from API
  const FunctionHallsData = async () => {
    try {
      const hallsList = await axios.get(GetFunctionHalls);
      setFunctionHalls(hallsList.data);
      console.log(hallsList);
    } catch (error) {
      console.error("Error fetching function halls:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter function halls by name or location based on search input
  const filteredFunctionHallsBySearch = () => {
    const filteredFunctionHallsDetails = functionHalls.filter(
      (item) =>
        item.Name.toLowerCase().includes(searchByHallName.toLowerCase()) ||
        item.Address.toLowerCase().includes(searchByHallName.toLowerCase())
    );
    setFilteredFunctionHalls(filteredFunctionHallsDetails);
  };

  // Filter function halls by location (latitude & longitude)
  const filteredFunctionHallsByLocation = () => {
    const filteredFunctionHallsDetails1 = functionHalls.filter(
      (item) =>
        item?.lat == `${location?.latitude}` &&
        item?.long == `${location?.longitude}`
    );
    setFunctionHalls(filteredFunctionHallsDetails1);
  };

  // Filter function halls by capacity (above 400)
  const filteredFunctionHallsByPax = () => {
    const filteredFunctionHallsDetails = functionHalls.filter(
      (item) => parseInt(item.Capacity) > 400
    );
    setFunctionHalls(filteredFunctionHallsDetails);
  };

  useEffect(() => {
    FunctionHallsData(); // Fetch function halls data on component mount
  }, []);

  useEffect(() => {
    filteredFunctionHallsBySearch(); // Filter function halls by search term
  }, [searchByHallName]);

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="main-content">
          {/* My Bookings Button */}
          <button
            className="my-bookings-button"
            onClick={() => navigate("/UserBookingsPage")}
          >
            My Bookings
          </button>

          {/* Search Input */}
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search By Hall Name or Location"
              value={searchByHallName}
              onChange={(e) => setSearchByHallName(e.target.value)}
            />
          </div>

          {/* Filter Buttons */}
          <div className="button-container">
            <button
              className="filter-button"
              onClick={filteredFunctionHallsByPax}
            >
              Capacity above 500
            </button>
            <button className="filter-button" onClick={FunctionHallsData}>
              Display All
            </button>
          </div>

          {/* Cards Display */}
          <div className="cards-container">
            {loading ? (
              <div
                style={{
                  position: "fixed",
                  top: 90,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",

                  zIndex: 9999, // ensures it appears above all
                }}
              >
                <Loader size={80} color="blue" />
              </div>
            ) : filteredFunctionHalls.length > 0 || searchByHallName !== "" ? (
              filteredFunctionHalls.map((hall, id) => (
                <Card key={id} hall={hall} />
              ))
            ) : (
              functionHalls.map((hall, id) => <Card key={id} hall={hall} />)
            )}
          </div>
        </div>
      </div>
    </>
  );
}
