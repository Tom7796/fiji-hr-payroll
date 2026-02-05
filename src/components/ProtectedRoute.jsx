import React from 'react';
import { useAuth } from '../context/AuthContext';
import Auth from './Auth';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return null; // Or a spinner

    if (!user) {
        return <Auth />;
    }

    return children;
};

export default ProtectedRoute;
