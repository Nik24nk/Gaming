import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Participate = () => {
    const { id } = useParams();
    const [details, setDetails] = useState({});
    const [auth, setAuth] = useState(false);
    useEffect(() => {
        const Auth = async () => {
            try {
                const authen = sessionStorage.getItem('Auth');
                if (authen === "logined") {

                    setAuth(true);
                }
                else if (authen === "Admin") {

                    setAuth(false);
                }
            } catch (error) {

                console.error("Authentication check failed", error);
            }
        };
        Auth();
    });

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axios.post("https://gaming-6lc9.vercel.app/participate", { Id: id });
                setDetails(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getData();
    }, [id]);

    // function alert(e) {
    //     e.preventDefault();
    //     toast.error("Please Login or Register First!")
    // }
    return (
        <>
            <Navbar />
            <div className="container mx-auto mt-20 mb-5 p-6 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 justify-center md:flex-col flex-col md:order-1 order-2">
                        <img
                            src={details.image}
                            alt="Tournament"
                            className="object-cover w-full h-64 rounded-lg shadow-md md:object-fill hidden md:block"
                        />
                        <div>

                            <h2 className="text-xl font-semibold mt-6 text-red-500">Prizes</h2>
                            <p className="mb-4 text-left">
                                Winners will receive <strong className="text-green-400"> ₹ {details.winner || "TBD"}</strong> as a cash prize!
                            </p>


                            <h2 className="text-xl font-semibold mt-6 text-red-500">Format and Schedule</h2>
                            <p className="mb-2">The tournament will follow a knockout format.</p>
                            <p className="mb-4">Matches are scheduled to begin on {details.date}, at {details.time}.</p>
                        </div>
                    </div>
                    <div className="md:w-1/2 md:pl-6 flex flex-col justify-center md:order-2 order-1">
                        <div>
                            <img
                                src={details.image}
                                alt="Tournament"
                                className="object-cover w-full h-64 rounded-lg shadow-md md:object-fill visible md:hidden mb-4 md:mb=0"
                            />
                            <h1 className="text-3xl font-bold text-center md:text-left text-red-500 mb-4">
                                {details.event_name || "Tournament Name"}
                            </h1>
                            <p className="mb-2 text-center md:text-left">
                                Join us for an exciting tournament where teams compete for glory and prizes!
                            </p>
                            <p className="text-gray-400 mb-2 text-center md:text-left">
                                <strong>Event Date:</strong> {details.date} | <strong>Event Timing:</strong> {details.time}
                            </p>

                            <h2 className="text-xl font-semibold mt-4 text-red-500">Registration Information</h2>
                            <p className="mb-1">
                                <strong>Registration Deadline:</strong> {details.registration_deadline}
                            </p>
                            <p className="mb-1">
                                <strong>Eligibility Criteria:</strong> Open to all ages and skill levels.
                            </p> <p className="mb-4">
                                <strong>Registration Fee:</strong > <span className="text-red-400">₹ {details.fee || "TBD"}</span>  per team. Pay via debit card or UPI.
                            </p>
                            <h2 className="text-xl font-semibold mt-6 text-red-500">Rules and Regulations</h2>
                            <p className="mb-2">All participants must adhere to the tournament rules and maintain good sportsmanship.</p>

                        </div>


                        {/* <h2 className="text-xl font-semibold mt-4 text-red-500">How to Register</h2> */}

                        {/* <a href={auth ? `/register/${details.event_name}/${details.nummember}/${details.fee}` : "/"}
                            className="w-full text-center bg-red-600 text-white p-2 rounded hover:bg-red-700 transition duration-200 mb-4 mt-3"
                            type="submit"
                        >
                            Register
                        </a> */}
                        <Link to={auth ? `/register/${details.event_name}/${details.nummember}/${details.fee}` : "/"}
                            className="w-full text-center bg-red-600 text-white p-2 rounded hover:bg-red-700 transition duration-200 mb-4 mt-3"
                            type="submit"
                        > Register</Link>
                    </div>
                </div>


            </div>
        </>
    );
};

export default Participate;
