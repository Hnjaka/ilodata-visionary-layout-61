
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface UserStatusBadgeProps {
  status?: string;
  isApproved?: boolean; // Added this prop to match usage in UsersTable
}

const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({ status, isApproved }) => {
  // If isApproved is provided directly, use that to determine status
  const userStatus = isApproved !== undefined
    ? isApproved ? 'active' : 'pending'
    : status;
    
  switch(userStatus) {
    case 'active':
    case true:
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Actif</Badge>;
    default:
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">En attente</Badge>;
  }
};

export default UserStatusBadge;
export type { UserStatusBadgeProps }; // Export the interface for type checking
