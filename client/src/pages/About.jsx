import React from 'react';
import Navbar from '../components/Navbar';


const About = () => {

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-16  bg-gray-800 text-white mt-20 mb-5">
                <h1 className="text-4xl font-bold text-center mb-8 text-red-500">About us</h1>
                <p className="text-lg text-white text-center mb-16">
                    Welcome to our esports gaming community! We are passionate about competitive gaming and strive to provide the best platform for gamers to connect and compete.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gray-800 rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold mb-4 text-red-500">Our Mission</h2>
                        <p className="text-gray-300">
                            Our mission is to foster a vibrant gaming community that promotes teamwork, sportsmanship, and inclusivity. We organize tournaments and events for gamers of all skill levels.
                        </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold mb-4 text-red-500">Join us</h2>
                        <p className="text-gray-300">
                            Whether you're a casual player or a seasoned pro, there’s a place for you in our community. Join us in our journey to make esports accessible to everyone!
                        </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold mb-4 text-red-500">Always Learning</h2>
                        <p className="text-gray-300">
                            Aut repellendus et officiis dolor possimus. Deserunt velit quasi sunt fuga
                            error labore quia ipsum. Commodi autem voluptatem nam. Quos voluptatem
                            totam.
                        </p>
                    </div>
                </div>

            </div>
        </>
    );
};

export default About;
