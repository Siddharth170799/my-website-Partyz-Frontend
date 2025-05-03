import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import "./styles/Partyz_Landing_Page.css";


import logo from "./logos/Logo.png";
import backgroundImage from "../src/images/AdobeBackgroundImage.jpeg"
const PartyzLandingPage = () => {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState("");

  return (
    <div
      className="background-image"
      style={{ backgroundImage: `url(${backgroundImage})`,}}
    >
      <div className="container">
        <div className="image-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <button
          onClick={() => navigate("/UserLoginPage")}
          onMouseEnter={() => setHoveredButton("user")}
          onMouseLeave={() => setHoveredButton("")}
          className={`button ${hoveredButton === "user" ? "hovered" : ""}`}
        >
          Get Started as User
        </button>

        <button
          onClick={() => navigate("/SupervisorDashboardPage")}
          onMouseEnter={() => setHoveredButton("supervisor")}
          onMouseLeave={() => setHoveredButton("")}
          className={`button ${hoveredButton === "supervisor" ? "hovered" : ""}`}
        >
          Get Started as Supervisor
        </button>
      </div>
    </div>
  );
};

export default PartyzLandingPage;


// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//     height: "100%",
//   },
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//   },
//   imageContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 40,
//   },
//   image: {
//     width: 300,
//     height: 300,
//     resizeMode: "contain",
//     marginTop: 30,
//   },

//   button: {
//     borderWidth: 1,
//     borderColor: "rgba(255, 255, 255, 0.7)",
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     borderRadius: 25,
//     marginBottom: 20,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#FFF",
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   footer: {
//     fontSize: 14,
//     color: "#fff",
//     textAlign: "center",
//   },
//   link: {
//     color: "#FF6347",
//     fontWeight: "bold",
//   },
// });
