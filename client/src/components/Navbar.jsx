import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Login from "../pages/Login"; // Import the Login component
import Profile from './Profile';
import axios from "axios"
import logo from "./logo.png"





function Navbar() {
    const [sticky, setSticky] = useState(false);
    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [Email, setEmail] = useState("");

    useEffect(() => {
        try {
            const authemail = JSON.parse(sessionStorage.getItem('Authemail'));
            setEmail(authemail);
        }
        catch (error) {
            console.log("no admin email")
        }
    })




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
    }); // Add empty dependency array to run once on mount

    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    // console.log(Email)

    function logout() {
        sessionStorage.removeItem('Auth');
        sessionStorage.removeItem('Authemail')
        sessionStorage.removeItem('email')

        console.log('User data removed from local storage');
        window.location.href = "/";
        // toast.success("logout success")
    }

    // function please() {
    //     toast.error("Please Register or Login First!")
    // }

    const navItem = (
        <>
            <li><Link to='/' className="text-white hover:text-red-500">Home</Link></li>
            <li><Link to="/tournaments" className="text-white hover:text-red-500">Tournaments</Link></li>
            <li><Link to='/contact' className="text-white hover:text-red-500">Contact</Link></li>
            <li><Link to='/about' className="text-white hover:text-red-500">About</Link></li>
            {admin ? <li><Link to={`/addEvent/${Email}`} className="text-white hover:text-red-500">Add Event</Link></li> : ""}
        </>
    );

    return (
        <>
            <div className={`z-50 max-w-screen-2xl container mx-auto px-5 fixed top-0 right-0 left-0 ${sticky ? "shadow-md bg-gray-800 duration-300 transition-all ease-in-out" : "bg-gray-900"}`}>
                <div className="navbar">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                {navItem}
                            </ul>
                        </div>
                        <img src={logo} alt="Flying" className="w-16 h-14" />
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1 text-white">
                                {navItem}
                            </ul>
                        </div>
                        {auth || admin ? <Profile logout={logout} /> :
                            <a
                                className="text-white px-3 py-2 rounded-md cursor-pointer hover:bg-red-500 hover:text-white duration-300"
                                onClick={() => document.getElementById('my_modal_3').showModal()}
                            >
                                Login
                            </a>
                        }
                    </div>
                </div>
            </div>

            {/* Login Modal */}
            <dialog id="loginModal" className="modal">
                <form method="dialog" className="modal-box">
                    <h2 className="font-bold text-lg">Login</h2>
                    <Login /> {/* Render your Login component here */}
                    <div className="modal-action">
                        <button type="submit" className="btn">Close</button>
                    </div>
                </form>
            </dialog>

        </>
    );
}

export default Navbar;
