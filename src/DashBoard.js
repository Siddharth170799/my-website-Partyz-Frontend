import React, { useEffect, useState } from "react";
import axios from "axios";
// import Card from "@/components/Card"; // Make sure Card is compatible with web
// import Navbar from "@/components/Header";
// import { GetFunctionHalls } from "@/config/useLocalConfig";
import Card from "./components/Card";
import Navbar from "./components/Navbar";

import { useNavigate } from "react-router-dom";

export default function Dashboard({ location }) {
  const [functionHalls, setFunctionHalls] = useState([]);
  const [filteredFunctionHalls, setFilteredFunctionHalls] = useState([]);
  const [searchByHallName, setSearchByHallName] = useState("");
  const navigate = useNavigate();

  const FunctionHallsData = async () => {
    try {
      const hallsList = await axios.get("http://localhost:4000/api/getFunctionHalls");
      setFunctionHalls(hallsList.data);
      console.log(hallsList);
    } catch (error) {
      console.error("Error fetching function halls:", error);
    }
  };

  const filteredFunctionHallsBySearch = () => {
    const filteredFunctionHallsDetails = functionHalls.filter(
      (item) =>
        item.Name.toLowerCase().includes(searchByHallName.toLowerCase()) ||
        item.Address.toLowerCase().includes(searchByHallName.toLowerCase())
    );
    setFilteredFunctionHalls(filteredFunctionHallsDetails);
  };

  const filteredFunctionHallsByLocation = () => {
    const filteredFunctionHallsDetails1 = functionHalls.filter(
      (item) =>
        item?.lat == `${location?.latitude}` &&
        item?.long == `${location?.longitude}`
    );
    setFunctionHalls(filteredFunctionHallsDetails1);
  };

  const filteredFunctionHallsByPax = () => {
    const filteredFunctionHallsDetails = functionHalls.filter(
      (item) => parseInt(item.Capacity) > 400
    );
    setFunctionHalls(filteredFunctionHallsDetails);
  };

  useEffect(() => {
    FunctionHallsData();
  }, []);

  useEffect(() => {
    filteredFunctionHallsBySearch();
  }, [searchByHallName]);

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="main-content">
          <button
            className="my-bookings-button"
            onClick={() => navigate("/UserBookingsPage")}
          >
            My Bookings
          </button>

          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search By Hall Name or Location"
              value={searchByHallName}
              onChange={(e) => setSearchByHallName(e.target.value)}
            />
          </div>

          <div className="button-container">
            <button className="filter-button" onClick={filteredFunctionHallsByPax}>
              Capacity above 500
            </button>
            <button className="filter-button" onClick={FunctionHallsData}>
              Display All
            </button>
          </div>

          <div className="cards-container">
            {(filteredFunctionHalls.length > 0 || searchByHallName !== ""
              ? filteredFunctionHalls
              : functionHalls
            ).map((hall, id) => (
              <Card key={id} hall={hall} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
