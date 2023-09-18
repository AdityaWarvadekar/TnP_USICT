import React from "react";
import "./css/brief.css";
import GoToTop from "./GoToTop";
function Brief() {
  GoToTop();
  return (
    <>
      <div className="briefContainer">
        <div className="briefImg revealX ">
          <img src={require("./images/college.png")} alt="" />
        </div>
        <div className="d-flex flex-column briefContent">
          <p className="heading-text reveal">Message to Recruiters: </p>
          <p className=" description reveal">
            It gives us immense pleasure to extend your organization a most
            cordial invitation to the Campus Recruitment Drive for our Institute
            for the upcoming session 2023-24. At USICT, we address the need for
            talented professionals through our comprehensive and long-term
            approach to education with a highly charged and professional
            atmosphere. Our graduates are a combination of rigorous thinking,
            hard work, and fundamentals. We highly value our partnership with
            recruiters & remain committed to making your recruiting experience
            productive and positive. On behalf of the campus, we extend a warm
            welcome to your organization, to visit the campus and test our
            budding talents. We hope that firms and our students will create
            synergies & find the best match between their needs and capabilities
            for full-time as well as internship opportunities. Looking forward
            to hearing from you soon.
          </p>
        </div>
      </div>
    </>
  );
}

export default Brief;
