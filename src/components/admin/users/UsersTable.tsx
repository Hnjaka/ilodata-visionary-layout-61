
import React, { useState } from 'react';
import { CheckCircle, X, Pencil, UserCheck, Shield, User } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import EditUserDialog from './EditUserDialog';

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

  const handleApproveClick = async (userId: string) => {
    await onApprove(userId);
    // Ne pas appeler onRefresh ici, il sera géré par le parent
  };

  const handleDeleteClick = (userId: string) => {
    setSelectedUserId(userId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedUserId) {
      await onDelete(selectedUserId);
      // Ne pas appeler onRefresh ici, il sera géré par le parent
      setDeleteDialogOpen(false);
      setSelectedUserId(null);
    }
  };

  const handleEditClick = (user: UserData) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleRoleUpdate = async (userId: string, newRole: string) => {
    console.log(`Updating user ${userId} role to: ${newRole}`);
    await onUpdateRole(userId, newRole);
    // Ne pas appeler onRefresh ici, il sera géré par le parent
  };

  const renderRoleBadge = (role: string) => {
    // Normalize role for display
    const normalizedRole = (role || '').toLowerCase();
    
    switch (normalizedRole) {
      case 'admin':
        return <Badge className="bg-red-500">Admin</Badge>;
      case 'moderator':
      case 'modérateur':
        return <Badge className="bg-blue-500">Modérateur</Badge>;
      default:
        return <Badge className="bg-gray-500">Utilisateur</Badge>;
    }
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
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                Aucun utilisateur trouvé
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.first_name || user.last_name 
                    ? `${user.first_name || ''} ${user.last_name || ''}`.trim() 
                    : '-'}
                </TableCell>
                <TableCell>{renderRoleBadge(user.role)}</TableCell>
                <TableCell>
                  {user.is_approved 
                    ? <Badge className="bg-green-500">Approuvé</Badge> 
                    : <Badge className="bg-orange-500">En attente</Badge>}
                </TableCell>
                <TableCell>{formatDate(user.created_at)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {!user.is_approved && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleApproveClick(user.id)}
                        disabled={loading}
                      >
                        <UserCheck className="h-4 w-4 mr-1" />
                        Approuver
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditClick(user)}
                      disabled={loading}
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Modifier
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Shield className="h-4 w-4 mr-1" />
                          Rôle
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleRoleUpdate(user.id, 'admin')}>
                          Admin
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRoleUpdate(user.id, 'moderator')}>
                          Modérateur
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRoleUpdate(user.id, 'user')}>
                          Utilisateur
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <Button 
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteClick(user.id)}
                      disabled={loading}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Supprimer
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      {/* Confirmation dialog for user deletion */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer l'utilisateur</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-500 hover:bg-red-600">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Dialog for editing user */}
      {selectedUser && (
        <EditUserDialog 
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          user={selectedUser}
          onSave={async (data) => {
            if (selectedUser) {
              await onUpdateProfile(selectedUser.id, data);
              setEditDialogOpen(false);
              // Ne pas appeler onRefresh ici, il sera géré par le parent
            }
          }}
        />
      )}
    </>
  );
};

export default UsersTable;
