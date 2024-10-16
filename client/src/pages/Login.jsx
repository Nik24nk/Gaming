import React, { useState } from 'react';
import Signup from './Signup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import ForgetPass from './ForgetPass';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function login(e) {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/register", {
                username: email,
                password: password,
            });
            const auth = response.data;
            console.log(auth);
            if (auth.message === "logined") {
                document.getElementById('my_modal_3').close();
                sessionStorage.setItem('Auth', 'logined');
                sessionStorage.setItem('email', email);
                toast.success("Login successfully");
                window.location.href = "/";
            } else if (auth.message === "wrong password") {
                toast.error("Wrong Password");
            } else if (auth.message === "Wrong Admin Password") {
                toast.error("Wrong Admin Password");
            } else if (auth.message === "Admin Exists") {
                document.getElementById('my_modal_3').close();
                sessionStorage.setItem('Auth', "Admin");

                if (auth.adminEmail) {
                    sessionStorage.setItem('Authemail', JSON.stringify(auth.adminEmail));
                }
                toast.success("Login successfully");
                window.location.href = "/";
            } else {
                toast.error("Account does not exist");
            }
        } catch (error) {
            toast.error("Something is wrong, please try again later");
        }
    }

    return (
        <div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box bg-white dark:bg-gray-800 text-black dark:text-white">
                    <form method="dialog">
                        <button
                            className="btn btn-sm btn-circle absolute right-2 top-2 text-gray-600 dark:text-gray-300"
                            onClick={() => document.getElementById('my_modal_3').close()}>
                            ✕
                        </button>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-black dark:text-gray-300">
                                        <h1 className='text-3xl mb-3 text-center'>Login</h1>
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            autoComplete="email"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-black dark:text-gray-300">
                                            Enter E-blue Password
                                        </label>
                                        <div className="text-sm">
                                            <a
                                                onClick={() => document.getElementById('my_modal').showModal()}
                                                className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 cursor-pointer">
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            autoComplete="current-password"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        onClick={login}
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 dark:bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">
                                        Sign in
                                    </button>
                                </div>
                            </form>

                            <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
                                Don't have an account?{' '}
                                <a
                                    className="font-semibold leading-6 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 cursor-pointer"
                                    onClick={() => document.getElementById('my_modal-3').showModal()}>
                                    Sign up<Signup />
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </dialog>
            <ForgetPass />
        </div>
    );
}

export default Login;
