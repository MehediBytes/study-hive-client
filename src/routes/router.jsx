import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomeLayout from '../layouts/Homelayout';
import ErrorPage from '../pages/ErrorPage';
import AuthLayout from '../layouts/AuthLayout';
import Register from '../pages/Register';
import LogIn from '../pages/LogIn';
import PrivateRoute from './PrivateRoute';
import PendingAssignments from '../pages/PendingAssignments';
import CreateAssignments from '../pages/CreateAssignments';
import MyAssignments from '../pages/MyAssignments';
import Home from '../pages/Home';
import Assignments from '../pages/Assignments';


const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },          
            {
                path: "/assignments",
                element: <Assignments></Assignments>
            },          
            {
                path: "/pending-assignments",
                element: <PrivateRoute><PendingAssignments></PendingAssignments></PrivateRoute>
            },          
            {
                path: "/create-assignments",
                element: <PrivateRoute><CreateAssignments></CreateAssignments></PrivateRoute>
            },          
            {
                path: "/my-assignments",
                element: <PrivateRoute><MyAssignments></MyAssignments></PrivateRoute>
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