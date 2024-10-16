import React from 'react';
import { useState, useEffect } from 'react';

function Banner() {

    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        "https://i.pinimg.com/originals/2d/d1/f0/2dd1f0d601311527c878a67b6d74226b.gif",
        // " https://wallpapercat.com/w/full/f/a/a/423-3840x2160-desktop-4k-call-of-duty-wallpaper.jpg",
        // "https://wallpapers.com/images/hd/pubg-red-smoke-4k-dskougi8j2tq0ca2.jpg ",
        // "https://wallpapercat.com/w/full/0/2/5/93827-1920x1080-desktop-full-hd-among-us-wallpaper-photo.jpg",
        // "https://wallpapers.com/images/featured/dota-2-4f14q75lj1uhmxrp.jpg",
        // "https://w0.peakpx.com/wallpaper/371/259/HD-wallpaper-forza-forza-horizon-4-car.jpg"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000); // Change slide every 1 second

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [images.length]);


    return (
        <div className='banner bg-gray-900 text-white max-w-screen-2xl container py-4 mx-auto md:py-5 px-10 flex flex-col md:flex-row md:space-x-3 space-y-3 mt-16 mb-1'>
            <div className='w-full md:w-1/2 md:mt-20 mt-10 md:order-1 order-2'>
                <div className='space-y-6'>
                    <h1 className='font-bold text-4xl'>
                        Hello, Welcome to E-Blue Gaming for <span className='text-red-500'>Everyday Tournaments</span>
                    </h1>
                    <p className='text-xl'>
                        Lorem ipsum dolor sit amet conse io iusto, iste laboriosam laborum, repellendus cumque quaerat.
                    </p>
                </div>
            </div>


            <div className='order-1 md:order-2 w-full md:w-1/2 mt-12'>
                <div className="carousel rounded-box w-full ease-in-out duration-150">
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className={`carousel-item w-full ${index === currentIndex ? 'block' : 'hidden'}`}
                        >
                            <img
                                src={src}
                                className="w-full"
                                alt={`Carousel slide ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Banner;
