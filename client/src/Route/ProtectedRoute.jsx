import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'

const ProtectedRoute = ({children}) => {
    const {token} = useAuth();
 
    if(token){
        return children
    }else{
        return <Navigate to='/login' replace />
    }
};

export default ProtectedRoute;
