
import React, { useEffect, useState, useMemo } from 'react';
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
  
  // Mémoiser la décision de redirection pour éviter les re-rendus inutiles
  const redirectResult = useMemo(() => {
    if (!user) {
      return { redirect: true, path: "/auth", reason: "not_logged_in" };
    }
    
    if (!isApproved) {
      return { redirect: true, path: "/", reason: "not_approved" };
    }
    
    if (requireAdmin && !isAdmin) {
      return { redirect: true, path: "/", reason: "not_admin" };
    }
    
    return { redirect: false };
  }, [user, isAdmin, isApproved, requireAdmin]);
  
  useEffect(() => {
    // Only show toast messages once when needed
    if (!loading && !hasShownToast) {
      if (redirectResult.reason === "not_logged_in") {
        toast({
          title: "Accès non autorisé",
          description: "Vous devez vous connecter pour accéder à cette page.",
          variant: "destructive",
        });
        setHasShownToast(true);
      } else if (redirectResult.reason === "not_approved") {
        toast({
          title: "Accès non autorisé",
          description: "Votre compte doit être approuvé par un administrateur.",
          variant: "destructive",
        });
        setHasShownToast(true);
      } else if (redirectResult.reason === "not_admin") {
        toast({
          title: "Accès non autorisé",
          description: "Vous devez être administrateur pour accéder à cette page.",
          variant: "destructive",
        });
        setHasShownToast(true);
      }
    }
  }, [loading, redirectResult.reason, toast, hasShownToast]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (redirectResult.redirect) {
    return <Navigate to={redirectResult.path} replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
