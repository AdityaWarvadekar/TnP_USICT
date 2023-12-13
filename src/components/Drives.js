import React, { useContext, useEffect, useRef, useState } from "react";
import userContext from "../context/user/userContext";
import ScheduleDrive from "./ScheduleDrive";
import { useNavigate } from "react-router-dom";
import DriveCard from "./DriveCard";



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
        setCurrDrive(json);
        // console.log(drives);
      }
    } else {
      console.log("Error");
    }
  };

  const displayElements = (elementArray) => {
    let ans = "";
    let i = 0;
    // elementArray = await elementArray;
    for (i = 0; i < elementArray.length - 1; i++)
      ans += elementArray[i] + "/";
    ans += elementArray[i];
    return ans;
  }

  const detailsBtn = useRef(null);
  const detailsBtnCompany = useRef(null);

  const [dwnldLink, setDwnldLink] = useState("#")

  async function getLink(drives) {
    console.log("CHALLLALALALALLLLLLAAAAAAAAAAA", drives.otherDocument);
    const response = await fetch(`${host}/api/company/getObjectUrl`, {
      method: "GET",
      headers: {
        filePath: `uploads/${drives.otherDocument}`
      }
    });
    const json = await response.json();
    if (json.success)
      setDwnldLink(json.url);
    else
      setDwnldLink("#");
  }


  //ONLY FOR THE COMPANY MODAL
  const showDetails = () => {
    getLink(drives);
    return (
      <>
        <button type="button" ref={detailsBtnCompany} class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleMdalCenter">
          Launch demo modal
        </button>


        <div class="modal fade" id="exampleMdalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleMdalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">{drives.orgName} Recruitment Drive</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body p-5 ">
                <p><b>Brief:</b> {drives.brief}</p>
                <p><b>Job Role:</b> {drives.jobDesignation}</p>
                <p><b>CTC:</b> {drives.ctc}</p>
                <p><b>Job Description:</b> {drives.jobDescription}</p>
                <p><b>Relevant Document:</b><a className="btn btn-success mx-3" href={dwnldLink}><i class="fa-solid fa-download"></i></a></p>
                <p><b>Drive Date:</b> {(drives.driveDate) ? drives.driveDate.slice(0, 10) : "----"}</p>
                <p><b>No. of Rounds:</b> {drives.numberOfRounds}</p>
                <p><b>Rounds Description:</b> {drives.roundDescription}</p>
                <p><b>Job Location:</b> {drives.jobLocation}</p>
                <p><b>Joining Date:</b> {(drives.joiningDate) ? drives.joiningDate.slice(0, 10) : "----"}</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </>);
  }

  const [currDrive, setCurrDrive] = useState(null);

  const updateDrive = (drive) => {
    detailsBtn.current.click();
    setCurrDrive(drive);
    getLink(drive);
  }

  const showDrives = () => {
    if (!drives && loginType==="company") {
      return (
        <div className="my-5 py-5 d-flex flex-column align-items-center">
          {/* <h4>{drives.error}</h4> */}
          <button className="btn btn-success my-3" onClick={() => { navigate("/scheduleDrive") }}>Schedule a Drive</button>
        </div>
      );
    }
    else if (drives && currDrive && loginType === "student") {

      return (
        <>
        {console.log("getting link of : ", currDrive.otherDocument)}
          <button type="button" ref={detailsBtn} class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleMdalCenter">
            Launch demo modal
          </button>


          <div class="modal fade" id="exampleMdalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleMdalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">{currDrive? currDrive.orgName : "abc"} Recruitment Drive</h5>
                  <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body p-5 ">
                  <p><b>Brief:</b> {currDrive.brief}</p>
                    <p><b>Job Role:</b> {currDrive.jobDesignation}</p>
                    <p><b>CTC:</b> {currDrive.ctc}</p>
                    <p><b>Job Description:</b> {currDrive.jobDescription}</p>
                    <p><b>Relevant Document:</b><a className="btn btn-success mx-3" href={dwnldLink}><i class="fa-solid fa-download"></i></a></p>
                    <p><b>Drive Date:</b> {(currDrive.driveDate) ? currDrive.driveDate.slice(0, 10) : "----"}</p>
                    <p><b>No. of Rounds:</b> {currDrive.numberOfRounds}</p>
                    <p><b>Rounds Description:</b> {currDrive.roundDescription}</p>
                    <p><b>Job Location:</b> {currDrive.jobLocation}</p>
                    <p><b>Joining Date:</b> {(currDrive.joiningDate) ? currDrive.joiningDate.slice(0, 10) : "----"}</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

          {
            drives.map((e, index) => {
              console.log("e i:", e, index);
              return <DriveCard displayElements={displayElements} index={index} updateDrive={updateDrive} drive={e} />
            })
          }
        </>
      )
    }





    else if (drives && loginType === "company") {
      return (
        <div className="driveCard">
          <div className="d-flex justify-content-between align-items-center px-3">
            <h4>{drives.orgName} Recruitment Drive: </h4>
            <h5>{drives.driveDate.slice(0, 10)}</h5>
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
            <button className="btn btn-success" onClick={() => { detailsBtnCompany.current.click() }}>View Details</button>
            {showDetails()}
          </div>
        </div>
      );
    }
    else return <h1>No Drives Scheduled</h1>
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
