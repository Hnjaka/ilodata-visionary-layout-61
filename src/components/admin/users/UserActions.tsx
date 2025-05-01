
import React from 'react';
import { UserCheck, Pencil, Shield, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface UserActionsProps {
  userId: string;
  isApproved: boolean;
  onApprove: (userId: string) => Promise<boolean>;
  onDelete: (userId: string) => void;
  onEdit: () => void;
  onRoleUpdate: (userId: string, role: string) => Promise<boolean>;
  loading: boolean;
}

const UserActions: React.FC<UserActionsProps> = ({
  userId,
  isApproved,
  onApprove,
  onDelete,
  onEdit,
  onRoleUpdate,
  loading
}) => {
  return (
    <div className="flex space-x-2">
      {!isApproved && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onApprove(userId)}
          disabled={loading}
        >
          <UserCheck className="h-4 w-4 mr-1" />
          Approuver
        </Button>
      )}
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={onEdit}
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
          <DropdownMenuItem onClick={() => onRoleUpdate(userId, 'admin')}>
            Admin
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onRoleUpdate(userId, 'moderator')}>
            Modérateur
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onRoleUpdate(userId, 'user')}>
            Utilisateur
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button 
        variant="destructive"
        size="sm"
        onClick={() => onDelete(userId)}
        disabled={loading}
      >
        <X className="h-4 w-4 mr-1" />
        Supprimer
      </Button>
    </div>
  );
};

export default UserActions;
