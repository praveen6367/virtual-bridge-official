import React from "react";
import './navbar.css';
import {
    BrowserRouter as Router,
    Link,
} from 'react-router-dom';

import { useNavigate } from "react-router-dom";

export default (Navbar) => {

    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setTimeout(() => {

            navigate('/login');
        }, 100)
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg ">
                <div className="px-3 navbar-logo">
                    <p className="logo-heading text-secondary ">
                        <span style={{ "color": " #37cdcf" }}>Virtual </span>
                        <span>Bridge</span>
                    </p>
                </div>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse  flex-row-reverse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="mx-3 nav-item nav-link active" to="#">Home </Link>

                        <Link className="mx-3 nav-item nav-link " to="#">About us  </Link>

                        <Link className="mx-3 nav-item nav-link " href="#">Contact Us </Link>

                        <Link className="mx-3 nav-item nav-link " href="#">Service </Link>

                        <Link style={{ position: 'relative' }} className="mx-3 nav-item nav-link " href="#">My Profile

                            {/* <ul className="drop-down-menu">
                                <Link className="mx-3 nav-item nav-link " href="#">Update </Link>
                                <Link className="mx-3 nav-item nav-link " href="#">User panel</Link>
                            </ul> */}
                        </Link>


                        {
                            !localStorage.getItem('token') ? <Link className="blue-btn text-red mx-5 nav-item nav-link" to="/login">Get Started</Link> : <Link onClick={handleLogout} className="blue-btn text-red mx-5 nav-item nav-link" to="#">Log out</Link>
                        }

                    </div>
                </div>

            </nav>

        </>
    )
}
