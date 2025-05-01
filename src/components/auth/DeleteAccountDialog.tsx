
import React, { useState } from 'react';
import { useAccountManagement } from '@/hooks/auth/useAccountManagement';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface DeleteAccountDialogProps {
  className?: string;
}

const DeleteAccountDialog: React.FC<DeleteAccountDialogProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteAccount, loading } = useAccountManagement();
  
  const handleDeleteAccount = async () => {
    const success = await deleteAccount();
    if (success) {
      setIsOpen(false);
    }
  };
  
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button 
          variant="destructive" 
          className={className}
          size="sm"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Supprimer mon compte
        </Button>
      </AlertDialogTrigger>
      
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer votre compte ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Toutes vos données personnelles seront supprimées définitivement.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Annuler</AlertDialogCancel>
          <AlertDialogAction 
            onClick={(e) => {
              e.preventDefault();
              handleDeleteAccount();
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={loading}
          >
            {loading ? "Suppression..." : "Oui, supprimer mon compte"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAccountDialog;
