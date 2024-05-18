import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCircleQuestion, faPeopleGroup, faAddressBook, faHeadset, faHandshake, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import { message } from 'antd'


const Sidebar = () => {
    const navigator = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('adminLogin');
        if (!auth) {
            navigator("/");
        }
    }, [])

    const logout = () => {
        localStorage.removeItem("adminLogin");
        message.success('logout from admin panel')
        navigator("/");
    }

    return (
        <>
            {/* <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/dashboard">
                    <FontAwesomeIcon icon={faHouse} style={{ marginRight: "6px" }} />
                    PROJECT OPEN X
                </Link>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                        <button className="nav-link px-3" onClick={logout}>
                            <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: "6px" }} />
                            Logout
                        </button>
                    </div>
                </div>
            </header> */}

            <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">PROJECT OPEN X</a>
                <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
                <div class="navbar-nav">
                    <div class="nav-item text-nowrap">
                        <a class="nav-link px-3" onClick={logout}>Sign out</a>
                    </div>
                </div>
            </header>


            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <div className="position-sticky pt-3">
                            <ul className="nav flex-column">
                                <li className="nav-item dashboard">
                                    <Link to="/dashboard" className="nav-link" activeClassName="active">
                                        <FontAwesomeIcon icon={faHouse} style={{ paddingRight: "6px" }} />
                                        Dashboard
                                    </Link>
                                </li>
                                <div className="accordion" id="accordionExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button transparent-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                PROJECT OPEN X
                                            </button>
                                        </h2>
                                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div className="accordion-body transparent-body">
                                                <NavLink to="/inquiry" className="nav-link" activeClassName="active">
                                                    <FontAwesomeIcon icon={faCircleQuestion} style={{ paddingRight: "6px" }} />
                                                    Inquiry
                                                </NavLink>
                                                <NavLink to="/getintouch" className="nav-link" activeClassName="active">
                                                    <FontAwesomeIcon icon={faAddressBook} style={{ paddingRight: "6px" }} />
                                                    Get in touch
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <li className="nav-item">
                                    <NavLink to="/joinourteam" className="nav-link" activeClassName="active">
                                        <FontAwesomeIcon icon={faPeopleGroup} style={{ paddingRight: "6px" }} />
                                        Join our team
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/cpartner" className="nav-link" activeClassName="active">
                                        <FontAwesomeIcon icon={faHandshake} style={{ paddingRight: "6px" }} />
                                        Channel partner
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/contact" className="nav-link" activeClassName="active">
                                        <FontAwesomeIcon icon={faHeadset} style={{ paddingRight: "6px" }} />
                                        Contact Us
                                    </NavLink>
                                </li>
                                <li className="nav-item" style={{paddingTop:"20px"}}>
                                    <NavLink to="/adminprofile" className="nav-link" activeClassName="active">
                                        <FontAwesomeIcon icon={faUser} style={{ paddingRight: "6px" }} />
                                        Profile
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}
export default Sidebar;




















// import React, { useEffect } from 'react';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHouse, faCircleQuestion, faPeopleGroup, faAddressBook, faHeadset, faHandshake, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
// import $ from 'jquery';
// import 'jquery-ui-dist/jquery-ui';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import logoimage from './img/apple-touch-icon.png'

// function Sidebar() {
//     const navigator = useNavigate();

//     useEffect(() => {
//         const auth = localStorage.getItem('adminLogin');
//         if (!auth) {
//             navigator('/');
//         }

//         // Dark mode logic
//         const $body = $('body');
//         const $modeToggle = $('.mode-toggle');
//         let getMode = localStorage.getItem('mode');
//         if (getMode && getMode === 'dark') {
//             $body.addClass('dark');
//         }
//         $modeToggle.on('click', () => {
//             $body.toggleClass('dark');
//             const mode = $body.hasClass('dark') ? 'dark' : 'light';
//             localStorage.setItem('mode', mode);
//         });
//         return () => {
//             $modeToggle.off('click');
//         };
//     }, []);

//     const logout = () => {
//         localStorage.removeItem('adminLogin');
//         navigator('/');
//     };

//     return (
//         <>
//         <nav>
//             <div className="logo-name">
//                 <div className="logo-image">
//                     <img src={logoimage} alt="profile image" />
//                 </div>

//                 <span className="logo_name">CodingLab</span>
//             </div>

//             <div className="menu-items">
//                 <ul className="nav-links" style={{ paddingLeft: "0rem" }}>
//                     <li><a href="/dashboard">
//                         <i className="uil uil-estate"></i>
//                         <span className="link-name">Dahsboard</span>
//                     </a></li>
//                     <li><a href="/inquiry">
//                         <i className="uil uil-files-landscapes"></i>
//                         <span className="link-name">Inquiry</span>
//                     </a></li>
//                     <li><a href="#">
//                         <i className="uil uil-chart"></i>
//                         <span className="link-name">Analytics</span>
//                     </a></li>
//                     <li><a href="#">
//                         <i className="uil uil-thumbs-up"></i>
//                         <span className="link-name">Like</span>
//                     </a></li>
//                     <li><a href="#">
//                         <i className="uil uil-comments"></i>
//                         <span className="link-name">Comment</span>
//                     </a></li>
//                     <li><a href="#">
//                         <i className="uil uil-share"></i>
//                         <span className="link-name">Share</span>
//                     </a></li>
//                 </ul>

//                 <ul className="logout-mode" style={{ paddingLeft: "0rem" }}>
//                     <li><a href="#">
//                         <i className="uil uil-signout"></i>
//                         <span className="link-name" onClick={logout}>Logout</span>
//                     </a></li>

//                     <li className="mode">
//                         <a href="#">
//                             <i className="uil uil-moon"></i>
//                             <span className="link-name">Dark Mode</span>
//                         </a>

//                         <div className="mode-toggle">
//                             <span className="switch"></span>
//                         </div>
//                     </li>
//                 </ul>

//             </div>

//         </nav>
//         </>
//     );
// }

// export default Sidebar;







