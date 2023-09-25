import React, { useContext, useEffect } from "react";
import userContext from "../context/user/userContext";
import { NavLink } from "react-router-dom";
import "../components/css/userDashboard.css";

const UserDashboard = () => {
  const { user, getUser } = useContext(userContext);

  useEffect(() => {
    getUser();
  }, []);

  const activeStyle = "navLink active ";
  const inactiveStyle = "navLink underEffect";

  return (
    <>
      <div className="d-flex">
        <div className="dashboardContainer">
          <ul>
            <li className="dashboardElements"><a href="#"><p>Drives Scheduled</p></a></li>
            <li className="dashboardElements"><a href="#"><p>Profile</p></a></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
