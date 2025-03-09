import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../Context/AuthStore';

const ProtectedRoute = ({ children }) => {
    const { Token } = useAuthStore();

    if (Token) {
        return children
    } else {
        return <Navigate to='/login' replace />

    }
};

export default ProtectedRoute;
