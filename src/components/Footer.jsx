import React from "react";
import { motion } from "framer-motion";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";

const Footer = () => {
    const navItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const parentVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };

    return (
        <div className="bg-green-700">
            <footer
                className="footer max-w-7xl mx-auto text-base-100 items-center p-4"
            >
                <motion.aside
                    className="grid-flow-col items-center gap-10"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <h1 className="text-base-100 text-xl md:text-3xl font-extrabold">
                        Study-Hive
                    </h1>
                    <p className="text-base-100">
                        Copyright © {new Date().getFullYear()} - All right reserved
                    </p>
                </motion.aside>
                <nav
                    className="grid-flow-col gap-4 md:place-self-center md:justify-self-end text-base-100 text-2xl"
                >
                    <motion.a
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        whileTap={{ scale: 0.9, rotate: -10 }}
                        href='https://www.facebook.com' target='_blank'>
                        <FaFacebookF />
                    </motion.a>
                    <motion.a
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        whileTap={{ scale: 0.9, rotate: -10 }}
                        href='https://www.instagram.com' target='_blank'>
                        <FaInstagram />
                    </motion.a>
                    <motion.a
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        whileTap={{ scale: 0.9, rotate: -10 }}
                        href='https://x.com' target='_blank'
                        className="text-2xl">
                        <BsTwitterX />
                    </motion.a>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;
