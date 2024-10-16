import React from 'react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Allevents from '../components/Allevents'
import { useState, useEffect } from 'react'
import axios from "axios";


function Tournaments() {

    const [events, setevents] = useState([]);

    useEffect(() => {
        async function getdata() {
            const events = await axios.get("https://gaming-6lc9.vercel.app/");
            const eventdata = events.data;
            setevents(eventdata);
        }
        getdata();

    }
    )
    return (
        <div>
            <Navbar />
            <div className='min-h-screen'>
                <Allevents Event={events} />
            </div>
            <Footer />
        </div>
    )
}

export default Tournaments;