import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { useState } from 'react';

function ForgetPass() {
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const [EmailMessage, setMessage] = useState("");

    async function update(e) {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/forget-password", {
                mail: mail,
                pass: pass,
            });
            if (response.data === "account does not exist") {
                toast.error("Account does not exist");
            } else if (response.data === "verify") {
                const msg = "Please verify through your Email";
                setMessage(msg);
            } else {
                toast.error("Error changing Password. Please try again later!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <dialog id="my_modal" className="modal">
                <div className="modal-box bg-white dark:bg-gray-800 text-black dark:text-white">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-600 dark:text-gray-300">
                            ✕
                        </button>
                    </form>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" action='/'>
                            <div>
                                <label htmlFor="mail" className="block text-sm font-medium leading-6 text-black dark:text-gray-300">
                                    <h1 className="text-3xl mb-4 text-center">Change Password</h1>
                                    Registered Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="mail"
                                        name="mail"
                                        type="email"
                                        onChange={(e) => setMail(e.target.value)}
                                        required
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="mt-0">
                                <label htmlFor="pass" className="block text-sm font-medium leading-6 text-black dark:text-gray-300">
                                    New E-blue Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="pass"
                                        name="pass"
                                        type="password"
                                        onChange={(e) => setPass(e.target.value)}
                                        required
                                        autoComplete="current-password"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            {EmailMessage && (
                                <p className="mt-2 text-sm text-red-500 dark:text-red-400">{EmailMessage}</p>
                            )}

                            <div>
                                <button
                                    onClick={update}
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 dark:bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default ForgetPass;
