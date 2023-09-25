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
import Login from "./components/Login";
import Signup from "./components/Signup";
import AuthState from "./context/auth/AuthState";
import UserDashboard from "./components/UserDashboard";
import UserState from "./context/user/UserState";

function App() {
  return (
    <div className="App">
      <Router basename="/TnP_USICT">
      <AuthState>
      <UserState>
      <Header />
      <Routes>
        <Route exact path='/' element={< Home />}></Route>
        <Route  path='/about' element={< About />}></Route>
        <Route  path='/statistics' element={< Statistics />}></Route>
        <Route  path='/rankings' element={< Rankings />}></Route>
        <Route  path='/contact' element={< Contact />}></Route>
        <Route  path='/login' element={<Login />}></Route>
        <Route  path='/signup' element={<Signup />}></Route>
        <Route  path='/userDashboard' element={<UserDashboard />}></Route>
      </Routes>
      </UserState>
      </AuthState>
      </Router>
    <Footer />
    
    </div>
  );
}

export default App;
