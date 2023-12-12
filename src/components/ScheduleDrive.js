import React, { useEffect, useRef, useState } from 'react'
import { useAsyncError, useNavigate } from 'react-router-dom'
import "./css/login.css";

import DatePicker from "react-datepicker";
// import DatePicker from 'react-datepicker/dist/react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


const ScheduleDrive = () => {
    const host = "http://localhost:5000"; //backend
    const navigate = useNavigate();
    const loginType = localStorage.getItem("loginType");
    const session = localStorage.getItem("session");
    if (session === "true" && loginType !== "company")
        navigate("/");

    //GETTING THE COMPANY INFO FOR FILE NAME

    const [credentials, setCredentials] = useState(null);

    async function getCompany() {
        const response = await fetch(`${host}/api/auth/getCompanyDetails`, {
            method: "GET",
            headers: { "auth-token": localStorage.getItem("token") }
        });
        const json = await response.json();
        console.log("company: ", json.company);
        if (json.success)
            setCredentials({ name: json.company.orgName, email: json.company.email });
        else
            console.log("ERROR", json.error);
    }
    useEffect(() => {
        getCompany();
    }, [])
    //Creating a filePath for S3
    const [file, setFile] = useState(null);
    const [filePath, setFilePath] = useState(null);
    const [putUrl, setPutUrl] = useState(null);

    useEffect(()=>{
        console.log("FilePath: "+ filePath);
    if (filePath)
        generatePutURL();
    }, [filePath]);

    // useEffect(()=>{
    const generatePutURL = async () => {
        const response = await fetch(`${host}/api/company/getPutObjectUrl`, {
            method: "GET",
            headers: {
                filePath:  filePath ,
                contentType: "multipart/form-data"
            }
        });
        const json = await response.json();
        if (json.success) {
            setPutUrl(json.url);
        } else {
            console.log(json.error);
        }

    }
    // generatePutURL();
    // }, [])


    const handleUploadChange = async (e) => {
        if (e.target.files[0] && credentials.name) {
            setFile(e.target.files[0]);
            let gotFile = e.target.files[0].name;
            setFilePath(`company/${credentials.name}/${credentials.email}/${gotFile}`);
        }
        else {
            setFilePath(null);
            setPutUrl(null);
            setFile(null);
            console.log("HATTATATATTATTTTT in ScheduleDrive.js");
        }
    }


    const onresponseFieldChange = (e) => {
        setResponseField({ ...responseField, [e.target.name]: e.target.value });
    }

    const [joiningDate, setJoiningDate] = useState(null);

    let date = new Date();
    date.setDate(date.getDate() + 5);

    const [driveDate, setDriveDate] = useState(null);

    const [eligibleCourse, setEligibleCourse] = useState([]);

    const [eligibleStream, setEligibleStream] = useState([]);

    const [eligibleBatch, setEligibleBatch] = useState([]);

    const [mode, setMode] = useState("");


    const [responseField, setResponseField] = useState({
        brief: "",
        jobDesignation: "",
        jobDescription: "",
        jobLocation: "",
        ctc: "",
        bond: "",
        numberOfRounds: "",
        roundDescription: ""
    });

    const cseRef = useRef(null);
    const itRef = useRef(null);
    const eceRef = useRef(null);
    const rnaRef = useRef(null);
    const seRef = useRef(null);
    const mtechRef = useRef(null);

    const addList = (e, array, setArray) => {
        let List = [...array];
        if (e.target.checked) {
            // if (e.target.value === "B.Tech") {
            //     document.getElementById("CSE").disabled = false;
            //     document.getElementById("IT").disabled = false;
            //     document.getElementById("ECE").disabled = false;
            // }
            // else if (e.target.value === "MCA") {
            //     document.getElementById("SE").disabled = false;
            // }
            // else if (e.target.value === "M.Tech") {
            //     document.getElementById("CSE").disabled = false;
            //     document.getElementById("IT").disabled = false;
            //     document.getElementById("ECE").disabled = false;
            //     document.getElementById("RnA").disabled = false;
            // }

            // console.log(e.target.value);
            List = [...array, e.target.value];
        }
        else {
            // if (e.target.value === "B.Tech") {
            //     if (mtechRef.current.checked) {
            //         cseRef.current.disabled = true;
            //         itRef.current.disabled = true;
            //         eceRef.current.disabled = true;
            //     }
            // }
            // else if (e.target.value === "MCA") {
            //     document.getElementById("SE").disabled = true;
            // }
            // else if (e.target.value === "M.Tech") {
            //     if (!document.getElementById("btech").checked) {
            //         document.getElementById("CSE").disabled = true;
            //         document.getElementById("IT").disabled = true;
            //         document.getElementById("ECE").disabled = true;

            //     }
            //     document.getElementById("RnA").disabled = true;
            // }
            List.splice(array.indexOf(e.target.value), 1);
        }
        setArray(List);
    }



    const handleFormSubmit = async (e) => {
        let uploadStatus=404;
        e.preventDefault();
        if (localStorage.getItem("session") === "false"){
            alert("Session Expired! Please Login again");
            navigate("/login");
        }
        else {
            // console.log("URL WILL BE: ", putUrl);
            try{
            const uploadResponse = await fetch(`${putUrl}`, {
                method: "PUT",
                headers: {
                    "content-type": "multipart/form-data"
                },
                body: file
            });

            uploadStatus = uploadResponse.status;
            console.log("response", uploadStatus);
        }catch(error){
            console.log("ERRRRRROROROROROOOORRRRRRRR:", error);
            alert("Internal Server Error. Please Refresh");
        }
        if(uploadStatus===200){
            const response = await fetch(`${host}/api/company/scheduleDrive`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify({
                    brief: responseField.brief,
                    jobDesignation: responseField.jobDesignation,
                    jobDescription: responseField.jobDescription,
                    jobLocation: responseField.jobLocation,
                    joiningDate: joiningDate,
                    otherDocument: filePath,
                    ctc: responseField.ctc,
                    bond: responseField.bond,
                    numberOfRounds: responseField.numberOfRounds,
                    roundDescription: responseField.roundDescription,
                    course: eligibleCourse,
                    stream: eligibleStream,
                    batch: eligibleBatch,
                    driveDate: driveDate,
                    mode: mode,
                })
            });
            const json = await response.json();
            console.log(json);
            if (json.success) {
                alert("Drive Scheduled Successfully!");
                navigate("/userDashboard");
            } else {
                if (json.error) {
                    alert(json.error);
                    console.log(json.error);
                }
                else {
                    const error = json.errors[0];
                    console.log(error);
                    alert(error.path + " : " + error.msg);
                }
            }
        }
        else alert("No Document Attached! ");
        }
    }
    return (
        <>
            {/* <h1 style={{marginTop: "10%"}}>Schedule a Drive: </h1> */}
            <div class="container" style={{ paddingTop: "30vmin" }}>
                <h1>Schedule a Drive: </h1>
                <form onSubmit={handleFormSubmit} className='formBox'>
                    <div className="d-flex flex-wrap">
                        <div class="form-group w-50 p-2 my-3">
                            <label for="exampleInputEmail1">Brief:</label>
                            <textarea type="text" class="form-control" name="brief" onChange={onresponseFieldChange} rows="2" placeholder="Brief Description about company" />
                        </div>
                        <div class="form-group w-50 p-2 my-3">
                            <label for="exampleInputEmail1">Location:</label>
                            <input type="text" class="form-control" name="jobLocation" onChange={onresponseFieldChange} placeholder="Joining Location" />
                        </div>
                        <div class="form-group w-50 p-2 my-3">
                            <label for="exampleInputEmail1">Job Description:</label>
                            <textarea type="text" class="form-control" name="jobDescription" onChange={onresponseFieldChange} rows="2" placeholder="Mention Responsibilities etc." />
                        </div>
                        <div class="form-group w-50 p-2 my-3">
                            <label for="exampleInputEmail1">Job Designation:</label>
                            <input type="text" class="form-control" name="jobDesignation" onChange={onresponseFieldChange} placeholder="Job Designation" />
                        </div>
                        <div class="form-group w-50 py-5 px-2">
                            <label for="exampleInputEmail1">Joining Date:</label>
                            <DatePicker className="mx-5" dateFormat="dd/MM/yyyy" minDate={new Date()} selected={joiningDate} showYearDropdown scrollableYearDropdown onChange={(date) => { setJoiningDate(date) }} />
                        </div>
                        <div class="form-group w-50 p-2 my-3">
                            <label for="exampleInputEmail1">Relevant Document:</label>
                            <input type="file" class="form-control" name="otherDocument" onChange={handleUploadChange} placeholder="" />
                        </div>
                        <div class="form-group w-50 p-2 my-3">
                            <label for="exampleInputEmail1">CTC:</label>
                            <input type="text" class="form-control" name="ctc" onChange={onresponseFieldChange} placeholder="Enter CTC in LPA" />
                        </div>
                        <div class="form-group w-50 p-2 my-3">
                            <label for="exampleInputEmail1">Bond:</label>
                            <input type="text" class="form-control" name="bond" onChange={onresponseFieldChange} placeholder="Years" />
                        </div>
                        <div class="form-group w-50 p-2 my-3">
                            <label for="exampleInputEmail1">Number of Rounds:</label>
                            <input type="text" class="form-control" name="numberOfRounds" onChange={onresponseFieldChange} placeholder="1" />
                        </div>
                        <div class="form-group w-50 p-2 my-3">
                            <label for="exampleInputEmail1">Rounds Description:</label>
                            <textarea type="text" class="form-control" name="roundDescription" onChange={onresponseFieldChange} placeholder="Describe the Process" />
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
                                <input class="form-check-input" type="checkbox" value="M.Tech" ref={mtechRef} onChange={(e) => addList(e, eligibleCourse, setEligibleCourse)} />
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
                                <input class="form-check-input btechOption"  type="checkbox" value="CSE" ref={cseRef} onChange={(e) => addList(e, eligibleStream, setEligibleStream)} />
                                <label class="form-check-label " for="">
                                    CSE
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input btechOption"  type="checkbox" value="IT" ref={itRef} onChange={(e) => addList(e, eligibleStream, setEligibleStream)} />
                                <label class="form-check-label " for="">
                                    IT
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input btechOption"  type="checkbox" value="ECE" ref={eceRef} onChange={(e) => addList(e, eligibleStream, setEligibleStream)} />
                                <label class="form-check-label " for="">
                                    ECE
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox"  value="SE" ref={seRef} onChange={(e) => addList(e, eligibleStream, setEligibleStream)} />
                                <label class="form-check-label" for="">
                                    SE
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox"  value="RnA" ref={rnaRef} onChange={(e) => addList(e, eligibleStream, setEligibleStream)} />
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
                            <DatePicker className="mx-5" dateFormat="dd/MM/yyyy" minDate={date} showYearDropdown scrollableYearDropdown selected={driveDate} onChange={(d) => { setDriveDate(d) }} />
                        </div>
                        <label for="" className='p-2' style={{ "marginRight": "7vmin" }}>Drive Mode:</label>


                        <div class="form-check m-2">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={() => { setMode("Offline") }} />
                            <label class="form-check-label" for="flexRadioDefault1">
                                Offline
                            </label>
                        </div>
                        <div class="form-check m-2">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={() => { setMode("Online") }} />
                            <label class="form-check-label" for="flexRadioDefault2">
                                Online
                            </label>
                        </div>
                        <div class="form-check m-2">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" onChange={() => { setMode("Hybrid") }} />
                            <label class="form-check-label" for="flexRadioDefault3">
                                Hybrid
                            </label>
                        </div>

                    </div>
                    <button type="submit" class="btn btn-primary my-5" style={{ "marginLeft": "45%" }}>Submit</button>
                </form>
            </div>
        </>
    )
}

export default ScheduleDrive