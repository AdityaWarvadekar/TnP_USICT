import React, { useEffect, useState } from "react";
import "../components/css/userDashboard.css";

const Profile = () => {
  const loginType = localStorage.getItem("loginType");
  const host = "http://localhost:5000";
  const url =
    loginType === "student"
      ? `${host}/api/auth/getStudentDetails`
      : `${host}/api/auth/getCompanyDetails`;

  const [profile, setProfile] = useState([]);

  const getProfile = async () => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      console.log("SUCCCCC");
      setProfile(json.student);
    } else {
      console.log("eroooo");
      console.log(json.error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const showProfile = () => {
    if (profile && loginType==="student") {
      return (<>
        <div className="profileContainer">
        <div className="d-flex justify-content-between align-items-center w-100 p-5">
          <div className="d-flex w-50 justify-content-evenly px-5">
            <div className="d-flex flex-column head">
              <h6>Name:</h6>
              <h6>Enrollment:</h6>
              <h6>Course:</h6>
              <h6>Branch:</h6>
            </div>
            <div className="d-flex flex-column">
              <h6>{profile.name}</h6>
              <h6>{profile.enrollment}</h6>
              <h6>{profile.course}</h6>
              <h6>{profile.branch}</h6>
            </div>
          </div>
          <div className="d-flex w-50 justify-content-evenly px-5">
            <div className="d-flex flex-column head">
              <h6>email:</h6>
              <h6>YOP:</h6>
            </div>
            <div className="d-flex flex-column">
              <h6>{profile.email}</h6>
              <h6>{profile.yop}</h6>
            </div>
          </div>
          
        </div>
        </div>
        <h4 className="my-5">Academic Details: <span><button className="btn btn-success mx-3"><i class="fa-solid fa-pen-to-square"></i></button></span></h4>
        {(profile.academics)? <div className="profileContainer">
        <div className="d-flex justify-content-between align-items-center w-100 p-5">
          <div className="d-flex w-50 justify-content-evenly px-5">
            <div className="d-flex flex-column head">
              <h6>10th Percentage:</h6>
              <h6>12th Percentage:</h6>
              <h6>Gender</h6>
            </div>
            <div className="d-flex flex-column">
              <h6>{profile.academics.percentage10}</h6>
              <h6>{profile.academics.percentage12}</h6>
              <h6>{profile.academics.gender}</h6>
            </div>
          </div>
          <div className="d-flex w-50 justify-content-evenly px-5">
            <div className="d-flex flex-column head">
              <h6>Graduation CGPA:</h6>
              <h6>Resume:</h6>
            </div>
            <div className="d-flex flex-column ">
              <h6>{profile.academics.gradCGPA}</h6>
              <h6>{profile.academics.resume}<button className="btn"><i class="fa-solid fa-expand"></i></button></h6>
            </div>
          </div>
          
        </div>
        </div> : <button className="btn btn-success w-100">Add Academic Details</button>}
        
        </>
      );
    }
  };

  return <div>{showProfile()}</div>;
};

export default Profile;
