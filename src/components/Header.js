import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./css/headerFooter.css";
import authContext from "../context/auth/authContext";

// #2D4059 #EA5455 #F07B3F #FFD460

function Header() {
  const activeStyle = "navLink active ";
  const inactiveStyle = "navLink underEffect";

  const { state, dispatch } = useContext(authContext);

  const clearStorage = () => {
    //This Function Clears the Local Storage of previous session when the page is loaded and session
    //storage is null. Then it makes session storage register 1.
    let session = sessionStorage.getItem("register");
    if (session == null) {
      dispatch({ type: "USER", payload: false });     //we set payload false, so it will return false (as defined in reducer fnx)
      console.log("state now: "+ state);
      localStorage.removeItem("session");
    }
    sessionStorage.setItem("register", 1);
  };

  window.addEventListener("load", clearStorage);

  const loginDashboard = () => {
    if (state) {
      return (
        <NavLink
          className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          name="user"
          to="/userDashboard"
        >
          <i class="fa-solid fa-user"></i>
        </NavLink>
      );
    } else {
      return (
        <NavLink
          className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          name="login"
          to="/login"
        >
          Login
        </NavLink>
      );
    }
  };

  return (
    <div>
      <nav className="navbar fixed-top navCustom navbar-dark navbar-expand-lg py-3">
        <div className="container-fluid">
          <div className="navbar-brand mx-3 w-50 navHead">
            <img
              src={require("./images/ggsipu.png")}
              style={{ width: "8%", marginRight: "1vh" }}
              alt=""
            ></img>
            Training and Placement Cell, USICT
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav" style={{ marginLeft: "auto" }}>
              <li className="nav-item mx-3">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                  }
                  name="home"
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item mx-3">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                  }
                  name="about"
                  to="/about"
                >
                  About Us
                </NavLink>
              </li>
              <li className="nav-item mx-3">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                  }
                  name="rankings"
                  to="/rankings"
                >
                  Rankings
                </NavLink>
              </li>
              <li className="nav-item mx-3">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                  }
                  name="statistics"
                  to="/statistics"
                >
                  Statistics
                </NavLink>
              </li>
              <li className="nav-item mx-3">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                  }
                  name="contact"
                  to="/contact"
                >
                  Contact
                </NavLink>
              </li>

              <li className="nav-item mx-3">{loginDashboard()}</li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
