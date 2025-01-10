import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "How do I join a group study session?",
            answer: "Simply register an account, log in, and start collaborating with other users who are automatically your friends.",
        },
        {
            question: "Can I create and assign tasks to my friends?",
            answer: "Yes, you can create assignments, assign them to friends, and track progress collaboratively.",
        },
        {
            question: "How does the grading system work?",
            answer: "You can grade your friends’ assignments, and your friends can grade yours, fostering a collaborative learning environment.",
        },
        {
            question: "Is this platform free to use?",
            answer: "Absolutely! Our platform is completely free to use for everyone.",
        },
    ];

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-5 bg-green-500 rounded-xl">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-base-100 mb-5">Frequently Asked Questions</h2>
                <div className="px-5 space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-green-500 bg-white rounded-lg shadow-lg"
                            onClick={() => toggleFaq(index)}
                        >
                            {/* Animated Collapse Header */}
                            <motion.div
                                className="cursor-pointer text-lg font-semibold text-gray-800 px-4 py-2"
                                initial={{ color: "#000" }}
                                animate={{ color: activeIndex === index ? "#16a34a" : "#000" }}
                                transition={{ duration: 0.5 }}
                            >
                                {faq.question}
                            </motion.div>

                            {/* Animated Collapse Content */}
                            <AnimatePresence initial={false}>
                                {activeIndex === index && (
                                    <motion.div
                                        className="text-gray-600 px-4 py-2"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                    >
                                        <p>{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
