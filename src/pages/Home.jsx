import React from 'react';
import Banner from '../components/Banner';
import { Helmet } from 'react-helmet-async';
import Features from '../components/Features';
import FAQ from '../components/Faq';

const Home = () => {

    return (
        <div>
            <Helmet>
                <title>Study-Hive</title>
            </Helmet>
            {/* Banner section */}
            <header className='max-w-5xl mx-auto mb-10'>
                <Banner></Banner>
            </header>

            {/* Features section */}
            <section className='max-w-5xl mx-auto mb-10'>
                <Features></Features>
            </section>

            {/* FAQ section */}
            <section className='max-w-5xl mx-auto mb-10'>
                <FAQ></FAQ>
            </section>
        </div>
    );
};

export default Home;