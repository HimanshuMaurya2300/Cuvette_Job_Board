import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null;
};

const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
