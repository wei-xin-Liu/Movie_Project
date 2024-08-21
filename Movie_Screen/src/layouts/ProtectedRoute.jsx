import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';

const ProtectedRoute = ({ element, ...rest }) => {
    const { token } = useStateContext();
    
    // Redirect to home with query parameter if not authenticated
    if (!token) {
        return <Navigate to="/?showLogin=true" />;
    }

    // Render the protected component if authenticated
    return element;
};

export default ProtectedRoute;
