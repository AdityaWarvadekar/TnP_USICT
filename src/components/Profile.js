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
    if (e.target.name === "pword")
      setPword(e.target.value);
    else
      setProfile({ ...profile, [e.target.name]: e.target.value });
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
      if (json.student) {
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
  const close = useRef(null);

  const addBtn = useRef(null);

  const addDetails = async (e) => {
    let uploadStatus = 404;
    e.preventDefault();
    if (localStorage.getItem("session") === "false") {
      alert("Session Expired! Please Login again");
      navigate("/login");
    }
    else {
      try {
        // alert(putUrl);
        const uploadResponse = await fetch(`${putUrl}`, {
          method: "PUT",
          headers: {
            "content-type": "multipart/form-data"
          },
          body: File
        });

        uploadStatus = uploadResponse.status;
        console.log("response", uploadStatus);
        // alert(uploadStatus);
      } catch (error) {
        console.log("EROOORRRRR:", error);
        console.log("Internal Server Error. Please Refresh!");
      }
      if (uploadStatus === 200) {
        // alert("uploading Now!");
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
            resume: filePath,
            gender: acadDetails.gender
          })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
          window.alert("Details added Successfully");
          close.current.click();
          navigate("/userDashboard");
          getProfile();
        }
        else {
          const error = json.error;
          window.alert(error[0].path + " : " + error[0].msg);
        }
      }
      else alert("No document attached! ");
    }

  }


  const updateProfile = async (e) => {
    e.preventDefault();
    const updateUrl = loginType === "student" ?
      `${host}/api/auth/updateStudentDetails` :
      `${host}/api/auth/updateCompanyDetails`;
    const response = await fetch(updateUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token")
      },

      body: JSON.stringify({
        email: profile.email,
        password: pword
      })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
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



  //UPLOAD

  const [File, setFile] = useState(null);
  const [filePath, setFilePath] = useState(null);

  const handleUploadChange = async (e) => {
    if (e.target.files[0] && e.target.files[0].type==="application/pdf") {
      setFile(e.target.files[0]);
      setFilePath(`student/${profile.yop}/${profile.course}/${profile.branch}/${profile.name}/resume_${profile.enrollment}_${profile.name}.pdf`);
    } else {
      alert("Only .pdf allowed!");
      setFilePath(null);
      setPutUrl(null);
      setFile(null);
      console.log("HATTATATATTATTTTT in Profile.js");
    }
  }

  const [putUrl, setPutUrl] = useState(null);

  const generatePutURL = async () => {
    const response = await fetch(`${host}/api/company/getPutObjectUrl`, {
      method: "GET",
      headers: {
        filePath: filePath,
        contentType: "application/pdf"
      }
    });
    const json = await response.json();
    if (json.success)
      setPutUrl(json.url);
    else {
      // setPutUrl(null);
      console.log(json.error);
    }
  }

  useEffect(() => {
    if (filePath) {
      console.log("filePath:", filePath);
      generatePutURL();
    }
  }, [filePath])


  //DOWNLOAD

const [dwnldLink, setDwnldLink] = useState("#");

useEffect(()=>{
  const getLink = async()=>{
    const response = await fetch(`${host}/api/company/getObjectUrl`, {
      method: "GET", 
      headers: {
        filePath : `uploads/${profile.academics.resume}`
      }
    });
    const json = await response.json();
    if(json.success)
      setDwnldLink(json.url);
    else{
      setDwnldLink("#");
      console.log("AWS ERROR: ", json.error)
    }
  }
  getLink();
}, [profile])



//PIC UPLOAD



const [Pic, setPic] = useState(null);
const [picPath, setPicPath] = useState(null);
const [picUrl, setPicUrl] = useState(null);

const generatePicPutUrl = async ()=>{
  const response = await fetch(`${host}/api/company/getPutObjectUrl`, {
    method: "GET",
    headers: {
      filePath: picPath,
      contentType: "image/jpeg"
    }
  });
  const json = await response.json();
  
  if (json.success){
    // console.log("repsonse: ", json.url);
    setPicUrl(json.url);
    // alert("picurl: ", json.url);
    // console.log("picUrl: ", picUrl);
  }
  else {
    setPicUrl(null);
    console.log(json.error);
  }
}
const [loading, setLoading] = useState(false);

const handlePicChange = async (e)=>{
  if (e.target.files[0] && e.target.files[0].type==="image/jpeg"){
    setPic(e.target.files[0]);
    setPicPath(`student/${profile.yop}/${profile.course}/${profile.branch}/${profile.name}/profile_${profile.enrollment}_${profile.name}.jpg`);
  } 
  else {
    alert("Invalid File Type (only jpeg)");
    setPicPath(null);
    setPic(null);
    setPicUrl(null);
    console.log("HATTATATATTATTTTT in Image .js");
    return;
  }
}

useEffect(() => {
  if (picPath) {
    // alert("filePath going to effect gen put:", picPath);
    generatePicPutUrl();
  }
}, [picPath]);


const picUpload = async (e)=>{
  // alert("uploading at: ",picPath);
  setLoading(true);
  let uploadStatus = 404;
    e.preventDefault();
    if (localStorage.getItem("session") === "false") {
      alert("Session Expired! Please Login again");
      setLoading(false);
      navigate("/login");
    }
    else {
      try {
        // alert(putUrl);
        const uploadResponse = await fetch(`${picUrl}`, {
          method: "PUT",
          headers: {
            "content-type": "image/jpeg"
          },
          body: Pic
        });

        uploadStatus = uploadResponse.status;
        console.log("response", uploadStatus);
        // alert(uploadStatus);
      } catch (error) {
        console.log("EROOORRRRR:", error);
        console.log("Internal Server Error. Please Refresh!");
      }
    }
    if(uploadStatus===200){
      setUploaded(true);
      const updateUrl = loginType === "student" ?
      `${host}/api/auth/updateStudentPic` :
      `${host}/api/auth/updateCompanyPic`;

      const response = await fetch(updateUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({
          pic: picPath,
        })
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        window.alert("Profile Pic Uploaded Successfully");
        navigate("/userDashboard");
        getProfile();
      }
      else {
        const error = json.error;
        alert(error);
      }

    }
    else
      alert("No file attached");
    // setUploaded(false);
    setLoading(false);
}

  const academicModal = () => {
    return (<>
      <button type="button" ref={addBtn} class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
        Launch demo modal
      </button>


      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
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
                    <input type="file" class="form-control" name="resume" onChange={handleUploadChange} placeholder="" />
                  </div>
                </div>
                <div class="form-row d-flex">
                  <div class="col w-50 mx-2">
                    <label>Gender</label>
                    <input type="text" class="form-control" placeholder="M/F" name="gender" value={acadDetails.gender} onChange={onChange} />
                  </div>
                </div>
                <div class="modal-footer" style={{ marginTop: "10vmin" }}>
                  <button type="button" class="btn btn-secondary" ref={close} data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-success">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div></>
    )
  }

const [uploaded, setUploaded] = useState(false);

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
                <h5 class="modal-title" id="exampleModalLongTitle">Update Email:</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body p-5">
                <form onSubmit={()=>{updateProfile();}}>

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
                  <div class="form-row d-flex">
                    <div className="col w-50 mx-2">
                    <label>Profile Pic: </label>
                    <input type="file" class="form-control my-2" onChange={handlePicChange}/>
                    <button className={`btn btn-success ${uploaded? "disabled": ""}`} onClick={picUpload}>{uploaded? <i class="fa-solid fa-check"></i>:<i class="fa-solid fa-upload"></i>}</button>
                    </div>
                  </div>
                  <div class="modal-footer" style={{ marginTop: "10vmin" }}>
                    <button type="button" class="btn btn-secondary" ref={close} data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-success">Update Email</button>
                  </div>
                </form>
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
            {/* <div className="w-25 bg-primary"> */}
              <img className="w-25 rounded-3" style={{height: "25vmin"}} src={profile.pic}/>
              {/* </div> */}
            <div className="d-flex w-50 justify-content-evenly px-3">
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
        <h4 className="my-5">Academic Details: <span>{(profile.academics) ? <button className="btn btn-success mx-3" onClick={() => { addBtn.current.click() }}><i class="fa-solid fa-pen-to-square"></i></button> : null}</span></h4>
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
              <div className="d-flex flex-column head justify-content-between">
                <h6>Graduation CGPA:</h6>
                <h6>Resume:</h6>
              </div>
              <div className="d-flex flex-column ">
                <h6>{profile.academics.gradCGPA}</h6>
                <a className="btn btn-sm btn-success" href={dwnldLink}><i class="fa-solid fa-download"></i></a>
              </div>
            </div>

          </div>
        </div> : //OR

          <>
            <button className="btn btn-success w-100" onClick={() => { addBtn.current.click() }}>Add Academic Details</button>
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
