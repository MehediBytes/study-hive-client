import React from "react";
import { motion } from "framer-motion";
import banner from "../assets/banner.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <motion.div
            className="bg-cover bg-center bg-no-repeat text-base-100 py-32 rounded-xl relative overflow-hidden"
            style={{
                backgroundImage: `url(${banner})`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-green-700 opacity-45"></div>

            <motion.div
                className="container mx-auto text-center relative z-10"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <motion.h1
                    className="text-2xl md:text-5xl font-bold mb-4"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Welcome to Online Group Study
                </motion.h1>

                <motion.p
                    className="mt-4 text-lg md:text-2xl font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    Collaborate with friends, create assignments, and grade each other’s work!
                </motion.p>

                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.3 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                >
                    <Link to={"/assignments"}>
                        <button className="btn mt-6 bg-green-600 text-base-100 font-semibold rounded-lg px-8 py-3 hover:bg-green-400 shadow-lg transform transition duration-300">
                            Get Started
                        </button>
                    </Link>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Banner;
