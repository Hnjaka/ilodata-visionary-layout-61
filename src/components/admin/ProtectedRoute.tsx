
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { user, loading, isAdmin, isApproved } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);
  
  // Debug information
  useEffect(() => {
    console.log('ProtectedRoute Debug:', { 
      user: user?.email,
      loading,
      isAdmin,
      isApproved,
      adminOnly
    });
    
    // Mark auth as checked after the initial load
    if (!loading && !authChecked) {
      setAuthChecked(true);
    }
  }, [user, loading, isAdmin, isApproved, adminOnly, authChecked]);
  
  // Show loading spinner while authentication state is being determined
  // But only on the initial load to prevent flickering
  if (loading && !authChecked) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  
  // If user is not logged in, redirect to login page
  if (!user) {
    console.log('ProtectedRoute: Not logged in, redirecting to auth');
    return <Navigate to="/auth" replace />;
  }
  
  // If admin access is required but user is not an admin
  if (adminOnly && !isAdmin) {
    console.log('ProtectedRoute: Admin access required but user is not admin, redirecting to home');
    return <Navigate to="/" replace />;
  }
  
  // If user is not approved
  if (!isApproved) {
    console.log('ProtectedRoute: User is not approved, redirecting to home');
    return <Navigate to="/" replace />;
  }
  
  // Otherwise, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
