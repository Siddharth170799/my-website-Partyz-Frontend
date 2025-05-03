import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Mycontext from "../context/createContext";

const Card = ({ hall }) => {
  const { selectedHallName, setselectedHallName } = useContext(Mycontext);
  const navigate = useNavigate();

  const bookHall = (Name) => {
    setselectedHallName(Name);
    navigate("/BookingDatePicker");
  };

  return (
    <div style={styles.card}>
      <img src={hall.Image} alt={hall.Name} style={styles.image} />
      <div style={styles.cardContent}>
        <h3 style={styles.title}>{hall.Name}</h3>
        <div style={styles.addressContainer}>
          <p style={styles.description}>{hall.Address}</p>
          <button style={styles.button} onClick={() => bookHall(hall.Name)}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    marginBottom: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
  },
  cardContent: {
    padding: 15,
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  description: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "10px",
    flex: 1,
  },
  addressContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    color: "#FFF",
    padding: "6px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default Card;
