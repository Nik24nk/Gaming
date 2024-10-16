import React from 'react';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';

function Tourna(props) {
    const navigate = useNavigate()
    const [auth, setAuth] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [adminEmail, setAdminEmail] = useState("");

    useEffect(() => {
        const Auth = async () => {
            try {
                const authen = sessionStorage.getItem('Auth');

                if (authen === "logined") {
                    setAdmin(false);
                    setAuth(true);
                }
                else if (authen === "Admin") {
                    const authemail = JSON.parse(sessionStorage.getItem('Authemail'));

                    setAdminEmail(authemail);

                    setAdmin(true);
                    setAuth(false);


                }
            } catch (error) {

                console.error("Authentication check failed", error);
            }
        };
        Auth();
    });


    function edit() {
        navigate(`/edit/${props.id}`);
    }
    async function Delete() {
        try {
            const response = await axios.post("https://gaming-l37t.onrender.com/delete", { id: props.id });
            if (response.data === "Deleted") {
                toast.success("delete successfully")
                window.location.href = "/"
            }
            else {
                toast.error("Problem while deleting");
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (<>
        <div className="card bg-gray-800 max-w-sm mx-auto shadow-xl mb-8 hover:scale-105 duration-200">
            {adminEmail === props.OrgEmail ?
                <div className='flex justify-between'>
                    <EditIcon onClick={edit} className='text-white' /> <DeleteForeverIcon onClick={Delete} className='text-white' />
                </div> : ""}
            <figure className="overflow-hidden rounded-lg">
                <img
                    src={props.image}
                    alt="event"
                    className="w-full h-auto object-cover"
                />
            </figure>

            <div className="card-body p-4 text-white">
                <h2 className="card-title text-lg md:text-xl flex justify-between items-center">
                    {props.name}
                    <div className="badge badge-secondary text-black">₹ {props.price}</div>
                </h2>
                <p className="text-sm md:text-base">
                    Winner will get <span className='text-red-400 font-bold text-lg md:text-2xl'>₹ {props.prize}</span>
                </p>
                <div className="card-actions justify-end flex flex-col mt-2 ">
                    <div className="badge badge-outline text-sm md:text-base text-gray-300 py-7 md:p-4">
                        Reg. deadline: {props.registration_deadline}
                    </div>
                    <div className="badge badge-outline hover:bg-red-700 text-sm md:text-base cursor-pointer px-2 py-4 hover:text-white">
                        <Link to={`/participate/${props.id}`}>Participate</Link>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default Tourna;
