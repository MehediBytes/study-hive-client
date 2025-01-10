import React from "react";
import { motion } from "framer-motion";
import banner from "../assets/banner.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <motion.div
            className="bg-cover bg-center bg-no-repeat text-base-100 py-24 rounded-xl px-5"
            style={{
                backgroundImage: `url(${banner})`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >

            <motion.div
                className="text-center"
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
                    transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                >
                    <Link to={"/assignments"}>
                        <button className="btn mt-6 bg-green-600 text-base-100 font-semibold rounded-lg px-8 py-3 hover:bg-green-400 shadow-lg">
                            Get Started
                        </button>
                    </Link>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Banner;
