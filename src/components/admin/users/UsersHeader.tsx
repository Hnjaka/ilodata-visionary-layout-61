
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface UsersHeaderProps {
  onRefresh: () => Promise<void>;
  loading: boolean;
}

const UsersHeader: React.FC<UsersHeaderProps> = ({ onRefresh, loading }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestion des utilisateurs</h1>
        <p className="text-muted-foreground mt-1">
          Gérez les comptes utilisateurs, approuvez les nouveaux inscrits et mettez à jour les informations.
        </p>
      </div>
      <Button
        onClick={onRefresh}
        disabled={loading}
        variant="outline"
        size="sm"
        className="h-9"
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Actualiser
      </Button>
    </div>
  );
};

export default UsersHeader;
