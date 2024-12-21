import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomeLayout from '../layouts/Homelayout';
import ErrorPage from '../pages/ErrorPage';
import AuthLayout from '../layouts/AuthLayout';
import Register from '../pages/Register';
import LogIn from '../pages/LogIn';


const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <h2>Home</h2>
            },          
            {
                path: "/assignments",
                element: <h2>All assignments are comming here</h2>
            },          
            {
                path: "/pending-assignments",
                element: <h2>Pending assignments are comming here</h2>
            },          
            {
                path: "/create-assignments",
                element: <h2>Creating of assignments are comming here</h2>
            },          
            {
                path: "/my-assignments",
                element: <h2>My assignments are comming here</h2>
            },          
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: "/auth/login",
                element: <LogIn></LogIn>,
            },
            {
                path: "/auth/register",
                element: <Register></Register>,
            }
        ]
    }
]);

export default router;