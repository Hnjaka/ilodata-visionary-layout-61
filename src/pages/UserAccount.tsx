
import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import DeleteAccountDialog from '@/components/auth/DeleteAccountDialog';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const UserAccount = () => {
  const { user, loading, signOut } = useAuth();
  
  // Redirect if not logged in
  if (!loading && !user) {
    return <Navigate to="/auth" />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold mb-6">Mon compte</h1>
            
            {loading ? (
              <p>Chargement...</p>
            ) : (
              <>
                <div className="space-y-4 mb-8">
                  <div className="p-4 border rounded">
                    <h2 className="text-lg font-medium mb-2">Informations de base</h2>
                    <p><strong>Email :</strong> {user?.email}</p>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h2 className="text-lg font-medium mb-4">Actions du compte</h2>
                  <div className="flex flex-wrap gap-4">
                    <Button
                      variant="outline"
                      onClick={signOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Déconnexion
                    </Button>
                    
                    <DeleteAccountDialog />
                  </div>
                </div>
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
