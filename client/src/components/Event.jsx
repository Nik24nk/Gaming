import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Tourna from "./Tourna";
import axios from "axios";


function Event() {
    const [events, setEvents] = useState([]);
    const sliderRef = useRef(null); // Create a ref for the slider

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get("https://gaming-6lc9.vercel.app/");
                const eventData = response.data;
                setEvents(eventData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getData(); // Call the function directly
    }, []); // Empty dependency array means this runs once on mount

    const settings = {
        dots: true,
        infinite: events.length >= 4 ? true : false,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 1500,
        slidesToShow: events.length === 2 ? 2 : 3 || 1,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: events.length === 2 ? 2 : 3 || 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: events.length === 1 ? 1 : 2 || 1,
                    slidesToScroll: 1,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className='banner max-w-screen-2xl container mx-auto md:py-10 px-10 py-4 space-y-5 bg-gray-900 text-white mb-1'>
            <div>
                <h2 className='font-semibold pb-2 text-2xl text-red-500'>TOURNAMENTS</h2>
                <p className='text-white-400'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae nesciunt,
                </p>
            </div>
            <div className="slider-container pb-2 relative">
                <Slider ref={sliderRef} {...settings}>
                    {events.map((item) => (
                        <Tourna
                            id={item.id}
                            name={item.event_name}
                            image={item.image}
                            price={item.fee}
                            prize={item.winner}
                            key={item.id}
                            registration_deadline={item.registration_deadline}
                            OrgEmail={item.organizer_email}
                        />
                    ))}
                </Slider>

            </div>
        </div>
    );
}

export default Event;
