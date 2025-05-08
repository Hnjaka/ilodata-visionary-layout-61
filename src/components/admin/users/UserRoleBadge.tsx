
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface UserRoleBadgeProps {
  role: 'admin' | 'editor' | 'user' | string;
}

const UserRoleBadge: React.FC<UserRoleBadgeProps> = ({ role }) => {
  switch(role) {
    case 'admin':
      return (
        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
          Admin
        </Badge>
      );
    case 'editor':
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
          Éditeur
        </Badge>
      );
    default:
      return (
        <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-200">
          Utilisateur
        </Badge>
      );
  }
};

export default UserRoleBadge;
