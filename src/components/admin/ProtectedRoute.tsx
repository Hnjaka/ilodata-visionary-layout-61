
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = true 
}) => {
  const { user, loading, isAdmin, isApproved } = useAuth();
  const { toast } = useToast();
  const [hasShownToast, setHasShownToast] = useState(false);
  
  useEffect(() => {
    // Only show toast messages once when needed
    if (!loading && !hasShownToast) {
      if (!user) {
        toast({
          title: "Accès non autorisé",
          description: "Vous devez vous connecter pour accéder à cette page.",
          variant: "destructive",
        });
        setHasShownToast(true);
      } else if (!isApproved) {
        toast({
          title: "Accès non autorisé",
          description: "Votre compte doit être approuvé par un administrateur.",
          variant: "destructive",
        });
        setHasShownToast(true);
      } else if (requireAdmin && !isAdmin) {
        toast({
          title: "Accès non autorisé",
          description: "Vous devez être administrateur pour accéder à cette page.",
          variant: "destructive",
        });
        setHasShownToast(true);
      }
    }
  }, [user, loading, isAdmin, isApproved, requireAdmin, toast, hasShownToast]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  if (!isApproved) {
    return <Navigate to="/" replace />;
  }
  
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
