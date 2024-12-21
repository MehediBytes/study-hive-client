import React from "react";
import { FaUsers, FaTasks, FaChartLine, FaRegLightbulb } from "react-icons/fa";

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
        <section className="py-16 bg-green-300 rounded-xl">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-base-100 mb-10">Our Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-5">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-base-100 p-8 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300"
                        >
                            <div className="mb-6 flex justify-center">{feature.icon}</div>
                            <h3 className="text-2xl font-semibold text-green-400 mb-4">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
