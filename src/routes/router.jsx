import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomeLayout from '../layouts/Homelayout';
import ErrorPage from '../pages/ErrorPage';
import AuthLayout from '../layouts/AuthLayout';

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <h2>Home</h2>
            }          
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: "/auth/login",
                element: <h2>Login</h2>,
            },
            {
                path: "/auth/register",
                element: <h2>Register</h2>,
            }
        ]
    }
]);

export default router;