import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = sessionStorage.getItem('token');
  const userString = sessionStorage.getItem('user');
  
  if (!token || !userString) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userString);
    
    if (!allowedRoles.includes(user.type)) {
      switch (user.type) {
        case 'Admin':
          return <Navigate to="/adminhome" replace />;
        case 'Owner':
          return <Navigate to="/ownerhome" replace />;
        case 'Renter':
          return <Navigate to="/renterhome" replace />;
        default:
          return <Navigate to="/login" replace />;
      }
    }

    return children;
    
  } catch (error) {
    console.error('Error parsing user data:', error);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;