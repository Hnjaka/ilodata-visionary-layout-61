
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
  
  // Memoize the redirection decision to avoid re-renders
  const redirectInfo = useMemo(() => {
    // Don't make any decisions while still loading
    if (loading) {
      return { shouldRedirect: false, path: "", reason: "" };
    }
    
    if (!user) {
      return { shouldRedirect: true, path: "/auth", reason: "not_logged_in" };
    }
    
    if (!isApproved) {
      return { shouldRedirect: true, path: "/", reason: "not_approved" };
    }
    
    if (requireAdmin && !isAdmin) {
      return { shouldRedirect: true, path: "/", reason: "not_admin" };
    }
    
    return { shouldRedirect: false, path: "", reason: "" };
  }, [user, isAdmin, isApproved, requireAdmin, loading]);
  
  // Show toast messages when redirection happens
  useEffect(() => {
    if (!loading && redirectInfo.shouldRedirect && !hasShownToast) {
      if (redirectInfo.reason === "not_logged_in") {
        toast({
          title: "Accès non autorisé",
          description: "Vous devez vous connecter pour accéder à cette page.",
          variant: "destructive",
        });
      } else if (redirectInfo.reason === "not_approved") {
        toast({
          title: "Accès non autorisé",
          description: "Votre compte doit être approuvé par un administrateur.",
          variant: "destructive",
        });
      } else if (redirectInfo.reason === "not_admin") {
        toast({
          title: "Accès non autorisé",
          description: "Vous devez être administrateur pour accéder à cette page.",
          variant: "destructive",
        });
      }
      
      setHasShownToast(true);
    }
  }, [loading, redirectInfo, toast, hasShownToast]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (redirectInfo.shouldRedirect) {
    return <Navigate to={redirectInfo.path} replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
