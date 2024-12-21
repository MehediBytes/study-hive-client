import React, { useState } from "react";

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
        <section className="py-16 bg-green-300 rounded-xl">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold text-base-100 mb-10">Frequently Asked Questions</h2>
                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`collapse ${activeIndex === index ? "collapse-open" : "collapse-close"
                                } bg-white border border-green-400 rounded-lg shadow-lg`}
                            onClick={() => toggleFaq(index)}
                        >
                            <input type="checkbox" className="peer hidden" />
                            <div className="collapse-title text-lg font-semibold text-gray-800 peer-checked:text-green-600">
                                {faq.question}
                            </div>
                            <div className="collapse-content text-gray-600">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
