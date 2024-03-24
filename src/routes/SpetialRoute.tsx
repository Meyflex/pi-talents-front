// Updated import for useStores if necessary
import { useStores } from '../stores';

import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactElement;
}

export const SpetialRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { authenticationStore } = useStores();

  if (!authenticationStore.isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/apprenti/signUpOne" replace />;
  }else if(authenticationStore.isAuthenticated) {
    if(authenticationStore.UserType === "Apprenti"){
      return <Navigate to="apprenti/dashboard" replace />;
    }else if (authenticationStore.UserType === "Maitre"){
      return <Navigate to="MaitreApprentissage/dashboard" replace />;
    }
  }

  // Render the children (protected component) if authenticated
  return children;
};
