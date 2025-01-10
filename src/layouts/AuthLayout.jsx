import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const AuthLayout = () => {
    return (
        <div>
            {/* Navbar */}
            <nav>
                <Navbar></Navbar>
            </nav>

            {/* Outlet */}
            <div className='max-w-6xl pt-32 mx-auto min-h-screen'>
                <Outlet></Outlet>
            </div>

            {/* Footer */}
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default AuthLayout;