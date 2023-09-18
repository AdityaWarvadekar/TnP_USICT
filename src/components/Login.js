import React, { useContext, useState } from 'react';
import "./css/login.css";
import { useNavigate } from 'react-router-dom';
import GoToTop from "./GoToTop";
import authContext from '../context/auth/authContext';
function Login(props) {
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const host = "http://localhost:5000"; //backend
    const navigate = useNavigate();

    const {state, dispatch} = useContext(authContext);

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });

        const json = await response.json();
        console.log(json);
        if(json.success){
          alert("Logged In Successfully");
          dispatch({type: "USER", payload: true});
          navigate("/");
        }
        else alert("INVALID");
    }

  // window.onunload = ()=>{
  //   localStorage.removeItem("token");
  //   return;
  // }
GoToTop();
  return (
    <>
    <div className="loginContainer">
    <div className="loginBox">
        <h1>Login:</h1>
        <small>login to access your Dashboard: </small>
        <form className="d-flex flex-column justify-content-center"
        onSubmit={handleSubmit}
        >
          <div className="form-group my-3">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control my-3"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <small id="emailHelp" className="form-text text-muted my-3">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group my-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control my-3"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <a href="/TnP_USICT/signup" className="py-3 my-3">New User? Sign Up</a>
      </div>
      </div>
    </>
  )
}

export default Login