import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <Helmet>
                <title>Error-Page | Study-Hive</title>
            </Helmet>
            <h1 className="text-6xl font-bold text-red-500 mb-5">OPPS!</h1>
            <p className="text-xl font-bold mb-5">404 - Page Not Found</p>
            <p className="mb-3 text-md font-medium text-gray-500">The page you are looking for might have been removed <br />had its name changed or is temporarily unavailable.</p>
            <Link to='/'>
                <button className="btn rounded-full bg-green-700 text-white hover:bg-green-500">GO TO HOMEPAGE</button>
            </Link>
        </div>
    );
};

export default ErrorPage;