
import React from "react";
import { NavLink } from "react-router-dom";
import "./css/headerFooter.css";

// #2D4059 #EA5455 #F07B3F #FFD460


function Header() {
  const activeStyle = "navLink active ";
  const inactiveStyle = "navLink underEffect";
  

  return (
    <div>
      <nav
        className="navbar fixed-top navCustom navbar-dark navbar-expand-lg py-3"
      >
        <div className="container-fluid">
          <div className="navbar-brand mx-3 w-50 navHead">
          <img src={require("./images/ggsipu.png")} style={{width: "8%", marginRight: "1vh"}} alt=""></img>Training and Placement Cell, USICT
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
            <ul className="navbar-nav" style={{marginLeft: "auto"}}>
              <li className="nav-item mx-3">
                <NavLink className={({isActive})=>isActive? activeStyle : inactiveStyle} name="home" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item mx-3">
                <NavLink className={({isActive})=>isActive? activeStyle : inactiveStyle} name="about" to="/about">
                  About Us
                </NavLink>
              </li>
              <li className="nav-item mx-3">
                <NavLink className={({isActive})=>isActive? activeStyle : inactiveStyle} name="rankings" to="/rankings">
                  Rankings
                </NavLink>
              </li>
              <li className="nav-item mx-3">
                <NavLink className={({isActive})=>isActive? activeStyle : inactiveStyle}  name="statistics" to="/statistics">Statistics</NavLink>
              </li>
              <li className="nav-item mx-3">
                <NavLink className={({isActive})=>isActive? activeStyle : inactiveStyle} name="contact" to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
