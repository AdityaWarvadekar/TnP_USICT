import { useState } from "react";
import  userContext  from "./userContext";
import { useNavigate } from "react-router-dom";

const UserState = (props) => {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const host = "http://localhost:5000";
  const loginType = localStorage.getItem("loginType");

  const getUser = async () => {
    if(localStorage.getItem("session")==="true"){
    const url =
      loginType === "student"
        ? `${host}/api/auth/getStudentDetails`
        : `${host}/api/auth/getCompanyDetails`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    // console.log(response);
    const json = await response.json();
    // console.log("JSON IS: "+ json);
    if (json.success) {
    //   console.log(json);
      if(loginType==="student")
        setUser(json.student);
      else setUser(json.company);
    } else {
      navigate("/login");
    }
  }else{
    navigate("/login");
  }

    // console.log("user: "+user.pocName);
  };

  return (
    <userContext.Provider value={{ user, getUser }}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;
