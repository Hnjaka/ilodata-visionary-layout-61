
import React, { useEffect, useState, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useUsersAdmin, UserData } from '@/hooks/admin/users/useUsersAdmin';
import UsersHeader from '@/components/admin/users/UsersHeader';
import UsersTable from '@/components/admin/users/UsersTable';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';

const AdminUsers = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const { 
    fetchUsers, 
    approveUser, 
    deleteUser, 
    updateUserRole,
    updateUserProfile,
    loading 
  } = useUsersAdmin();
  const { toast } = useToast();

  // Fonction pour charger les utilisateurs avec meilleure gestion d'erreurs
  const loadUsers = useCallback(async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger la liste des utilisateurs",
        variant: "destructive",
      });
    } finally {
      setInitialLoading(false);
    }
  }, [fetchUsers, toast]);

  // Effet pour charger les utilisateurs au montage du composant
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleApproveUser = async (userId: string) => {
    try {
      const success = await approveUser(userId);
      if (success) {
        toast({
          title: "Succès",
          description: "L'utilisateur a été approuvé avec succès",
        });
        // Mettre à jour l'état local pour refléter le changement immédiatement
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === userId 
              ? { ...user, is_approved: true } 
              : user
          )
        );
      }
      return success;
    } catch (error) {
      console.error("Erreur lors de l'approbation:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'approuver l'utilisateur",
        variant: "destructive",
      });
      return false;
    }
  };
  
  const handleDeleteUser = async (userId: string) => {
    try {
      const success = await deleteUser(userId);
      if (success) {
        toast({
          title: "Succès",
          description: "L'utilisateur a été supprimé avec succès",
        });
        // Mettre à jour l'état local pour refléter le changement immédiatement
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      }
      return success;
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'utilisateur",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleUpdateRole = async (userId: string, role: string) => {
    try {
      const success = await updateUserRole(userId, role);
      if (success) {
        toast({
          title: "Succès",
          description: `Le rôle a été modifié en "${role}"`,
        });
        // Mettre à jour l'état local pour refléter le changement immédiatement
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === userId 
              ? { ...user, role } 
              : user
          )
        );
      }
      return success;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du rôle:", error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier le rôle de l'utilisateur",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleUpdateProfile = async (userId: string, data: { first_name?: string; last_name?: string; email?: string }) => {
    try {
      const success = await updateUserProfile(userId, data);
      if (success) {
        toast({
          title: "Succès",
          description: "Le profil a été mis à jour avec succès",
        });
        // Mettre à jour l'état local pour refléter le changement immédiatement
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === userId 
              ? { ...user, ...data } 
              : user
          )
        );
      }
      return success;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le profil",
        variant: "destructive",
      });
      return false;
    }
  };

  const AdminContent = () => (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <UsersHeader onRefresh={loadUsers} loading={loading} />
        
        {initialLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <UsersTable 
              users={users}
              onApprove={handleApproveUser}
              onDelete={handleDeleteUser}
              onUpdateRole={handleUpdateRole}
              onUpdateProfile={handleUpdateProfile}
              onRefresh={loadUsers}
              loading={loading}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );

  return (
    <ProtectedRoute requireAdmin>
      <AdminContent />
    </ProtectedRoute>
  );
};

export default AdminUsers;
