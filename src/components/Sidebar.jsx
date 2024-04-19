import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

export default function Sidebar() {
    const [activeLink, setActiveLink] = useState("");

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <div className="w-64 bg-deepMidnight border border-deepMidnight h-screen">
            <div className="mt-10">
                <img src="https://hassemprag.com/wp-content/uploads/2023/09/Group-1.svg" alt="logo" className="p-4"/>
            </div>
            <hr className="mt-5 border-deepMidnight"/>
            <div className="p-3 text-white">
                <ul className="mb-2 space-y-4 ">
                    <li className={activeLink === "notifications" ? "bg-electricLime text-deepMidnight flex justify-between items-center mb-10" : "flex justify-between items-center"}>
                        <Link to="/notifications" className="p-4 " onClick={() => handleLinkClick("notifications")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"/>
                            </svg>
                        </Link>
                    </li>

                    <li className={activeLink === "/" ? "h-10 bg-electricLime text-lg text-deepMidnight font-semibold" : "text-lg font-semibold" } >
                        <Link to="/" className="p-4 " onClick={() => handleLinkClick("/")}>Dashboard</Link>
                    </li>
                    <li className={activeLink === "/manual-uploads" ? "h-10 bg-electricLime text-lg text-deepMidnight font-semibold" : "text-lg font-semibold"}>
                        <Link to="/manual-uploads" className="p-4 " onClick={() => handleLinkClick("/manual-uploads")}>Manual Uploads</Link>
                    </li>
                    <li className={activeLink === "/end-of-day" ? "h-10 bg-electricLime text-lg text-deepMidnight font-semibold" : "text-lg font-semibold"}>
                        <Link to="/end-of-day" className="p-4 " onClick={() => handleLinkClick("/end-of-day")}>End of Day</Link>
                    </li>
                    <li className={activeLink === "/anomaly-reports" ? "h-10 bg-electricLime text-lg text-deepMidnight font-semibold" : "text-lg font-semibold"}>
                        <Link to="/anomaly-reports" className="p-4 " onClick={() => handleLinkClick("/anomaly-reports")}>Anomaly Reports</Link>
                    </li>
                </ul>
                <div className="p-4 mt-20 text-lg font-semibold">
                    <Link to="/profile">Profile</Link>
                </div>
                <div className="p-4 text-lg">
                    <p>Name:</p>
                    <p>Surname:</p>
                    <p>Employee No:</p>
                    <p>Username:</p>
                    <br />
                    <img src="https://cube.hassemprag.com/assets/images/profile-image.png" width="180" height="180" className="p-4" alt="profile"/>
                </div>
                
                <div className="p-4 mt-15 text-lg font-semibold flex items-center">
                    <Link to="#" onClick={onLogout}>Logout</Link>
                    <FaSignOutAlt className="ml-2" /> 
                </div>
            </div>
        </div>
    );
}

function onLogout() {
    // Handle logout
}
