import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const AuthLayout = () => {
    return (
        <div className="max-w-6xl mx-auto bg-teal-50">
            {/* Navbar */}
            <nav>
                
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