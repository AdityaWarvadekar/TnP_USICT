import React from "react";
import "./css/home.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Brief from "./Brief";
import ContactDetails from "./ContactDetails";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

// function for animations on scroll

function reveal() {
  var revealElements = document.querySelectorAll(".reveal");
  for (var i = 0; i < revealElements.length; i++) {
    var windowHeight = window.innerHeight; //height of window
    var elementTop = revealElements[i].getBoundingClientRect().top; //distance of element's top from window top
    var visible = 50; // element's height to be visible after
    if (elementTop < windowHeight - visible) {
      revealElements[i].classList.add("active");
    } else {
      revealElements[i].classList.remove("active");
    }
  }
}

function revealX() {
  var elements = document.querySelectorAll(".revealX");
  for (let i = 0; i < elements.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = elements[i].getBoundingClientRect().top;
    var visible = 50;
    if (elementTop < windowHeight - visible) {
      elements[i].classList.add("fadeInLeft");
    } else {
      elements[i].classList.remove("fadeInLeft");
    }
  }
}

window.addEventListener("scroll", revealX);

function revealNegX() {
  var elements = document.querySelectorAll(".reveal-X");
  for (let i = 0; i < elements.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = elements[i].getBoundingClientRect().top;
    var visible = 50;
    if (elementTop < windowHeight - visible) {
      elements[i].classList.add("fadeInRight");
    } else elements[i].classList.remove("fadeInRight");
  }
}

window.addEventListener("scroll", revealNegX);

window.addEventListener("scroll", reveal); //adding event listener to scroll

function Home() {
  return (
    <div className="home">
      <div className="banner d-flex justify-content-center align-items-center">
        <div className="typeContainer">
          <p className="typing">Training and Placement Cell, USICT</p>
        </div>
      </div>

      <div className=" d-flex align-items-center  headingContainer">
        <div className="heading fadeInLeft">
          <p className="heading-text ">
            University School of Information, Communication and Technology
          </p>
          <p className="short ">Guru Gobind Singh Indraprastha University</p>
        </div>
        <div className="description fadeInRight ">
          <p>
            USICT
            has been established to design and implement courses with a twin
            objective of generating effective professionals and keeping pace
            with the R & D activities of this fast-emerging and changing field
            of Information & Communication Technology. The school aims at skills
            demanded by the global software industry, through the learning
            process. This includes team-building skills, audio presentations and
            personality development programs. 
          </p>
          <a href="/TnP_USICT/about">
            <button className="btn btn-secondary">Read More</button>
          </a>
        </div>
      </div>

      <div className="productSlide pb-5" style={{ paddingTop: "20vh" }}>
        <p className="short revealX" >
          Glimpses of past
        </p>
        <p className="heading-text revealX" style={{ fontSize: "2rem" }}>
          Our Recruiters
        </p>
        <Carousel
          className="pt-4"
          swipeable={true}
          draggable={false}
          // showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          // keyBoardControl={true}
          // customTransition="all .5"
          // transitionDuration={1000}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          // deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          <div className="carouselCard d-flex flex-column align-items-center mt-5 ">
            <img
              alt=""
              className="carouselImg"
              src={require("./images/companies/hike.png")}
            />
            <div className="overlay mt-5">
              <div className="text">
              <p>Package Offered: 43LPA</p>
                <p>Students placed: 1</p>
              </div>
            </div>
            <p className="mt-3">Hike</p>
          </div>

          <div className="carouselCard d-flex flex-column align-items-center mt-5">
            <img
              alt=""
              className="carouselImg"
              src={require("./images/companies/amazon.png")}
            />
            <div className="overlay mt-5">
              <div className="text">
              <p>Package Offered: 44.14LPA</p>
                <p>Students placed: 6</p>
              </div>
            </div>
            <p className="mt-3">Amazon</p>
          </div>
          <div className="carouselCard d-flex flex-column align-items-center mt-5">
            <img
              alt=""
              className="carouselImg"
              src={require("./images/companies/adobe.png")}
            />
            <div className="overlay mt-5">
              <div className="text">
                <p>Package Offered: 45LPA</p>
                <p>Students placed: 1</p>
              </div>
            </div>
            <p className="mt-3">Adobe</p>
          </div>
          <div className="carouselCard d-flex flex-column align-items-center mt-5">
            <img
              alt=""
              className="carouselImg"
              src={require("./images/companies/rapido.png")}
            />
            <div className="overlay mt-5">
              <div className="text">
              <p>Package Offered: 23LPA</p>
                <p>Students placed: 9</p>
              </div>
            </div>
            <p className="mt-3">Rapido</p>
          </div>
          <div className="carouselCard d-flex flex-column align-items-center mt-5">
            <img
              alt=""
              className="carouselImg"
              src={require("./images/companies/mobikwik.png")}
            />
            <div className="overlay mt-5">
              <div className="text">
              <p>Package Offered: 14.5LPA</p>
                <p>Students placed: 9</p>
              </div>
            </div>
            <p className="mt-3">Mobikwik</p>
          </div>
          <div className="carouselCard d-flex flex-column align-items-center mt-5">
            <img
              alt=""
              className="carouselImg"
              src={require("./images/companies/tata1mg.png")}
            />
            <div className="overlay mt-5">
              <div className="text">
              <p>Package Offered: 18LPA</p>
                <p>Students placed: 5</p>
              </div>
            </div>
            <p className="mt-3">Tata 1mg</p>
          </div>
        </Carousel>
      </div>
      <Brief />
      <ContactDetails />
    </div>
  );
}

export default Home;
