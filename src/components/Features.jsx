import React from "react";
import { FaUsers, FaTasks, FaChartLine, FaRegLightbulb } from "react-icons/fa";
import { motion } from "framer-motion";

const Features = () => {
    const features = [
        {
            icon: <FaUsers className="text-green-500 text-5xl" />,
            title: "Collaborate with Friends",
            description: "Work together on assignments and share ideas to achieve success.",
        },
        {
            icon: <FaTasks className="text-blue-500 text-5xl" />,
            title: "Create & Complete Assignments",
            description: "Easily create tasks and keep track of your progress.",
        },
        {
            icon: <FaChartLine className="text-yellow-500 text-5xl" />,
            title: "Track Performance",
            description: "Analyze your growth and stay motivated to reach new heights.",
        },
        {
            icon: <FaRegLightbulb className="text-purple-500 text-5xl" />,
            title: "Grading System",
            description: "Grade assignments for each other and learn collaboratively.",
        },
    ];

    return (
        <motion.section
            className="py-5 bg-green-700 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="text-center">
                <h2 className="text-4xl font-bold text-base-100 mb-5">Our Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-5">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-base-100 p-5 flex flex-col justify-between flex-grow rounded-lg shadow-lg hover:shadow-2xl transform transition duration-300"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3, delay: index * 0.2 }}
                        >
                            <motion.div
                                className="mb-6 flex justify-center"
                                whileHover={{ scale: 1.2 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {feature.icon}
                            </motion.div>
                            <h3 className="text-2xl font-semibold text-green-500 mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default Features;
