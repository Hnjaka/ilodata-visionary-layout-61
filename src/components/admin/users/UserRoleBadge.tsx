
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface UserRoleBadgeProps {
  role: string;
}

const UserRoleBadge: React.FC<UserRoleBadgeProps> = ({ role }) => {
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

export default UserRoleBadge;
