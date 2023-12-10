import React, { useEffect, useRef, useState } from "react";
import "../components/css/userDashboard.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const loginType = localStorage.getItem("loginType");
  const host = "http://localhost:5000";
  const url =
    loginType === "student"
      ? `${host}/api/auth/getStudentDetails`
      : `${host}/api/auth/getCompanyDetails`;

  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [pword, setPword] = useState("");
  const [acadDetails, setAcadDetails] = useState({ percentage10: "", percentage12: "", gradCGPA: "", gender: "", resume: "" });

 
  

  const onChange = (e) => {
    setAcadDetails({ ...acadDetails, [e.target.name]: e.target.value });
  }

  const onChangeProfile = (e) => {
    if(e.target.name==="pword")
      setPword(e.target.value);
    else
    setProfile({...profile, [e.target.name]: e.target.value});
  }

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
      console.log("SUCCSSSSEEE");
      if (json.student){
        setProfile(json.student);
      }
      else setProfile(json.company);
    } else {
      console.log("eroooo");
      console.log(json.error);
    }
  };


  const ref = useRef(null);
  const profileRef = useRef(null);
  const submitbtn = useRef(null);

  const toggle = () => {
    // console.log("HIHIHIIH");
    ref.current.click();
  }
  const submit = () => {
    submitbtn.current.click();
  }

  const close = useRef(null);


  const addDetails = async (e) => {
    e.preventDefault();
    console.log("SUBMITTTTTTT");

    const response = await fetch(`${host}/api/student/addAcademicDetails`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({
        percentage10: acadDetails.percentage10,
        percentage12: acadDetails.percentage12,
        gradCGPA: acadDetails.gradCGPA,
        resume: acadDetails.resume,
        gender: acadDetails.gender
      })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      window.alert("Details added Successfully");
      close.current.click();
      navigate("/");
    }
    else {
      const error = json.error;
      window.alert(error[0].path + " : " + error[0].msg);
    }
  }

  const updateProfile= async (e)=>{
    e.preventDefault();
    const updateUrl = loginType==="student"?
      `${host}/api/auth/updateStudentDetails` : 
      `${host}/api/auth/updateCompanyDetails` ;
    const response = await fetch(updateUrl, {
      method: "POST", 
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      
      body: JSON.stringify({
        email : profile.email,
        password: pword
      })
    } );
    const json = await response.json();
    console.log(json);
    if (json.success){
      console.log("SUCCSSSSEEE");
      alert("Update Sucessful");
      navigate("/userDashboard");
      close.current.click();
    }
    else {
      const error = json.error;
      window.alert(error);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);


  const academicModal = () => {
    return (<>
      <button type="button" ref={ref} class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
        Launch demo modal
      </button>


      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Academic Details</h5>
              <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body p-5">
              <form onSubmit={addDetails}>
                <div class="form-row d-flex">
                  <div class="col w-50 mx-2">
                    <label>12th Percentage:</label>
                    <input type="text" class="form-control" placeholder="0-100" name="percentage12" value={acadDetails.percentage12} onChange={onChange} />
                  </div>
                  <div class="col w-50 mx-2">
                    <label>10th Percentage:</label>
                    <input type="text" class="form-control" placeholder="0-100" name="percentage10" value={acadDetails.percentage10} onChange={onChange} />
                  </div>
                </div>
                <div class="form-row d-flex my-4">
                  <div class="col w-50 mx-2">
                    <label>Graduation CGPA</label>
                    <input type="text" class="form-control" placeholder="0-10" name="gradCGPA" value={acadDetails.gradCGPA} onChange={onChange} />
                  </div>
                  <div class="col w-50 mx-2">
                    <label>Resume Link</label>
                    <input type="text" class="form-control" placeholder="Drive link" name="resume" value={acadDetails.resume} onChange={onChange} />
                  </div>
                </div>
                <div class="form-row d-flex">
                  <div class="col w-50 mx-2">
                    <label>Gender</label>
                    <input type="text" class="form-control" placeholder="M/F" name="gender" value={acadDetails.gender} onChange={onChange} />
                  </div>
                </div>
                <button type="submit" ref={submitbtn} className="d-none">SJN</button>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" ref={close} data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={submit} className="btn btn-success">Add</button>
            </div>
          </div>
        </div>
      </div></>
    )
  }
  
  
  const profileModal = () => {
    // console.log(profile.name);
    return (
      <><button type="button" ref={profileRef} class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleMdalCenter">
        Launch demo modal
      </button>


        <div class="modal fade" id="exampleMdalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleMdalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Profile Details</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body p-5">
                <form onSubmit={updateProfile}>
                
                  <div class="form-row d-flex">
                  
                      <div class="col w-50 mx-2">
                      <label>Email: </label>
                      <input type="text" class="form-control my-2" placeholder={profile.email} name="email" value={profile.email} onChange={onChangeProfile} />
                    </div>
                  </div>
                  <div class="form-row d-flex">
                  
                      <div class="col w-50 mx-2">
                      <label>Password: </label>
                      <input type="password" class="form-control my-2" placeholder={pword} name="pword" value={pword} onChange={onChangeProfile} />
                    </div>
                  </div>

                  <button type="submit" ref={submitbtn} className="d-none">SJN</button>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" ref={close} data-bs-dismiss="modal">Close</button>
                <button type="button" onClick={submit} className="btn btn-success">Update</button>
              </div>
            </div>
          </div>
        </div></>
    )
  }



  const showProfile = () => {

    if (profile && loginType === "student") {
      // if(profile.academics){
      //   setAcadDetails({percentage10: profile.academics.percentage10, percentage12: profile.academics.percentage12, gradCGPA: profile.academics.gradCGPA, resume: profile.academics.resume, gender: profile.academics.gender});
      // }
      return (<>
        <h4 className="my-4">Your Profile: <span><button className="btn btn-success mx-3" onClick={() => { console.log("AAUUUUU"); profileRef.current.click(); }}><i class="fa-solid fa-pen-to-square"></i></button></span></h4>
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
        <h4 className="my-5">Academic Details: <span><button className="btn btn-success mx-3" onClick={toggle}><i class="fa-solid fa-pen-to-square"></i></button></span></h4>
        {(profile.academics) ? <div className="profileContainer">
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
                <h6>{profile.academics.resume}</h6>
              </div>
            </div>

          </div>
        </div> : //OR

          <>
            <button className="btn btn-success w-100" onClick={toggle}>Add Academic Details</button>
          </>}

        {academicModal()}
        {profileModal()}
      </>
      );
    }

    else if (profile && loginType === "company") {
      return (
        <><h4 className="my-4">Your Profile: <span><button className="btn btn-success mx-3" onClick={() => { console.log("AAUUUUU"); profileRef.current.click(); }}><i class="fa-solid fa-pen-to-square"></i></button></span></h4>
        <div className="profileContainer">
          <div className="d-flex justify-content-between align-items-center w-100 p-5">
            <div className="d-flex w-50 justify-content-evenly px-5">
              <div className="d-flex flex-column head">
                <h6>Organisation:</h6>
                <h6>Address:</h6>
                <h6>Sector:</h6>
              </div>
              <div className="d-flex flex-column">
                <h6>{profile.orgName}</h6>
                <h6>{profile.location}</h6>
                <h6>{profile.sector}</h6>
              </div>
            </div>
            <div className="d-flex w-50 justify-content-evenly px-5">
              <div className="d-flex flex-column head">
                <h6>Name:</h6>
                <h6>Designation:</h6>
                <h6>Email:</h6>
                <h6>Contact:</h6>
              </div>
              <div className="d-flex flex-column">
                <h6>{profile.pocName}</h6>
                <h6>{profile.pocDesignation}</h6>
                <h6>{profile.email}</h6>
                <h6>{profile.contact}</h6>
              </div>
            </div>

          </div>
        </div>
        {profileModal()}
        </>
      );
    }

  };

  return <div>{showProfile()}</div>;
};

export default Profile;
