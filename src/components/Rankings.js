import React from "react";
import "./css/rankings.css";
import GoToTop from "./GoToTop";

function Rankings() {
  GoToTop();
  return (
    <div className="rankingsContainer">
      <div className="rankingsDesc fade-in">
        <p className="short fadeInTop">STRIVE FOR EXCELLENCE!</p>
        <h1 className="heading-text w-50">Our Rankings</h1>
        <p className="description fadeInTop mb-5">
          The University's vision is to become an internationally recognized
          center for education and research and with our efforts we fuel our
          growth towards the mission to provide students with the best career
          prospects in the global market and to equip them to become effective
          professionals. The University aims to stimulate both the hearts and
          minds of scholars, empower them to contribute to the welfare of
          society at large; train them to adopt themselves to the changing needs
          of the economy; advocate them for cultural leadership to ensure peace,
          harmony and prosperity for the society.
        </p>
      </div>
      <div className="rankContainer mb-5">

      <div className="rankCard revealX">
        <img src={require("./images/naac.png")} alt="img"></img>
        <p className="short">
          The University has been graded 'A++' by NAAC in 2023.
        </p>
      </div>
      <div className="rankCard reveal-X">
        <img src={require("./images/nirf.png")} alt="img"></img>
        <p className="short">
          The University was ranked 5th among Delhi Universities and 79th among
          Indian Universities by the National Institutional Ranking Framework
          (NIRF) in 2021.
        </p>
      </div>
      </div>
    </div>
  );
}

export default Rankings;
