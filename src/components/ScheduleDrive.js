import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./css/login.css";


const ScheduleDrive = () => {
    const navigate = useNavigate();
    const loginType = localStorage.getItem("loginType");
    const session = localStorage.getItem("session");
    if (session === "true" && loginType !== "company")
        navigate("/");

    const [response, setResponse] = useState({
        brief: "",
        jobDesignation: "",
        jobDescription: "",
        jobLocation: "",
        joiningDate: "",
        otherDocument: "",
        ctc: "",
        bond: "",
        numberOfRounds: "",
        roundDescription: "",
        course: [],
        stream: [],
        batch: [],
        driveDate: "",
        mode: ""
    });

    const onResponseChange = (e) => {
        setResponse({ ...response, [e.target.name]: e.target.value });
    }


    return (
        <>
            {/* <h1 style={{marginTop: "10%"}}>Schedule a Drive: </h1> */}
            <div class="container" style={{ paddingTop: "30vmin" }}>
                <h1>Schedule a Drive: </h1>
                <form className='formBox'>
                    <div className="d-flex flex-wrap">
                        <div class="form-group w-50 p-2">
                            <label for="exampleInputEmail1">Brief:</label>
                            <textarea type="text" class="form-control" onChange={onResponseChange} rows="2" placeholder="Brief Description about company" />
                        </div>
                        <div class="form-group w-50 p-2">
                            <label for="exampleInputEmail1">Location:</label>
                            <input type="text" class="form-control" onChange={onResponseChange} placeholder="Joining Location" />
                        </div>
                        <div class="form-group w-50 p-2">
                            <label for="exampleInputEmail1">Joining Date:</label>
                            <input type="text" class="form-control" onChange={onResponseChange} placeholder="" />
                        </div>
                        <div class="form-group w-50 p-2">
                            <label for="exampleInputEmail1">Relevant Document:</label>
                            <input type="text" class="form-control" onChange={onResponseChange} placeholder="" />
                        </div>
                        <div class="form-group w-50 p-2">
                            <label for="exampleInputEmail1">CTC:</label>
                            <input type="text" class="form-control" onChange={onResponseChange} placeholder="Enter CTC in LPA" />
                        </div>
                        <div class="form-group w-50 p-2">
                            <label for="exampleInputEmail1">Bond:</label>
                            <input type="text" class="form-control" onChange={onResponseChange} placeholder="Years" />
                        </div>
                        <div class="form-group w-50 p-2">
                            <label for="exampleInputEmail1">Number of Rounds:</label>
                            <input type="text" class="form-control" onChange={onResponseChange} placeholder="1" />
                        </div>
                        <div class="form-group w-50 p-2">
                            <label for="exampleInputEmail1">Rounds Description:</label>
                            <textarea type="text" class="form-control" onChange={onResponseChange} placeholder="Describe the Process" />
                        </div>
                        <div class="form-group w-50 p-2">
                            <label for="exampleInputEmail1">Eligible Courses:</label>
                            <input type="text" class="form-control" onChange={onResponseChange} placeholder="" />
                        </div>
                        <div class="form-group w-50 p-2">
                            <label for="exampleInputEmail1">Eligible Streams:</label>
                            <input type="text" class="form-control" onChange={onResponseChange} placeholder="" />
                        </div>
                        <div class="form-group w-50 p-2">
                            <label for="exampleInputEmail1">Eligible Batches:</label>
                            <input type="text" class="form-control" onChange={onResponseChange} placeholder="" />
                        </div>
                        <div class="form-group w-50 p-2">
                            <label for="exampleInputEmail1">Date of Drive:</label>
                            <input type="text" class="form-control" onChange={onResponseChange} placeholder="" />
                        </div>
                        <div class="form-group w-50 p-2">
                            <label for="exampleInputEmail1">Mode of Drive:</label>
                            <input type="text" class="form-control" onChange={onResponseChange} placeholder="" />
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default ScheduleDrive