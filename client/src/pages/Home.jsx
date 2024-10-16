import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/banner'
import Event from '../components/Event'
import Footer from '../components/Footer'


function Home() {
    return (
        <div>
            <Navbar />
            <Banner />
            <Event />
            <Footer />
        </div>
    )
}

export default Home