import React from 'react';
import Banner from '../components/Banner';
import { Helmet } from 'react-helmet-async';
import Features from '../components/Features';

const Home = () => {

    return (
        <div>
            <Helmet>
                <title>Study-Hive</title>
            </Helmet>
            {/* Banner section */}
            <header className='max-w-5xl mx-auto mb-10 rounded-xl'>
                <Banner></Banner>
            </header>

            {/* Features section */}
            <section className='max-w-5xl mx-auto mb-10 rounded-xl'>
                <Features></Features>
            </section>
        </div>
    );
};

export default Home;