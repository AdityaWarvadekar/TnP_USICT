import React, { useContext, useEffect, useState } from "react";
import userContext from "../context/user/userContext";
import { NavLink, useNavigate } from "react-router-dom";
import "../components/css/userDashboard.css";
import Drives from "./Drives";
import authContext from "../context/auth/authContext";
import Profile from "./Profile";

const UserDashboard = () => {
  const { user, getUser } = useContext(userContext);
  const navigate = useNavigate();
  const loginType = localStorage.getItem("loginType");
  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const { state, dispatch } = useContext(authContext); //Using reducer of authcontext to save creation of another state
  const [displayState, setDisplayState] = useState("DRIVES");

  const showDashboard = () => {
    if (displayState === "PROFILE")
      return (
        <>
          <h4 className="my-4">Your Profile: <span><button className="btn btn-success mx-3"><i class="fa-solid fa-pen-to-square"></i></button></span></h4>
          <Profile />
        </>
      );
    else return <><h4 className="my-4">Your Drives: </h4><Drives /></>;
  };

  const activeStyle = "navLink active ";
  const inactiveStyle = "navLink underEffect";

  return (
    <>
      <div className="d-flex">
        <div className="dashboardContainer">
          <ul>
            <li className="dashboardElements">
              <button
                onClick={() => {
                  setDisplayState("DRIVES");
                }}
              >
                Drives
              </button>
            </li>
            <li className="dashboardElements">
              <button
                onClick={() => {
                  setDisplayState("PROFILE");
                }}
              >
                Profile
              </button>
            </li>
            <li className="dashboardElements">
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
        <div className="dashboardDisplay"><h1>Welcome {(loginType==="company")? user.pocName : user.name } !</h1>{showDashboard()}</div>
      </div>
    </>
  );
};

export default UserDashboard;
