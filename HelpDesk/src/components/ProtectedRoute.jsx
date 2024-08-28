import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (currentUser === null) {
        return <Navigate to="/signup" />;
    }

    return children;
};

ProtectedRoute .propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
