import React from "react";
import "./css/statistics.css";
import GoToTop from "./GoToTop";
function Statistics() {
  GoToTop();
  return (
    <div className="productsSection">
      <div className="productBrief d-flex flex-column align-items-center fade-in">
        <p className="short fadeInTop">PLACEMENT STATISTICS</p>
        <h1 className="fadeInLeft">A Glimpse of our 2022 Placement Session</h1>
        <p
          className="w-50 mt-5 description fadeInTop"
          style={{ marginBottom: "10vh" }}
        >
          University school of Information, Communication and Technology (USICT)
          is committed to providing professional education with thrust on
          creativity, innovation, continuous change and motivating environment
          for knowledge creation and dissemination through its effective quality
          management system.
        </p>
      </div>

      <div className="container sm text-center mt-5">
        <div className="row productImg">
          <div className="col-sm-12 col-md-6 productCard ">
            <div className="statsCard reveal-X">
              <p>HIGHEST PACKAGE</p>
              <p style={{ fontSize: "7vh", marginTop: "2vh" }}>45 LPA</p>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 productCard">
            <div className="statsCard revealX">
              <p>AVERAGE PACKAGE</p>
              <p style={{ fontSize: "7vh", marginTop: "2vh" }}>12 LPA</p>
            </div>
          </div>
          {/* <div className="col-sm-12 col-md-4 productCard reveal-X">
            <img src={require("./images/flour.jpg")} alt="" />
            <p className="description" style={{ fontWeight: "bold" }}>
              Maida
            </p>
          </div> */}
        </div>

        <div className="row productImg mb-5">
          <div className="col-sm-12 col-md-6 productCard">
            <div className="statsCard revealX">
              <p>TOTAL OFFERS</p>
              <p style={{ fontSize: "7vh", marginTop: "2vh" }}>370+</p>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 productCard">
            <div className="statsCard reveal-X">
              <p>COMPANIES VISITED</p>
              <p style={{ fontSize: "7vh", marginTop: "2vh" }}>120+</p>
            </div>
          </div>
        </div>
      </div>
      <p className="short reveal">DETAILED INSIGHTS:</p>
      <h2 className="mb-5">Placement Report 2022: </h2>
  
      <embed
      className="mb-5"
	src={require("./images/report2022.pdf")}
	type="application/pdf"
	width="80%"
	height="600"
/>
    </div>
  );
}

export default Statistics;
