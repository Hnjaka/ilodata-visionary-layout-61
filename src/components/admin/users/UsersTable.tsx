
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import EditUserDialog from './EditUserDialog';
import UserRoleBadge from './UserRoleBadge';
import UserStatusBadge from './UserStatusBadge';
import UserActions from './UserActions';
import DeleteUserDialog from './DeleteUserDialog';

interface UserData {
  id: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  is_approved: boolean;
  role: string;
  created_at: string;
  last_sign_in_at?: string | null;
}

interface UsersTableProps {
  users: UserData[];
  onApprove: (userId: string) => Promise<boolean>;
  onDelete: (userId: string) => Promise<boolean>;
  onUpdateRole: (userId: string, role: string) => Promise<boolean>;
  onUpdateProfile: (userId: string, data: { first_name?: string; last_name?: string; email?: string }) => Promise<boolean>;
  onRefresh: () => Promise<void>;
  loading: boolean;
}

const UsersTable: React.FC<UsersTableProps> = ({ 
  users, 
  onApprove, 
  onDelete, 
  onUpdateRole,
  onUpdateProfile, 
  onRefresh,
  loading 
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [localUsers, setLocalUsers] = useState<UserData[]>(users);

  // Synchroniser l'état local avec les props
  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  const handleApproveClick = async (userId: string) => {
    const success = await onApprove(userId);
    
    if (success) {
      // Mettre à jour l'état local pour avoir un feedback instantané
      setLocalUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId 
            ? { ...user, is_approved: true } 
            : user
        )
      );
    }
    
    return success;
  };

  const handleDeleteClick = (userId: string) => {
    setSelectedUserId(userId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedUserId) {
      const success = await onDelete(selectedUserId);
      
      if (success) {
        // Mettre à jour l'état local pour avoir un feedback instantané
        setLocalUsers(prevUsers => prevUsers.filter(user => user.id !== selectedUserId));
        setDeleteDialogOpen(false);
        setSelectedUserId(null);
      }
      
      return success;
    }
    return false;
  };

  const handleEditClick = (user: UserData) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleRoleUpdate = async (userId: string, newRole: string) => {
    console.log(`Updating user ${userId} role to: ${newRole}`);
    const success = await onUpdateRole(userId, newRole);
    
    if (success) {
      // Mettre à jour l'état local pour avoir un feedback instantané
      setLocalUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId 
            ? { ...user, role: newRole } 
            : user
        )
      );
    }
    
    return success;
  };

  const handleProfileUpdate = async (data: { first_name?: string; last_name?: string; email?: string }) => {
    if (selectedUser) {
      const success = await onUpdateProfile(selectedUser.id, data);
      
      if (success) {
        // Mettre à jour l'état local pour avoir un feedback instantané
        setLocalUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === selectedUser.id 
              ? { ...user, ...data } 
              : user
          )
        );
        setEditDialogOpen(false);
      }
      
      return success;
    }
    return false;
  };

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return 'Jamais';
    return format(new Date(dateStr), 'dd/MM/yyyy HH:mm', { locale: fr });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date d'inscription</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {localUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                Aucun utilisateur trouvé
              </TableCell>
            </TableRow>
          ) : (
            localUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.first_name || user.last_name 
                    ? `${user.first_name || ''} ${user.last_name || ''}`.trim() 
                    : '-'}
                </TableCell>
                <TableCell>
                  <UserRoleBadge role={user.role} />
                </TableCell>
                <TableCell>
                  <UserStatusBadge isApproved={user.is_approved} />
                </TableCell>
                <TableCell>{formatDate(user.created_at)}</TableCell>
                <TableCell>
                  <UserActions 
                    userId={user.id}
                    isApproved={user.is_approved}
                    onApprove={handleApproveClick}
                    onDelete={handleDeleteClick}
                    onEdit={() => handleEditClick(user)}
                    onRoleUpdate={handleRoleUpdate}
                    loading={loading}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      {/* Delete confirmation dialog */}
      <DeleteUserDialog 
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
      />
      
      {/* Dialog for editing user */}
      {selectedUser && (
        <EditUserDialog 
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          user={selectedUser}
          onSave={handleProfileUpdate}
        />
      )}
    </>
  );
};

export default UsersTable;
