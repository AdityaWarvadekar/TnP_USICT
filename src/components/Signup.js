import React, { useState } from "react";
import "./css/login.css";
import { useNavigate } from "react-router-dom";
// import "./css/headerFooter.css"

function Signup() {
  const navigate = useNavigate();
  const host = "http://localhost:5000"; //backend

  function switchSection() {
    document.getElementById("companybtn").classList.toggle("active");
    document.getElementById("studentbtn").classList.toggle("active");
    document.getElementById("studentSection").classList.toggle("d-none");
    document.getElementById("companySection").classList.toggle("d-none");
  }

  const [studentCredentials, setStudentCredentials] = useState({
    enrollment: "",
    name: "",
    email: "",
    course: "",
    branch: "",
    yop: "",
    password: "",
    cnfrmpwd: "",
  });
  const [companyCredentials, setCompanyCredentials] = useState({
    orgName: "",
    sector: "",
    location: "",
    pocName: " ",
    pocDesignation: "",
    contact: "",
    email: "",
    password: "",
    cnfrmpwd: "",
  });

  const onChangeStudent = (e) => {
    setStudentCredentials({
      ...studentCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeCompany = (e) => {
    setCompanyCredentials({
      ...companyCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitStudent = async (e) => {
    e.preventDefault();
    if (studentCredentials.password !== studentCredentials.cnfrmpwd)
      alert("Passwords don't match!");
    else {
      const response = await fetch(`${host}/api/auth/createStudent`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          enrollment: studentCredentials.enrollment,
          name: studentCredentials.name,
          email: studentCredentials.email,
          course: studentCredentials.course,
          branch: studentCredentials.branch,
          yop: studentCredentials.yop,
          password: studentCredentials.password,
        }),
      });

      const json = await response.json();
      console.log(json);
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        alert("Signed Up Successfully");
        navigate("/");
      } else {
        if (json.error) {
          alert(json.error);
          console.log(json.error);
        }
        else{
        const error = json.errors[0];
        console.log(error);
        alert(error.path + " : " + error.msg);
      }
      }
    }
  };

  const handleSubmitCompany = async (e) => {
    e.preventDefault();
    if (companyCredentials.password !== companyCredentials.cnfrmpwd)
      alert("Passwords don't match!");
    else {
      const response = await fetch(`${host}/api/auth/createCompanyUser`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          orgName: companyCredentials.orgName,
          sector: companyCredentials.sector,
          location: companyCredentials.location,
          pocName: companyCredentials.pocName,
          pocDesignation: companyCredentials.pocDesignation,
          contact: companyCredentials.contact,
          email: companyCredentials.email,
          password: companyCredentials.password,
        }),
      });

      const json = await response.json();
      console.log(json);
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        alert("Signed Up Successfully!");
        navigate("/");
      } else {
        if (json.error) alert(json.error);
        console.log(json.errors);
        const error = json.errors[0];
        alert(error.path + " : " + error.msg);
      }
    }
  };

  return (
    <>
      <div className="signupContainer">
        <div className="signupBox">
          <h1>Sign Up:</h1>
          <short>Sign Up to get Placement Updates </short>
          <div className="signupOptions">
            <button
              className="btn active my-5"
              id="studentbtn"
              onClick={switchSection}
            >
              Student
            </button>
            <button
              className="btn my-5"
              id="companybtn"
              onClick={switchSection}
            >
              Company
            </button>
          </div>

          <form
            className="studentForm"
            id="studentSection"
            onSubmit={handleSubmitStudent}
          >
            <div className="leftSide">
              <div className="form-group">
                <label htmlFor="enrollmentNo">Enrollment No.</label>
                <input
                  type="number"
                  className="form-control my-3 "
                  id="enrollmentNo"
                  aria-describedby="emailHelp"
                  placeholder="Enter 11 digit Enrollment Number"
                  name="enrollment"
                  value={studentCredentials.enrollment}
                  onChange={onChangeStudent}
                />
                {/* <small id="emailHelp" className="form-text text-muted my-3">
                  We'll never share your email with anyone else.
                </small> */}
              </div>
              <div className="form-group my-3">
                <label htmlFor="nameField">Name</label>
                <input
                  type="text"
                  className="form-control my-3 "
                  id="nameField"
                  placeholder="Full Name"
                  name="name"
                  value={studentCredentials.name}
                  onChange={onChangeStudent}
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="courseEntry">Course</label>
                <select
                  type="text"
                  className="form-control my-3 "
                  id="courseEntry"
                  placeholder="BTech/MTech/MCA"
                  name="course"
                  // value={studentCredentials.course}
                  onChange={onChangeStudent}
                >
                  <option value="--SELECT--" selected>--SELECT--</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="MCA">MCA</option>
                </select>
              </div>
              <div className="form-group my-3">
                <label htmlFor="branchEntry">Branch</label>
                <select
                  type="text"
                  className="form-control my-3 "
                  id="branchEntry"
                  placeholder="CSE/ECE/IT/SE/RnA"
                  name="branch"
                  // value={studentCredentials.branch}
                  onChange={onChangeStudent}
                >
                  <option value="--SELECT--" selected>--SELECT--</option>
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="SE">SE</option>
                  <option value="RnA">RnA</option>
                </select>
              </div>

              <div className="form-group my-3">
                <label htmlFor="yopEntry">Year Of Passing</label>
                <select
                  type="number"
                  className="form-control my-3 "
                  id="yopEntry"
                  placeholder="Eg:2025"
                  name="yop"
                  // value={studentCredentials.yop}
                  onChange={onChangeStudent}
                >
                  <option value="--SELECT--" selected>--SELECT--</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                </select>
              </div>
            </div>
            {/* END LEFT SIDE */}

            <div className="rightSide">
              <div className="form-group my-3">
                <label htmlFor="emailID">Email address</label>
                <input
                  type="email"
                  className="form-control my-3 "
                  id="emailID"
                  placeholder="email"
                  name="email"
                  value={studentCredentials.email}
                  onChange={onChangeStudent}
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="pword">Password</label>
                <input
                  type="password"
                  className="form-control my-3 "
                  id="pword"
                  placeholder="Password"
                  name="password"
                  value={studentCredentials.password}
                  onChange={onChangeStudent}
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="cnfrmpword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control my-3 "
                  id="cnfrmpword"
                  placeholder="Confirm Password"
                  name="cnfrmpwd"
                  value={studentCredentials.cnfrmpwd}
                  onChange={onChangeStudent}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Signup
              </button>
            </div>
            {/* END RIGHT SIDE */}
          </form>

          {/* COMPANY FORM */}

          <form
            className="studentForm d-none"
            id="companySection"
            onSubmit={handleSubmitCompany}
          >
            <div className="leftSide">
              <div className="form-group my-3">
                <label htmlFor="orgNameEntry">Organisation Name</label>
                <input
                  type="text"
                  className="form-control my-3 "
                  id="orgNameentry"
                  aria-describedby="emailHelp"
                  placeholder="Enter Organisation Name"
                  name="orgName"
                  value={companyCredentials.orgName}
                  onChange={onChangeCompany}
                />
                {/* <small id="emailHelp" className="form-text text-muted my-3">
                  We'll never share your email with anyone else.
                </small> */}
              </div>
              <div className="form-group my-3">
                <label htmlFor="sectorEntry">Sector</label>
                <input
                  type="text"
                  className="form-control my-3 "
                  id="sectorEntry"
                  placeholder="IT/CORE/Other"
                  name="sector"
                  value={companyCredentials.sector}
                  onChange={onChangeCompany}
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control my-3 "
                  id="address"
                  placeholder="Full Address"
                  name="location"
                  value={companyCredentials.location}
                  onChange={onChangeCompany}
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="pocNameEntry">POC Name</label>
                <input
                  type="text"
                  className="form-control my-3 "
                  id="pocNameEntry"
                  placeholder="Full Name"
                  name="pocName"
                  value={companyCredentials.pocName}
                  onChange={onChangeCompany}
                />
              </div>

              <div className="form-group my-3">
                <label htmlFor="pocDesig">POC Designation</label>
                <input
                  type="text"
                  className="form-control my-3 "
                  id="pocDesig"
                  placeholder="HR/TA/Other"
                  name="pocDesignation"
                  value={companyCredentials.pocDesignation}
                  onChange={onChangeCompany}
                />
              </div>
            </div>
            {/* END LEFT SIDE */}

            <div className="rightSide">
              <div className="form-group my-3">
                <label htmlFor="contactNo">Contact No.</label>
                <input
                  type="number"
                  className="form-control my-3 "
                  id="contactNo"
                  placeholder="Enter 10 digit number"
                  name="contact"
                  value={companyCredentials.contact}
                  onChange={onChangeCompany}
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="emailID">Email address</label>
                <input
                  type="email"
                  className="form-control my-3 "
                  id="emailID"
                  placeholder="email"
                  name="email"
                  value={companyCredentials.email}
                  onChange={onChangeCompany}
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="pword">Password</label>
                <input
                  type="password"
                  className="form-control my-3 "
                  id="pword"
                  placeholder="Password"
                  name="password"
                  value={companyCredentials.password}
                  onChange={onChangeCompany}
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="cnfrmpword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control my-3 "
                  id="cnfrmpword"
                  placeholder="Confirm Password"
                  name="cnfrmpwd"
                  value={companyCredentials.cnfrmpwd}
                  onChange={onChangeCompany}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            {/* END RIGHT SIDE */}
          </form>
          <a href="/TnP_USICT/login" className="py-3 my-3">
            Already a User? Login
          </a>
        </div>
      </div>
    </>
  );
}

export default Signup;
