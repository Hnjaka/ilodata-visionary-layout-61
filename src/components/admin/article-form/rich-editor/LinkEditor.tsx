
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, ExternalLink } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface LinkEditorProps {
  editor: any;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  initialUrl: string;
  onSubmit: (url: string, isExternal: boolean) => void;
  onRemove: () => void;
}

const LinkEditor: React.FC<LinkEditorProps> = ({
  editor,
  showForm,
  setShowForm,
  initialUrl,
  onSubmit,
  onRemove
}) => {
  const [url, setUrl] = useState(initialUrl);
  const [isExternal, setIsExternal] = useState(initialUrl.startsWith('http') || false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(url, isExternal);
  };
  
  const isActive = editor?.isActive('link');
  
  return (
    <Popover open={showForm} onOpenChange={setShowForm}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={isActive ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => setShowForm(true)}
        >
          {isActive ? <ExternalLink className="h-4 w-4" /> : <Link className="h-4 w-4" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <h4 className="font-medium text-sm">Ajouter un lien</h4>
            <p className="text-xs text-muted-foreground">
              {isExternal ? "Lien externe (URL complète)" : "Lien interne (chemin relatif)"}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant={isExternal ? "default" : "outline"}
                size="sm"
                onClick={() => setIsExternal(true)}
              >
                <ExternalLink className="h-4 w-4 mr-1" /> Externe
              </Button>
              <Button 
                type="button" 
                variant={isExternal ? "outline" : "default"}
                size="sm"
                onClick={() => setIsExternal(false)}
              >
                <Link className="h-4 w-4 mr-1" /> Interne
              </Button>
            </div>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={isExternal ? "https://example.com" : "/modeles"}
            />
          </div>
          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => {
                onRemove();
                setShowForm(false);
              }}
              disabled={!isActive}
            >
              Supprimer le lien
            </Button>
            <div className="space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => setShowForm(false)}
              >
                Annuler
              </Button>
              <Button type="submit" size="sm">
                Appliquer
              </Button>
            </div>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default LinkEditor;
