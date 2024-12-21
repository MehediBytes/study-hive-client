import React from 'react';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
    return (
        <div className="max-w-6xl mx-auto bg-teal-50">
            {/* Navbar section */}
            <nav>
                <h2>Main-Layout</h2>
            </nav>

            {/* outlet */}
            <Outlet></Outlet>

            {/* Footer */}
            <footer>
                
            </footer>
        </div>
    );
};

export default HomeLayout;