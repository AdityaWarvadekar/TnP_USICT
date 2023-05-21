import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Statistics from "./components/Statistics";
import Rankings from "./components/Rankings";
import Contact from "./components/Contact";
import Footer from "./components/Footer";


function App() {
  return (
    <div className="App">
      <Router basename="/TnP_USICT">
      <Header />
      <Routes>
        <Route exact path='/TnP_USICT' element={< Home />}></Route>
        <Route path='/about' element={< About />}></Route>
        <Route path='/statistics' element={< Statistics />}></Route>
        <Route path='/rankings' element={< Rankings />}></Route>
        <Route path='/contact' element={< Contact />}></Route>
      </Routes>
      </Router>
    <Footer />
    
    </div>
  );
}

export default App;
