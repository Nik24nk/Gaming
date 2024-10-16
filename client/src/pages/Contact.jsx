import React from 'react';
import Navbar from '../components/Navbar';
const Contact = () => {
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-16 bg-gray-800 text-white mt-20 mb-4">
                <h1 className="text-4xl font-bold text-center mb-8 text-red-500">Get in Touch</h1>
                <p className="text-lg text-white text-center mb-16">
                    Quam nunc nunc eu sed. Sed rhoncus quis ultricies ac pellentesque.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-800 rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold mb-4 text-red-500">Collaborate / Join our Team</h2>
                        <p className="text-gray-300 mb-2">collaborate@example.com</p>
                        <p className="text-gray-300">+1 (555) 905-2345</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold mb-4 text-red-500">Help</h2>
                        <p className="text-gray-300 mb-2">help@example.com</p>
                        <p className="text-gray-300">+1 (555) 905-3456</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
