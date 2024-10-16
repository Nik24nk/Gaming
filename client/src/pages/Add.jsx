import React, { useState } from 'react';
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { useParams } from 'react-router-dom';

const Add = () => {
    const { email } = useParams();
    const navigate = useNavigate();
    const [eventData, setEventData] = useState({
        name: '',
        date: '',
        time: '',
        venueName: '',
        prize: '',
        registrationFee: '',
        registrationDeadline: '',
        image: null,
        organizerName: '',
        organizerContact: '',
        email: email,
        NumMember: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleFileChange = (e) => {
        setEventData({ ...eventData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://gaming-l37t.onrender.com/addEvent", {
                addevent: eventData
            });
            console.log(response.data);
            window.location.href = "/"
            toast.success("Event Added successfully");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-6 bg-black text-white rounded-lg shadow-lg mt-20 mb-6 md:my-20">
                <h1 className="text-3xl font-bold text-center mb-6 text-red-500">Add Event</h1>
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:space-x-4">

                    {/* Left Column */}
                    <div className="md:w-1/2 md:pr-4 " >
                        {/* Event Name */}
                        <div className="mb-4">
                            <label className="block mb-1" htmlFor="name">Event Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={eventData.name}
                                onChange={handleChange}
                                required
                                className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:border-red-500 focus:ring focus:ring-orange-200"
                            />
                        </div>

                        {/* Date */}
                        <div className="mb-4">
                            <label className="block mb-1" htmlFor="date">Date:</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={eventData.date}
                                onChange={handleChange}
                                required
                                className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:border-red-500 focus:ring focus:ring-orange-200"
                            />
                        </div>

                        {/* Time */}
                        <div className="mb-4">
                            <label className="block mb-1" htmlFor="time">Time:</label>
                            <input
                                type="text"
                                id="time"
                                name="time"
                                value={eventData.time}
                                onChange={handleChange}
                                required
                                className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:border-red-500 focus:ring focus:ring-orange-200"
                            />
                        </div>

                        {/* Location */}
                        <div className="mb-4">
                            <label className="block mb-1" htmlFor="venueName">Location:</label>
                            <input
                                type="text"
                                id="venueName"
                                name="venueName"
                                value={eventData.venueName}
                                onChange={handleChange}
                                required
                                className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:border-red-500 focus:ring focus:ring-orange-200"
                            />
                        </div>

                        {/* Prize */}
                        <div className="mb-4">
                            <label className="block mb-1" htmlFor="prize">Prize:</label>
                            <input
                                type="text"
                                id="prize"
                                name="prize"
                                value={eventData.prize}
                                onChange={handleChange}
                                required
                                className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:border-red-500 focus:ring focus:ring-orange-200"
                            />
                        </div>
                        {/* members */}
                        <div className="mb-4">
                            <label className="block mb-1" htmlFor="No_of_Members">No of Members</label>
                            <input
                                type="number"
                                id="No_of_Members"
                                name="NumMember"
                                value={eventData.NumMember}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:border-red-500 focus:ring focus:ring-orange-200"
                            />
                        </div>

                    </div>

                    {/* Right Column */}
                    <div className="md:w-1/2 md:pl-4">
                        {/* Registration Fee */}
                        <div className="mb-4">
                            <label className="block mb-1" htmlFor="registrationFee">Registration Fee:</label>
                            <input
                                type="text"
                                id="registrationFee"
                                name="registrationFee"
                                value={eventData.registrationFee}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:border-red-500 focus:ring focus:ring-orange-200"
                            />
                        </div>

                        {/* Registration Deadline */}
                        <div className="mb-4">
                            <label className="block mb-1" htmlFor="registrationDeadline">Registration Deadline:</label>
                            <input
                                type="text"
                                id="registrationDeadline"
                                name="registrationDeadline"
                                value={eventData.registrationDeadline}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:border-red-500 focus:ring focus:ring-orange-200"
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="mb-4">
                            <label className="block mb-1" htmlFor="image">Upload Image:</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:border-red-500 focus:ring focus:ring-orange-200"
                            />
                        </div>

                        {/* Organizer Information */}
                        <div className="mb-4">
                            <label className="block mb-1" htmlFor="organizerName">Organizer Name:</label>
                            <input
                                type="text"
                                id="organizerName"
                                name="organizerName"
                                value={eventData.organizerName}
                                onChange={handleChange}
                                required
                                className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:border-red-500 focus:ring focus:ring-orange-200"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1" htmlFor="organizerContact">Organizer Contact:</label>
                            <input
                                type="text"
                                id="organizerContact"
                                name="organizerContact"
                                value={eventData.organizerContact}
                                onChange={handleChange}
                                required
                                className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:border-red-500 focus:ring focus:ring-orange-200"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="md:text-1xl bg-red-600 text-white p-2 rounded hover:bg-red-700 transition duration-200 mt-4"
                    >
                        Add Event
                    </button>
                </form>
            </div>
        </>
    );
};

export default Add;
