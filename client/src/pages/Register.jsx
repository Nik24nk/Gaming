import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    // all Hooks
    const { name, NumMember, fee } = useParams();
    const [formData, setFormData] = useState({
        TeamName: '',
        LeaderName: '',
        LeaderEmail: sessionStorage.getItem('email'),
        Event_name: name,
        teamMembers: Array.from({ length: NumMember }, () => ({ name: '', email: '' }))
    });
    const [teamMemberVisible, setTeamMemberVisible] = useState(false);
    const [validate, setvalidate] = useState(false);
    const navigate = useNavigate();

    // Event Participation Authentication..............
    useEffect(() => {
        async function auth() {
            try {
                const response = await axios.post("https://gaming-l37t.onrender.com/team-validate", {
                    LeaderEmail: formData.LeaderEmail,
                    Event_name: formData.Event_name
                })
                if (response.data === "Participated") {
                    setvalidate(true)
                }
                else {
                    setvalidate(false)
                }
            } catch (error) {

                console.error("Authentication check failed", error);
            }
        }
        auth();
    })

    // Payment
    const amount = fee * 100;
    const currency = "INR";
    let receiptId = "receipt#1";

    // Submit Form
    const handleSubmit = async () => {

        try {
            const response = await axios.post("https://gaming-l37t.onrender.com/eventMai", {
                formData
            });
            console.log(response.data)
            toast.success("Event registration success")
            setvalidate(true)

            navigate(`/success/${formData.TeamName}`)
        } catch (error) {
            console.log(error);
        }
    };

    function already(e) {
        e.preventDefault();
        toast.error("Already Paritcipated")
    }

    async function paymentHandler(e) {
        e.preventDefault();
        try {
            const response = await axios.post("https://gaming-l37t.onrender.com/order", {
                amount,
                currency,
                receipt: receiptId,
            });
            const order = response.data;
            // console.log(order);
            var options = {
                "key": "rzp_test_sQ4t2RvI88kiXq", // Enter the Key ID generated from the Dashboard
                amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency,
                "name": "E-blu", //your business name
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id": order.id,

                handler: function (response) {
                    // Capture payment response
                    const paymentDetails = {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                    };

                    // Send the payment details to the backend for verification
                    axios.post('https://gaming-l37t.onrender.com/verify-payment', paymentDetails)
                        .then((res) => {
                            if (res.data.status === 'success') {

                                handleSubmit();
                            } else {
                                toast.error('Payment Validation Failed!');
                            }
                        })
                        .catch((err) => {
                            console.error('Payment verification error:', err);
                            toast.error('Payment Verification Error');
                        });
                },

                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                },
                method: {
                    upi: true, // Allow UPI payments
                    wallet: ['phonepe'] // Specifically allow PhonePe
                }
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response) {
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
            });
            rzp1.open();

        }
        catch (error) {
            console.log(error);
        }
    }

    // set FormData
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Set Team Member data
    const handleTeamMemberChange = (index, field, value) => {
        const updatedTeamMembers = [...formData.teamMembers];
        updatedTeamMembers[index][field] = value;
        setFormData({ ...formData, teamMembers: updatedTeamMembers });
    };

    const showTeamMembers = () => {
        setTeamMemberVisible(true);
    };

    useEffect(() => {
        console.log(NumMember);
    }, [NumMember]);

    return (
        <>

            <div className="flex justify-center flex-col items-center h-screen bg-base-900">
                <button className=' mt-2 bg-black text-white px-4 py-2 rounded-full mb-9'><Link to='/'>back</Link></button>
                <div className="w-full max-w-3xl p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center text-white">Register</h2>
                    <form className="space-y-4" onSubmit={validate ? already : paymentHandler}>
                        <div className="flex justify-between">
                            <div className="w-full mr-2">
                                <label htmlFor="TeamName" className="block text-sm font-medium text-gray-300">
                                    Team Name
                                </label>
                                <input
                                    id="TeamName"
                                    name="TeamName"
                                    type="text"
                                    required
                                    className="w-full p-2 mt-1 bg-gray-700 text-white border border-gray-600 rounded focus:ring-red-500 focus:border-red-500"
                                    value={formData.TeamName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full ml-2">
                                <label htmlFor="LeaderName" className="block text-sm font-medium text-gray-300">
                                    Team Leader Name
                                </label>
                                <input
                                    id="LeaderName"
                                    name="LeaderName"
                                    type="text"
                                    required
                                    className="w-full p-2 mt-1 bg-gray-700 text-white border border-gray-600 rounded focus:ring-red-500 focus:border-red-500"
                                    value={formData.LeaderName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div className="w-full mr-2">
                                <label htmlFor="LeaderEmail" className="block text-sm font-medium text-gray-300">
                                    Leader Email Address
                                </label>
                                <input
                                    id="LeaderEmail"
                                    name="LeaderEmail"
                                    type="email"
                                    required
                                    className="w-full p-2 mt-1 bg-gray-700 text-white border border-gray-600 rounded focus:ring-red-500 focus:border-red-500"
                                    value={formData.LeaderEmail}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full ml-2">
                                <label htmlFor="NumMembers" className="block text-sm font-medium text-gray-300">
                                    Select Team Members
                                </label>
                                <select
                                    id="NumMembers"
                                    className="select select-error w-full bg-gray-700 text-white border border-gray-600 rounded focus:ring-red-500 focus:border-red-500"
                                    onChange={showTeamMembers}
                                    required
                                >
                                    <option value="" disabled selected>
                                        Select Team Members
                                    </option>
                                    <option  >
                                        {NumMember}
                                    </option>

                                </select>
                            </div>

                        </div>

                        {teamMemberVisible &&
                            formData.teamMembers.map((member, index) => (
                                <div className="flex mb-4" key={index}>
                                    <div className="w-full mr-2">
                                        <h3 className="text-lg text-red-500 mb-2">Team Member {index + 1}</h3>
                                        <input
                                            type="text"
                                            placeholder="Member Name"
                                            className="w-full p-2 mb-2 bg-gray-700 rounded-md text-white"
                                            required
                                            value={member.name}
                                            onChange={(e) =>
                                                handleTeamMemberChange(index, 'name', e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="w-full ml-2">
                                        <h3 className="text-lg text-red-500 mb-2">Member {index + 1} Email</h3>
                                        <input
                                            type="email"
                                            placeholder="Member Email"
                                            className="w-full p-2 bg-gray-700 rounded-md text-white"
                                            required
                                            value={member.email}
                                            onChange={(e) =>
                                                handleTeamMemberChange(index, 'email', e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            ))}

                        <button

                            type="submit"
                            className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600"
                        >
                            Payment
                        </button>
                    </form>
                </div>
            </div></>
    );
};

export default Register;
