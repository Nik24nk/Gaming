import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Confirmpassword, setCPassword] = useState("");
    const [EmailMessage, setMessage] = useState("")

    const navigate = useNavigate();

    async function signup(e) {
        e.preventDefault();
        try {
            if (password === Confirmpassword) {
                const response = await axios.post("https://gaming-l37t.onrender.com/verify-email", {
                    ema: email,
                    pas: password,
                });
                if (response.data === "account exits") {
                    toast.error("Go to Login, Account Already Existed");
                } else {
                    setMessage(response.data);
                }
            } else {
                toast.error("Password Does not Match");
            }
        } catch (error) {
            console.error("Error in Signing up", error);
        }
    }

    return (
        <div>
            <dialog id="my_modal-3" className="modal">
                <div className="modal-box bg-white dark:bg-gray-800 text-black dark:text-white">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-600 dark:text-gray-300">
                            ✕
                        </button>
                    </form>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" action='/'>
                            <div>
                                <label htmlFor="email-input" className="block text-sm font-medium leading-6 text-black dark:text-gray-300">
                                    <h1 className="text-3xl mb-4 text-center">Sign up</h1>
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email-input"
                                        name="email"
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="mt-0">
                                <label htmlFor="password-input" className="block text-sm font-medium leading-6 text-black dark:text-gray-300">
                                    Create E-blue Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password-input"
                                        name="password"
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        autoComplete="current-password"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="mt-0">
                                <label htmlFor="confirm-password-input" className="block text-sm font-medium leading-6 text-black dark:text-gray-300">
                                    Confirm Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="confirm-password-input"
                                        name="Cpassword"
                                        type="password"
                                        onChange={(e) => setCPassword(e.target.value)}
                                        required
                                        autoComplete="current-password"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {EmailMessage && (
                                    <p className="mt-2 text-sm text-red-500 dark:text-red-400">{EmailMessage}</p>
                                )}
                            </div>

                            <div>
                                <button
                                    onClick={signup}
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 dark:bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default Signup;
