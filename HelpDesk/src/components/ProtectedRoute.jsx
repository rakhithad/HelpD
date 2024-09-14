// /frontend/src/components/ProtectedRoute.jsx

import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PropTypes from 'prop-types';


const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        // If not logged in, redirect to login
        return <Navigate to="/login" />;
    }

    // If logged in, render the children components (protected content)
    return children;
};
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
