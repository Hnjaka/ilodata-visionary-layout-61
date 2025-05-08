
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface UserStatusBadgeProps {
  status?: string;
  isApproved?: boolean; // Added this prop to match usage in UsersTable
}

const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({ status, isApproved }) => {
  // Instead of comparing types, let's use a more straightforward approach
  // If isApproved is provided directly, use that to determine active status
  let isActive = false;
  
  if (isApproved !== undefined) {
    isActive = isApproved;
  } else if (status !== undefined) {
    // Handle string status
    isActive = status === 'active' || status === 'true';
  }
  
  if (isActive) {
    return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Actif</Badge>;
  } else {
    return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">En attente</Badge>;
  }
};

export default UserStatusBadge;
export type { UserStatusBadgeProps }; // Export the interface for type checking
