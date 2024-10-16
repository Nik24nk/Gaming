import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import Tournaments from './pages/Tournaments';
import About from './pages/About';
import Contact from "./pages/Contact";
import Login from './pages/Login';
import Participate from './pages/participate';
import Add from "./pages/Add";
import { useState, useEffect } from 'react';
import Edit from './pages/Edit';
import Register from './pages/Register';
import Success from './pages/Success';




function App() {
  const [auth, setAuth] = useState(false);
  const [admin, setAdmin] = useState(false);


  useEffect(() => {
    const Auth = async () => {
      try {
        const authen = sessionStorage.getItem('Auth');
        if (authen === "logined") {
          setAdmin(false);
          setAuth(true);
        }
        else if (authen === "Admin") {
          setAdmin(true);
          setAuth(false);
        }
      } catch (error) {

        console.error("Authentication check failed", error);
      }
    };
    Auth();
  });

  return (
    <Router>
      <Routes>\

        <Route element={<Home />} path="/"></Route>
        <Route element={<Tournaments />} path="/tournaments"></Route>
        <Route element={<Contact />} path="/contact"></Route>
        <Route element={<Login />} path="/login"></Route>
        <Route element={<About />} path="/about"></Route>
        <Route element={<Participate />} path='/participate/:id'></Route>
        <Route element={<Add />} path={admin ? "/addEvent/:email" : ""}></Route>
        <Route element={<Edit />} path={admin ? "/edit/:id" : ""}></Route>
        <Route element={<Register />} path={auth ? "/register/:name/:NumMember/:fee" : ""} ></Route>
        <Route element={<Success />} path={auth ? "/success/:teamName" : ""} ></Route>

      </Routes>
    </Router>
  )
}

export default App