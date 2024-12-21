import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const AuthLayout = () => {
    return (
        <div className="max-w-6xl mx-auto bg-green-200">
            {/* Navbar */}
            <nav>
                <Navbar></Navbar>
            </nav>

            {/* Outlet */}
            <Outlet></Outlet>

            {/* Footer */}
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default AuthLayout;