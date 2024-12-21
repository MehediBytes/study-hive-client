import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../pages/Loading";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    const location = useLocation();

    if (loading) {
        return <Loading></Loading>;
    }

    if (!user) return <Navigate to="/auth/login" state={{ from: location }} replace />;

    return children;
};

export default PrivateRoute;
