import React from 'react'
import { useState, useEffect } from 'react';

function Auth() {
    const [auth, setAuth] = useState(false);
    const [admin, setAdmin] = useState(false);


    useEffect(() => {
        const Auth = async () => {
            try {
                const authen = localStorage.getItem("Auth")
                if (authen === "logined") {
                    setAdmin(false);
                    setAuth(true);
                }
                else if (authen === "Admin") {
                    setAdmin(true);
                    setAuth(false);
                }
            } catch (error) {

                console.error("Authentication check failed", error);
            }
        };
        Auth();
    });
    return (
        <div admin={admin} auth={auth}>Auth</div>
    )
}

export default Auth