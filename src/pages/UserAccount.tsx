
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import DeleteAccountDialog from '@/components/auth/DeleteAccountDialog';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import ProfileForm from '@/components/auth/ProfileForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const UserAccount = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  // Add debug logs
  useEffect(() => {
    console.log("UserAccount rendered, user:", user, "loading:", loading);
    
    // Set loading state based on auth loading
    if (!loading) {
      setIsLoading(false);
    }
  }, [user, loading]);

  // Handle sign out
  const handleSignOut = async () => {
    try {
      console.log("Signing out from account page");
      await signOut();
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès."
      });
      navigate('/', { replace: true });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Erreur de déconnexion",
        description: "Un problème est survenu lors de la déconnexion.",
        variant: "destructive"
      });
    }
  };
  
  // Redirect if not logged in
  if (!loading && !user) {
    console.log("User not logged in, redirecting to auth");
    return <Navigate to="/auth" />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold mb-6">Mon compte</h1>
            
            {isLoading ? (
              <p className="text-center py-4">Chargement...</p>
            ) : (
              <>
                <Tabs defaultValue="profile" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="profile">Profil</TabsTrigger>
                    <TabsTrigger value="account">Compte</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="profile" className="space-y-4">
                    {user && <ProfileForm user={user} />}
                  </TabsContent>
                  
                  <TabsContent value="account" className="space-y-4">
                    <div className="p-4 border rounded">
                      <h2 className="text-lg font-medium mb-2">Informations de base</h2>
                      <p><strong>Email :</strong> {user?.email}</p>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h2 className="text-lg font-medium mb-4">Actions du compte</h2>
                      <div className="flex flex-wrap gap-4">
                        <Button
                          variant="outline"
                          onClick={handleSignOut}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Déconnexion
                        </Button>
                        
                        <DeleteAccountDialog />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserAccount;
