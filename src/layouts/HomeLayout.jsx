import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const HomeLayout = () => {
    return (
        <div className="max-w-6xl mx-auto bg-green-200">
            {/* Navbar section */}
            <nav>
                <Navbar></Navbar>
            </nav>

            {/* outlet */}
            <Outlet></Outlet>

            {/* Footer */}
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default HomeLayout;