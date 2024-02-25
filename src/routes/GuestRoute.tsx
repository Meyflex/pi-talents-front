import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStores } from '../stores'; // Adjust the path as necessary

interface GuestRouteProps {
    children: React.ReactElement;
}

export const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
  const { authenticationStore } = useStores();

  if (authenticationStore.isAuthenticated) {
    if(authenticationStore.UserType === "Apprenti"){
      return <Navigate to="apprenti/dashboard" replace />;
    }else if (authenticationStore.UserType === "Maitre"){
      return <Navigate to="MaitreApprentissage/dashboard" replace />;
    }
  }

  // Render the children (login or public component) if not authenticated
  return children;
};
