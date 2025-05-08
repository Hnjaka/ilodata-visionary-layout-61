
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface UserStatusBadgeProps {
  status: 'active' | 'pending' | string;
}

const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({ status }) => {
  switch(status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Actif</Badge>;
    default:
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">En attente</Badge>;
  }
};

export default UserStatusBadge;
