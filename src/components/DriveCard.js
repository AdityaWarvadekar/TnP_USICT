import React, { useRef } from 'react'

const DriveCard = (props) => {
    const detailsBtn = useRef(null);
    const drive = props.drive;
    const updateDrive = props.updateDrive;
    return (
        <>
            <div className="driveCard">
                <div className="d-flex justify-content-between align-items-center px-3">
                    <h4>{drive.orgName} Recruitment Drive: </h4>
                    <h5>{drive.driveDate.slice(0, 10)}</h5>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3">
                    <div className="d-flex w-25 justify-content-between">
                        <div className="d-flex flex-column">
                            <h6>Role:</h6>
                            <h6>Batch:</h6>
                            <h6>Branch:</h6>
                        </div>
                        <div className="d-flex flex-column">
                            <h6>{drive.jobDesignation}</h6>
                            <h6>{props.displayElements(drive.batch)}</h6>
                            <h6>{props.displayElements(drive.stream)}</h6>
                        </div>
                    </div>
                    <div className="d-flex w-25 justify-content-between">
                        <div className="d-flex flex-column">
                            <h6>Course:</h6>
                            <h6>CTC:</h6>
                            <h6>Mode:</h6>
                        </div>
                        <div className="d-flex flex-column mx-2">
                            <h6>{props.displayElements(drive.course)}</h6>
                            <h6>{drive.ctc}</h6>
                            <h6>{drive.mode}</h6>
                        </div>
                    </div>
                    <button className="btn btn-success" onClick={() => { updateDrive(drive)}}>View Details</button>
                </div>
            </div>
        </>
    )

}

export default DriveCard