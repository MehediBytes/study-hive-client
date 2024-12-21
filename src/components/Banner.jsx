import React from "react";
import banner from "../assets/banner.jpg"
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div
            className="bg-cover bg-center bg-no-repeat text-base-100 py-32 rounded-xl"
            style={{
                backgroundImage: `url(${banner})`
            }}
        >
            <div className="container mx-auto text-center">
                <h1 className="text-3xl font-bold">Welcome to Online Group Study</h1>
                <p className="mt-4 text-xl">
                    Collaborate with friends, create assignments, and grade each other’s work!
                </p>
                <Link to={"/assignments"}>
                    <button className="btn mt-6 bg-green-600 text-base-100 font-semibold rounded-lg hover:bg-green-400">
                        Get Started
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Banner;
