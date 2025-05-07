
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DesktopNavLinks from './desktop/DesktopNavLinks';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

interface DesktopNavItemsProps {
  isAdmin?: boolean;
}

const DesktopNavItems: React.FC<DesktopNavItemsProps> = ({ isAdmin = false }) => {
  const navigate = useNavigate();
  
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <DesktopNavLinks />
      
      {isAdmin && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Settings className="h-4 w-4" /> 
              Gestion
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Administration</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={() => navigate('/admin/templates')}>
              Templates
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => navigate('/admin/guides')}>
              Guides
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => navigate('/admin/articles')}>
              Articles
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => navigate('/admin/users')}>
              Utilisateurs
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </nav>
  );
};

export default DesktopNavItems;
