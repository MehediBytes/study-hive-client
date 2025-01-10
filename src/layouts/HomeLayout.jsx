import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const HomeLayout = () => {
    return (
        <div>
            {/* Navbar section */}
            <nav>
                <Navbar></Navbar>
            </nav>

            {/* outlet */}
            <div className='max-w-6xl pt-28 mx-auto min-h-screen'>
                <Outlet></Outlet>
            </div>

            {/* Footer */}
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default HomeLayout;