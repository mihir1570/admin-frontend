import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faKey } from '@fortawesome/free-solid-svg-icons';
import { message, Popconfirm } from 'antd'
import BASE_URL from "./config";

const Forgotpassword = () => {
    const [email, setEmail] = useState("");

    const forgotSetPassword = async () => {

        const finaldata = await fetch(`https://superadmin-backend.onrender.com/forgotadminpassword`, {
            method: "post",
            body: JSON.stringify({
                email
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const finalresult = await finaldata.json()
        if (finalresult) {
            message.success('Password reset link sent to your email successfully!');
        } else {
            message.error('Submission Error: Unable to Submit Data');
        }
    }

    return (
        <>
            <div className="forgot-password-container">
                <div className="forgot-password-content">
                    <FontAwesomeIcon icon={faLock} className="lock-icon" />
                    <h2 className="forgot-password-title">Forgot Password?</h2>
                    <p className="forgot-password-text">Enter the email address associated with your account, and we'll send you a link to reset your password.</p>
                    <form className="forgot-password-form">
                        <div className="form-group">
                            <input
                                id="email"
                                name="email"
                                placeholder="Your Email Address"
                                className="forgot-password-input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <button
                                className="forgot-password-btn"
                                type="button"
                                onClick={forgotSetPassword}
                            >
                                <FontAwesomeIcon icon={faKey} />
                                &nbsp; Reset Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Forgotpassword;

