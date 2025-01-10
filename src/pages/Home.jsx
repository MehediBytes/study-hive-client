import React from 'react';
import Banner from '../components/Banner';
import { Helmet } from 'react-helmet-async';
import Features from '../components/Features';
import FAQ from '../components/Faq';
import ContactUs from '../components/ContactUs';

const Home = () => {

    return (
        <div>
            <Helmet>
                <title>Study-Hive</title>
            </Helmet>
            {/* Banner section */}
            <header className='mb-10 px-5'>
                <Banner></Banner>
            </header>

            {/* Features section */}
            <section className='mb-10'>
                <Features></Features>
            </section>

            {/* Testimonials sections */}

            {/* FAQ section */}
            <section id='faq' className='mb-10'>
                <FAQ></FAQ>
            </section>

            {/* Contact-us section */}
            <section id='contact-us' className='mb-10'>
                <ContactUs></ContactUs>
            </section>
        </div>
    );
};

export default Home;