import React from 'react';
import Banner from '../components/Banner';
import { Helmet } from 'react-helmet-async';

const Home = () => {

    return (
        <div>
            <Helmet>
                <title>Study-Hive</title>
            </Helmet>
            {/* Banner/Slider section */}
            <header className='max-w-5xl mx-auto mb-10 rounded-xl'>
                <Banner></Banner>
            </header>
        </div>
    );
};

export default Home;