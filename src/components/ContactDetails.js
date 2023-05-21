import React from "react";

function ContactDetails() {

 

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <p className="heading-text reveal">Contact Us</p>
        <div className=" my-5 contactDetailsBox" >
          <div className = "revealX" style={{width: "20%"}}>
            <i className="fa-solid fa-location-dot"></i>
            <p className="short">Address</p>
            <p>USICT, E-109</p>
          </div>
          <div >
            <i className="fa-regular fa-envelope"></i>
            <p className="short reveal">Email</p>
            <p>usict.placementcell@ipu.ac.in</p>
            <p>students.usict.tpc@ipu.ac.in</p>
          </div>
          <div className="reveal-X" style={{width: "20%"}}>
            <i className="fa-solid fa-phone"></i>
            <p className="short">Phone</p>
            <p>+91 93501 46387</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactDetails;
