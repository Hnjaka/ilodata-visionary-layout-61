
import React, { useEffect, useState, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useUsersAdmin } from '@/hooks/auth/useUsersAdmin';
import UsersHeader from '@/components/admin/users/UsersHeader';
import UsersTable from '@/components/admin/users/UsersTable';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import LoadingSpinner from '@/components/LoadingSpinner';

interface UserData {
  id: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  is_approved: boolean;
  role: string;
  created_at: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const { 
    fetchUsers, 
    approveUser, 
    deleteUser, 
    updateUserRole,
    updateUserProfile,
    loading 
  } = useUsersAdmin();

  const loadUsers = useCallback(async () => {
    const data = await fetchUsers();
    setUsers(data);
  }, [fetchUsers]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const AdminContent = () => (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <UsersHeader onRefresh={loadUsers} loading={loading} />
        
        {loading && !users.length ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <UsersTable 
              users={users}
              onApprove={approveUser}
              onDelete={deleteUser}
              onUpdateRole={updateUserRole}
              onUpdateProfile={updateUserProfile}
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
