// Updated import for useStores if necessary
import { useStores } from '../stores';

import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { authenticationStore } = useStores();

  if (!authenticationStore.isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the children (protected component) if authenticated
  return children;
};
