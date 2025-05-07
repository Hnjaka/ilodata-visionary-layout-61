
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { User, LogOut, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserDropdownMenuProps {
  user: any;
  isAdmin: boolean;
  onSignOut: () => Promise<void>;
}

const UserDropdownMenu: React.FC<UserDropdownMenuProps> = ({ 
  user, 
  isAdmin,
  onSignOut 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default to avoid navigation issues
    try {
      console.log("Logout clicked in UserDropdownMenu");
      await onSignOut();
      
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès."
      });
      
      navigate('/', { replace: true });
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      toast({
        title: "Erreur de déconnexion",
        description: "Un problème est survenu lors de la déconnexion.",
        variant: "destructive"
      });
    }
  };

  if (!user) return null;
  
  const userEmail = user?.email || "Utilisateur";
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <User className="h-4 w-4" /> 
          {userEmail.split('@')[0]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => navigate('/account')}>
          <User className="h-4 w-4 mr-2" /> Profil
        </DropdownMenuItem>
        
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Administration</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigate('/admin/templates')}>
              Templates
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/admin/guides')}>
              Guides
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/admin/blog')}>
              Blog
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/admin/articles')}>
              Articles
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/admin/users')}>
              Utilisateurs
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
          <LogOut className="h-4 w-4 mr-2" /> Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
