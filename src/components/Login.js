import React, { useEffect, useState } from "react";
import '../App.css';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { message } from 'antd'


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const companyName = "Google"
    const navigator = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("adminLogin");
        if (auth) {
            navigator("/dashboard");
        }
    }, []);

    const checkLogin = async () => {
        if (!email.trim() || !password.trim()) {
            message.info('Please enter your email and password.')
            setError(true);
            return;
        } else {
            const datas = await fetch("https://superadmin-backend.onrender.com/adminlogin", {
                method: "post",
                body: JSON.stringify({ email, password, companyName }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const results = await datas.json()
            if (results.error) {
                // alert("Authentication failed. Please check your email and password.")
                message.error('Authentication failed. Please check your email and password.')
            }
            else {
                localStorage.setItem("adminLogin", JSON.stringify(results));
                message.success('login successful');
                navigator("/dashboard");
            }
        }

    //     if (email === "mihir@gmail.com" && password === "123") {
    //             const data = {
    //                 email: email,
    //                 password: password
    //             };
    //             localStorage.setItem("adminLogin", JSON.stringify(data));
    //             navigator("/dashboard");
    //         } else {
    //             setError(true);
    //             alert("Invalid email or password. Please try again.");
    //         }

    
    };

    return (
        <>
            <div className="login-page-container">
                <div className="login-container">
                    <div className="login-logo">
                        {/* <img src={image} alt="Company Logo" width="150" /> */}
                        <h1><FontAwesomeIcon icon={faUser} /></h1>
                    </div>
                    <h4 className="login-title"><FontAwesomeIcon icon={faRightToBracket}/> Login</h4>
                    <h2 className="login-subtitle">Admin</h2>
                    <form id="loginForm">
                    <div className="input-container">
                        <input
                            type="email"
                            id="adminemail"
                            name="email"
                            aria-labelledby="label-fname"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label className="label" htmlFor="adminemail" id="label-email">
                            <div className="text">Email</div>
                        </label>
                    </div>
                    <div className="showErrors">
                        {error && !email.trim() && <span style={{ color: "red" }}>Please enter a valid email</span>}
                    </div>
                    <div className="input-container">
                        <input
                            type="password"
                            id="adminpassword"
                            name="password"
                            aria-labelledby="label-fname"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label className="label" htmlFor="adminpassword" id="label-password">
                            <div className="text">Password</div>
                        </label>
                    </div>
                    <div className="showErrors">
                        {error && !password.trim() && <span style={{ color: "red" }}>Please enter a valid password</span>}
                    </div>
                    
                    <button type="button" className="btn btn-primary btn-block" onClick={checkLogin}>Login</button>
                    
                    <div className="text-center mt-3">
                        <Link to="/forgotpassword">Forgot password?</Link>
                    </div>
                    
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;



















