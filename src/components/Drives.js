import React, { useContext, useEffect, useState } from "react";
import userContext from "../context/user/userContext";
import ScheduleDrive from "./ScheduleDrive";
import { useNavigate } from "react-router-dom";



const Drives = () => {
  const loginType = localStorage.getItem("loginType");
  const host = "http://localhost:5000";
  const navigate = useNavigate();

  // if(!localStorage.getItem("session")){
  //   console.log("DODODODODODADADADADADAD");
  //   navigate("/login");
  // }
  const url =
    loginType === "student"
      ? "/api/student/scheduledDrives"
      : "/api/company/viewScheduledDrives";
  const { user, getUser } = useContext(userContext);

  const [drives, setDrives] = useState(null);

  const getDrives = async () => {
    const response = await fetch(`${host}${url}`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (json) {
      if (json.error) {
        setDrives(null);
      } else {
        // console.log("json");
        console.log(json);
        // console.log("inside /getDrives");
        setDrives(json);
        // console.log(drives);
      }
    } else {
      console.log("Error");
    }
  };

  const displayElements =  (elementArray)=>{
        let ans="";
        let i=0;
        // elementArray = await elementArray;
        for(i=0; i<elementArray.length-1; i++)
          ans+=elementArray[i]+"/";
        ans+=elementArray[i];
      return ans;
  }

  const showDrives = () => {
    if (!drives){
      return (
        <div className="my-5 py-5 d-flex flex-column align-items-center">
          {/* <h4>{drives.error}</h4> */}
          <button className="btn btn-success my-3" onClick={()=>{navigate("/scheduleDrive")}}>Schedule a Drive</button>
        </div>
      );}
    else if (drives && loginType === "student"){
      return drives.map((e) => {
        return (
          <div className="driveCard">
          <div className="d-flex justify-content-between align-items-center px-3">
            <h4>{e.orgName} Recruitment Drive: </h4>
            <h5>{e.driveDate.slice(0,10)}</h5>
          </div>
          <div className="d-flex justify-content-between align-items-center p-3">
            <div className="d-flex w-25 justify-content-between">
            <div className="d-flex flex-column">
              <h6>Role:</h6>
              <h6>Batch:</h6>
              <h6>Branch:</h6>
            </div>
            <div className="d-flex flex-column">
              <h6>{e.jobDesignation}</h6>
              {/* <h6>{displayElements(e.batch)}</h6> */}
              {/* <h6>{displayElements(e.stream)}</h6> */}
            </div>
            </div>
            <div className="d-flex w-25 justify-content-between">
            <div className="d-flex flex-column">
            <h6>Course:</h6>
              <h6>CTC:</h6>
              <h6>Mode:</h6>
            </div>
            <div className="d-flex flex-column mx-2">
              {/* <h6>{displayElements(e.course)}</h6> */}
              <h6>{e.ctc}</h6>
              <h6>{e.mode}</h6>
            </div>
            </div>
            <button className="btn btn-success">View Details</button>
          </div>
        </div>
        );
      });
    }
    else if(drives && loginType === "company"){
      return (
        <div className="driveCard">
          <div className="d-flex justify-content-between align-items-center px-3">
            <h4>{drives.orgName} Recruitment Drive: </h4>
            <h5>{drives.driveDate.slice(0,10)}</h5>
          </div>
          <div className="d-flex justify-content-between align-items-center p-3">
            <div className="d-flex w-25 justify-content-between">
            <div className="d-flex flex-column">
              <h6>Role:</h6>
              <h6>Batch:</h6>
              <h6>Branch:</h6>
            </div>
            <div className="d-flex flex-column">
              <h6>{drives.jobDesignation}</h6>
              <h6>{displayElements(drives.batch)}</h6>
              <h6>{displayElements(drives.stream)}</h6>
            </div>
            </div>
            <div className="d-flex w-25 justify-content-between">
            <div className="d-flex flex-column">
              <h6>Course:</h6>
              <h6>CTC:</h6>
              <h6>Mode:</h6>
            </div>
            <div className="d-flex flex-column mx-3">
              <h6>{displayElements(drives.course)}</h6>
              <h6>{drives.ctc}</h6>
              <h6>{drives.mode}</h6>
            </div>
            </div>
            <button className="btn btn-success">View Details</button>
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    getDrives();
  }, []);

  return (
    <>
      <div className="displayContainer py-2">{showDrives()}</div>
    </>
  );
};

export default Drives;
