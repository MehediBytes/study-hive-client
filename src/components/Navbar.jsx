import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Fade, Slide } from "react-awesome-reveal";
import { ThemeContext } from "../provider/ThemeProvider";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [showTooltip, setShowTooltip] = useState(false);
    const { theme, toggleTheme } = useContext(ThemeContext);

    // Handle Logout
    const handleLogout = () => {
        logout()
            .then(() => {
                toast.success("Logged out successfully!");
            })
            .catch((error) => {
                toast.error("Logout failed. Please try again!", error);
            });
    };

    return (
        <div className="navbar bg-gradient-to-r from-green-400 to-green-600 mb-10 p-4 text-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content rounded-box z-[1] bg-green-400 mt-3 w-52 p-2 shadow"
                    >
                        <Fade cascade>
                            <li>
                                <NavLink to={"/"}>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/assignments"}>Assignments</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/pending-assignments"}>Pending Assignments</NavLink>
                            </li>
                        </Fade>
                    </ul>
                </div>
                <div>
                    <Slide direction="left">
                        <Link to={"/"}>
                            <h1 className="text-base-100 text-xl md:text-3xl font-extrabold">
                                Study-Hive
                            </h1>
                        </Link>
                    </Slide>
                </div>
            </div>

            <div className="navbar-center hidden lg:flex">
                <Fade cascade>
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <NavLink to={"/"}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/assignments"}>Assignments</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/pending-assignments"}>Pending Assignments</NavLink>
                        </li>
                    </ul>
                </Fade>
            </div>

            <div className="navbar-end flex items-center gap-4">
                {/* Theme Toggle */}
                <div className="flex items-center">
                    <label className="swap swap-rotate">
                        <input
                            type="checkbox"
                            className="toggle"
                            checked={theme === "dark"}
                            onChange={toggleTheme}
                        />
                    </label>
                </div>

                <div>
                    {user && user?.email ? (
                        <div className="flex items-center gap-4 relative">
                            {/* User Photo */}
                            <div
                                className="relative group"
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                            >
                                <Slide direction="down">
                                    <details className="relative dropdown">
                                        <summary className="dropdown">
                                            <img
                                                referrerPolicy="no-referrer"
                                                className="w-10 h-10 rounded-full cursor-pointer"
                                                src={user?.photoURL || "None"}
                                                alt={user?.displayName || "User"}
                                            />
                                        </summary>
                                        <ul className="menu dropdown-content bg-green-600 text-base-100 rounded-box z-[1] mt-1 p-2 shadow absolute -right-16">
                                            <li>
                                                <Link to={"/create-assignments"}>Create Assignments</Link>
                                            </li>
                                            <li>
                                                <Link to={"/my-assignments"}>My Attempted Assignments</Link>
                                            </li>
                                        </ul>
                                    </details>


                                </Slide>
                                {/* Display Name Tooltip */}
                                {showTooltip && (
                                    <Fade>
                                        <div className="absolute top-0 -left-8 transform -translate-x-1/2 bg-gray-800 text-white text-sm rounded-md px-3 py-1">
                                            {user?.displayName || "No Name"}
                                        </div>
                                    </Fade>
                                )}
                            </div>

                            {/* Logout Button */}
                            <Fade>
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-outline text-base-100"
                                >
                                    Log Out
                                </button>
                            </Fade>
                        </div>
                    ) : (
                        <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                            <Fade cascade>
                                <Link to={"/auth/login"}>
                                    <button className="btn btn-outline text-base-100 w-20">
                                        Log-In
                                    </button>
                                </Link>
                            </Fade>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;