
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface UserStatusBadgeProps {
  isApproved: boolean;
}

const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({ isApproved }) => {
  return isApproved 
    ? <Badge className="bg-green-500">Approuvé</Badge> 
    : <Badge className="bg-orange-500">En attente</Badge>;
};

export default UserStatusBadge;
