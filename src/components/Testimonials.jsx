import React from 'react';

const Testimonials = () => {
    const testimonials = [
        {
            name: 'John Doe',
            feedback: 'Study-Hive has been a game-changer for my studies. The resources are top-notch!',
            image: 'https://i.ibb.co.com/VWJWLBB/cummins.jpg',
        },
        {
            name: 'Jane Smith',
            feedback: 'The features and support I received here were outstanding. Highly recommend!',
            image: 'https://i.ibb.co.com/gm9bZ0K/Kane-Williamson-1024x768.webp',
        },
        {
            name: 'Ali Khan',
            feedback: 'Great platform for students who want to achieve more in less time!',
            image: 'https://i.ibb.co.com/bryD8Cm/quinton-de-kock-09-10-2023.png',
        },
    ];

    return (
        <section className="text-center">
            <h2 className="text-4xl font-bold mb-5 text-green-600">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-5">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="border p-5 rounded-lg shadow-lg bg-base-100 hover:scale-105 duration-500 transform transition">
                        <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-20 h-20 rounded-full mx-auto mb-3"
                        />
                        <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                        <p className="text-gray-600 mt-2">{testimonial.feedback}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
