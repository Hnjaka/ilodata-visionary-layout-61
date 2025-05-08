
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface UserStatusBadgeProps {
  status?: string;
  isApproved?: boolean; // On conserve les deux props pour maintenir la compatibilité
}

const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({ status, isApproved }) => {
  // Logique simplifiée pour déterminer si l'utilisateur est actif
  let isActive = false;
  
  // On priorise isApproved s'il est défini
  if (isApproved !== undefined) {
    isActive = isApproved;
  } else if (status !== undefined) {
    // Sinon on utilise status
    isActive = status === 'active' || status === 'true';
  }
  
  // On utilise des classes Tailwind appropriées pour le contexte /guides
  return isActive ? (
    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Actif</Badge>
  ) : (
    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">En attente</Badge>
  );
};

export default UserStatusBadge;
export type { UserStatusBadgeProps }; // On exporte aussi le type pour la cohérence
