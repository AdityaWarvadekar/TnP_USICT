import React from "react";
import "./css/about.css";
import GoToTop from "./GoToTop";
function About() {
  GoToTop();
  return (
    <>
      <div className="aboutContainer d-flex flex-column">
        <h1 className="under d-flex flex-column px-5 fadeInLeft">Our Vision</h1>
        <div className="aboutSection d-flex ">
          <div className="collage d-flex mb-5 p-5">
            <img
              className="img1 p-2 fadeInLeft"
              src={require("./images/officials.jpg")}
              alt=""
            />
            <div className=" imgCont fadeInRight">
              <img
                className="img2 p-2 mb-1"
                src={require("./images/college.png")}
                alt=""
              />
              <img
                className="img2 p-2 fadeInRight"
                src={require("./images/room.jpg")}
                alt=""
              />
            </div>
          </div>
          <div className="aboutContent px-5">
            <h2>USICT, GGSIPU</h2>
            <p className="description">
              The University's vision is to become an internationally recognized
              center for education and research and with our efforts we fuel our
              growth towards the mission to provide students with the best
              career prospects in the global market and to equip them to become
              effective professionals. The University aims to stimulate both the
              hearts and minds of scholars, empower them to contribute to the
              welfare of society at large; train them to adopt themselves to the
              changing needs of the economy; advocate them for cultural
              leadership to ensure peace, harmony and prosperity for the
              society.
            </p>
          </div>
        </div>

        {/* MISSION SECTION */}

        {/* <h1 className="px-5 under d-flex flex-column px-5 revealX">Our Vision</h1>

        <div className="vision d-flex p-5">
          <div className="teamImg">
            <img src={require("./images/office.jpg")} alt="" />
          </div>
          <div className="teamDesc reveal">
            <h2 className="heading-text" style={{fontSize: "2rem", fontWeight: "500"}}>Trust and Excellence</h2>
            <p className="description">
              At our flour mill, our vision is to be a leader in the industry,
              known for our commitment to quality, innovation, and
              sustainability. We strive to consistently provide our customers
              with the freshest and highest quality flour products, while
              minimizing our environmental impact through responsible sourcing
              and production methods. We aim to continuously improve our
              techniques and processes to meet the evolving needs of our
              customers and the industry, and to foster a culture of excellence
              and collaboration among our team members. Our ultimate goal is to
              be the go-to flour mill for customers seeking not only superior
              products, but also a partner who shares their values and supports
              their success.
            </p>
          </div>
        </div> */}

        {/* TEAM SECTION */}

        <h1 className="px-5 mt-5  under d-flex flex-column px-5">The Team</h1>

        <div className="team d-flex">
          <div className="teamImg">
            <img
              className="revealX"
              src={require("./images/apSir.png")}
              alt=""
            />
          </div>
          <div className="teamDesc reveal-X">
            <h2
              className="heading-text"
              style={{ fontSize: "2rem", fontWeight: "500" }}
            >
              Training and Placement Officer
            </h2>
            <p className="description">
              "Dear Recruiter, It gives me immense pleasure to invite you to
              visit the University School of Information, Communication and
              Technology (USICT) campus for the 2023-24 placement drive. As a
              result of constant endeavor by the Training and Placement Cell
              members under the guidance of the honorable Dean, the school has
              succeeded in obtaining an overwhelming response from various
              recruiters. We entrust with the highly crucial task of selecting,
              inviting and following up with the various corporates with whom
              USICT intends to place its students, be it for their summer
              training or their final placements. We look forward to
              strengthening our ties with your organization."
            </p>
          </div>
        </div>

        <div className="team d-flex mb-5">
          <div className="teamDesc revealX">
            <h2>Training and Placement Official</h2>
            <p className="description">
              Talent is the most precious thing for an organization to perform
              well. We are glad to inform you that the placement drive at USICT,
              GGSIPU has begun. Our institution hosts many young and talented
              minds, ready to work and contribute to your organization and take
              it to new heights with their enthusiasm. I would like to invite
              you to hold a placement recruitment drive at our institute and
              harness the talent of our students.
            </p>
          </div>
          <div className="teamImg">
            <img
              className="reveal-X"
              src={require("./images/rajeevSir.png")}
              alt=""
            />
          </div>
        </div>

        <h1 className="px-5 mt-5  under" style={{textDecoration: "underline"}}>Placement Coordinators</h1>
        <img
              className="reveal w-100"
              src={require("./images/coordinators.png")}
              alt=""
            />
      </div>
    </>
  );
}

export default About;
