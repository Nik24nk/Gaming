import React from 'react'
import Tourna from "../components/Tourna";


function Allevents(props) {
    const list = props.Event;
    return (
        <div className='max-w-screen-2xl container mx-auto md:px20 px-4'>
            <div className='mt-28 items-center justify-center text-center'>
                <h1 className='text-3xl'>All Events are Listed here</h1>

            </div>
            <div>
            </div>
            <div className='mt-12 grid grid-cols-1 md:grid-cols-3'>

                {list.map((item, index) => (

                    <Tourna id={item.id} name={item.event_name} image={item.image} price={item.fee} prize={item.winner} key={item.id} registration_deadline={item.registration_deadline} OrgEmail={item.organizer_email} />
                ))}
            </div>
        </div>
    )
}

export default Allevents