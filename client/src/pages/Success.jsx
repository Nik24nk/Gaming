import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Success = () => {
    const { teamName } = useParams();
    return (
        <div className="flex items-center justify-center h-screen  bg-gray-800">
            <div className="bg-green-500 text-white p-8 rounded-lg shadow-lg text-center max-w-sm">
                <h1 className="text-3xl font-bold mb-4">Success!</h1>
                <p className="text-lg mb-6">
                    {teamName} Your registration was successful.
                </p>
                <p className="mb-6 flex flex-col space-y-3">
                    <span className='text-white'>Join us on Discord for Further Information</span>
                    <a href='#' className='text-blue-600'>Discord Link</a>
                </p>
                <Link
                    to="/"
                    className="inline-block px-4 py-2 bg-white text-red-500 rounded hover:bg-gray-100 transition duration-300">
                    Back to HomePage
                </Link>
            </div>
        </div>
    );
};

export default Success;
