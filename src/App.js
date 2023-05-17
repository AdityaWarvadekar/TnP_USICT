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
      <Router>
      <Header />
      <Routes>
        <Route exact path='/' element={< Home />}></Route>
        <Route exact path='/about' element={< About />}></Route>
        <Route exact path='/statistics' element={< Statistics />}></Route>
        <Route exact path='/rankings' element={< Rankings />}></Route>
        <Route exact path='/contact' element={< Contact />}></Route>
      </Routes>
      </Router>
    <Footer />
    
    </div>
  );
}

export default App;
