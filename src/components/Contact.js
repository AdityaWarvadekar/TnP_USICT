import React from "react";
import ContactDetails from "./ContactDetails";
import "./css/contact.css";

//EMBEDDED MAP FROM maps.google.com

function Contact() {
  return (
    <>
      <div className="contactContainer">
        <h1 class>Contact Us</h1>
        {/* <img src={require("./images/map.jpg")} alt="" /> */}

            <iframe className="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28025.28068263449!2d77.00952195858717!3d28.594973935212078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1aafdb891567%3A0x10d270731c930a87!2sGuru%20Gobind%20Singh%20Indraprastha%20University!5e0!3m2!1sen!2sin!4v1679120351634!5m2!1sen!2sin" width="600" height="450" style={{"border":0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
 
        <h1>Our Address: </h1>
        <p className="description mb-5">
          GGSIPU, Sector-16/C <br />
          Dwarka, <br />
          New Delhi - 110078
        </p>
      </div>
      <ContactDetails />
    </>
  );
}

export default Contact;
