import React from "react";
import "./css/headerFooter.css";

function Footer(){
    return(<>
        {/* <div style={{backgroundColor: "#4d4e50", height: "20vh", clipPath: "polygon(30% 35%, 0 100%, 100% 100%)"
}}></div> */}
        <div className="footer d-flex justify-content-around ">
            <div className="footerInfo">
                <h6>USICT, GGSIPU</h6>
                <p>Training and Placement Cell</p>
                <p>usict.placementcell@ipu.ac.in</p>
                <p>students.usict.tpc@ipu.ac.in</p>
                <a href="/" className="px-2" style={{color: "white"}}><i class="fa-brands fa-facebook"></i></a>
                <a href="/" className="px-2" style={{color: "white"}}><i class="fa-brands fa-instagram"></i></a>
                <a href="/" className="px-2" style={{color: "white"}}><i class="fa-brands fa-twitter"></i></a>
            </div>
            <div className="usefulLinks d-flex flex-column">
                <h5>USEFUL LINKS</h5>
                <a href="/contact">Contact Us</a>
                <a href="/statistics">Statistics</a>
                <a href="/about">About Us</a>
                <a href="/rankings">Rankings</a>
            </div>
            <div className="usefulLinks">
                <h5>TIMINGS:</h5>
                <p>Mon-FRI: 9.00 am - 5.00 pm</p>
                <p>Sat/Sun: Closed</p>
            </div>
        </div>
        <div className="copyright py-3" >COPYRIGHT TnP USICT</div>
        </>
    );
}


export default Footer