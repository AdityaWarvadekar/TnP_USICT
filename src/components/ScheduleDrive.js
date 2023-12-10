import React, { useEffect, useState } from 'react'
import { useAsyncError, useNavigate } from 'react-router-dom'
import "./css/login.css";
import DatePicker from "react-datepicker";
// import DatePicker from 'react-datepicker/dist/react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


const ScheduleDrive = () => {
    const navigate = useNavigate();
    const loginType = localStorage.getItem("loginType");
    const session = localStorage.getItem("session");
    if (session === "true" && loginType !== "company")
        navigate("/");

    const onResponseChange = (e) => {
        setResponse({ ...response, [e.target.name]: e.target.value });
    }

    const [joiningDate, setJoiningDate] = useState(null);

    let date = new Date();
    date.setDate(date.getDate() + 5);

    const [driveDate, setDriveDate] = useState(null);

    const [eligibleCourse, setEligibleCourse] = useState([]);

    const [eligibleStream, setEligibleStream] = useState([]);

    const [eligibleBatch, setEligibleBatch] = useState([]);

    const [mode, setMode] = useState("");


    const [response, setResponse] = useState({
        brief: "",
        jobDesignation: "",
        jobDescription: "",
        jobLocation: "",
        otherDocument: "",
        ctc: "",
        bond: "",
        numberOfRounds: "",
        roundDescription: ""
    });

    const addList = (e, array, setArray) => {
        let List = [...array];
        if (e.target.checked) {
            if (e.target.value === "B.Tech") {
                document.getElementById("CSE").disabled = false;
                document.getElementById("IT").disabled = false;
                document.getElementById("ECE").disabled = false;
            }
            else if (e.target.value === "MCA") {
                document.getElementById("SE").disabled = false;
            }
            else if (e.target.value === "M.Tech") {
                document.getElementById("CSE").disabled = false;
                document.getElementById("IT").disabled = false;
                document.getElementById("ECE").disabled = false;
                document.getElementById("RnA").disabled = false;
            }

            // console.log(e.target.value);
            List = [...array, e.target.value];
        }
        else {
            if (e.target.value === "B.Tech") {
                if (!document.getElementById("mtech").checked) {
                    document.getElementById("CSE").disabled = true;
                    document.getElementById("IT").disabled = true;
                    document.getElementById("ECE").disabled = true;
                }
            }
            else if (e.target.value === "MCA") {
                document.getElementById("SE").disabled = true;
            }
            else if (e.target.value === "M.Tech") {
                if (!document.getElementById("btech").checked) {
                    document.getElementById("CSE").disabled = true;
                    document.getElementById("IT").disabled = true;
                    document.getElementById("ECE").disabled = true;

                }
                document.getElementById("RnA").disabled = true;
            }
            List.splice(array.indexOf(e.target.value), 1);
        }
        setArray(List);
    }

    const handleUploadChange = async (e)=>{
        if(e.target.files){
            const file = e.target.files[0];
            const fileLink = URL.createObjectURL(file);
            setResponse({...response, [e.target.name]: file});
            console.log("DOONONONONEEEE", file);
        }
        else console.log("HATTATATATTATTTTT");
    }


    return (
        <>
            {/* <h1 style={{marginTop: "10%"}}>Schedule a Drive: </h1> */}
            <div class="container" style={{ paddingTop: "30vmin" }}>
                <h1>Schedule a Drive: </h1>
                <form className='formBox'>
                    <div className="d-flex flex-wrap">
                        <div class="form-group w-50 p-2 my-3">
                            <label for="exampleInputEmail1">Brief:</label>
                            <textarea type="text" class="form-control" name="brief" onChange={onResponseChange} rows="2" placeholder="Brief Description about company" />
                        </div>
                        <div class="form-group w-50 p-2 my-3">
                            <label for="exampleInputEmail1">Location:</label>
                            <input type="text" class="form-control" name="jobLocation" onChange={onResponseChange} placeholder="Joining Location" />
                        </div>
                        <div class="form-group w-50 p-2 my-3">
                            <label for="exampleInputEmail1">Job Description:</label>
                            <textarea type="text" class="form-control" name="jobDescription" onChange={onResponseChange} rows="2" placeholder="Mention Responsibilities etc." />
                        </div>
                        <div class="form-group w-50 p-2 my-3">
                            <label for="exampleInputEmail1">Job Designation:</label>
                            <input type="text" class="form-control" name="jobDesignation" onChange={onResponseChange} placeholder="Job Designation" />
                        </div>
                        <div class="form-group w-50 py-5 px-2">
                            <label for="exampleInputEmail1">Joining Date:</label>
                            <DatePicker className="mx-5" dateFormat="dd/MM/yyyy" minDate={new Date()} selected={joiningDate} showYearDropdown scrollableYearDropdown  onChange={(date) =>{ setJoiningDate(date)}} />
                        </div>
                        <div class="form-group w-50 p-2 my-3">
                            <label for="exampleInputEmail1">Relevant Document:</label>
                            <input type="file" class="form-control" name="otherDocument" onChange={handleUploadChange} placeholder="" />
                        </div>
                        <div class="form-group w-50 p-2 my-3">
                            <label for="exampleInputEmail1">CTC:</label>
                            <input type="text" class="form-control" name="ctc" onChange={onResponseChange} placeholder="Enter CTC in LPA" />
                        </div>
                        <div class="form-group w-50 p-2 my-3">
                            <label for="exampleInputEmail1">Bond:</label>
                            <input type="text" class="form-control" name="bond" onChange={onResponseChange} placeholder="Years" />
                        </div>
                        <div class="form-group w-50 p-2 my-3">
                            <label for="exampleInputEmail1">Number of Rounds:</label>
                            <input type="text" class="form-control" name="numberOfRounds" onChange={onResponseChange} placeholder="1" />
                        </div>
                        <div class="form-group w-50 p-2 my-3">
                            <label for="exampleInputEmail1">Rounds Description:</label>
                            <textarea type="text" class="form-control" name="roundDescription" onChange={onResponseChange} placeholder="Describe the Process" />
                        </div>


                        <div class="form-group w-50 p-2 my-3">
                            <label for="exampleInputEmail1" style={{ "marginRight": "4vmin" }}>Eligible Courses:</label>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" value="B.Tech" id="btech" onChange={(e) => addList(e, eligibleCourse, setEligibleCourse)} />
                                <label class="form-check-label" for="">
                                    B.Tech
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" value="M.Tech" id="mtech" onChange={(e) => addList(e, eligibleCourse, setEligibleCourse)} />
                                <label class="form-check-label" for="">
                                    M.Tech
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" value="MCA" id="mca" onChange={(e) => addList(e, eligibleCourse, setEligibleCourse)} />
                                <label class="form-check-label" for="">
                                    MCA
                                </label>
                            </div>
                        </div>


                        <div class="form-group w-50 p-2 my-3">
                            <label for="exampleInputEmail1" style={{ "marginRight": "4vmin" }}>Eligible Streams:</label>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input btechOption" disabled type="checkbox" value="CSE" id="CSE" onChange={(e) => addList(e, eligibleStream, setEligibleStream)} />
                                <label class="form-check-label " for="">
                                    CSE
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input btechOption" disabled type="checkbox" value="IT" id="IT" onChange={(e) => addList(e, eligibleStream, setEligibleStream)} />
                                <label class="form-check-label " for="">
                                    IT
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input btechOption" disabled type="checkbox" value="ECE" id="ECE" onChange={(e) => addList(e, eligibleStream, setEligibleStream)} />
                                <label class="form-check-label " for="">
                                    ECE
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" disabled value="SE" id="SE" onChange={(e) => addList(e, eligibleStream, setEligibleStream)} />
                                <label class="form-check-label" for="">
                                    SE
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" disabled value="RnA" id="RnA" onChange={(e) => addList(e, eligibleStream, setEligibleStream)} />
                                <label class="form-check-label" for="">
                                    RnA
                                </label>
                            </div>
                        </div>


                        <div class="form-group w-50 p-2 my-3">
                            <label for="exampleInputEmail1" style={{ "marginRight": "4vmin" }}>Eligible Batches:</label>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" value="2024" id="2024" onChange={(e) => addList(e, eligibleBatch, setEligibleBatch)} />
                                <label class="form-check-label " for="">
                                    2024
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" value="2025" id="2025" onChange={(e) => addList(e, eligibleBatch, setEligibleBatch)} />
                                <label class="form-check-label " for="">
                                    2025
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" value="2026" id="2026" onChange={(e) => addList(e, eligibleBatch, setEligibleBatch)} />
                                <label class="form-check-label " for="">
                                    2026
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" value="2027" id="2027" onChange={(e) => addList(e, eligibleBatch, setEligibleBatch)} />
                                <label class="form-check-label" for="">
                                    2027
                                </label>
                            </div>

                        </div>

                        <div class="form-group w-50 py-4 px-2">
                            <label for="exampleInputEmail1">Date of Drive:</label>
                            <DatePicker className="mx-5" dateFormat="dd/MM/yyyy" minDate={date} showYearDropdown scrollableYearDropdown selected={driveDate}  onChange={(d) => {setDriveDate(d)}} />
                        </div>
                        <label for="" className='p-2' style={{"marginRight":"7vmin"}}>Drive Mode:</label>
                       

                        <div class="form-check m-2">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={()=>{setMode("Offline")}}/>
                                <label class="form-check-label" for="flexRadioDefault1">
                                   Offline
                                </label>
                        </div>
                        <div class="form-check m-2">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={()=>{setMode("Online")}}/>
                                <label class="form-check-label" for="flexRadioDefault2">
                                    Online
                                </label>
                        </div>
                        <div class="form-check m-2">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" onChange={()=>{setMode("Hybrid")}}/>
                                <label class="form-check-label" for="flexRadioDefault3">
                                    Hybrid
                                </label>
                        </div>

                    </div>
                    <button type="submit" class="btn btn-primary my-5" style={{"marginLeft": "45%"}}>Submit</button>
                </form>
            </div>
        </>
    )
}

export default ScheduleDrive