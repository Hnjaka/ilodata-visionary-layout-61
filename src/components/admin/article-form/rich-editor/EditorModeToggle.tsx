
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Code } from 'lucide-react';

interface EditorModeToggleProps {
  isCodeView: boolean;
  toggleCodeView: () => void;
}

const EditorModeToggle: React.FC<EditorModeToggleProps> = ({ isCodeView, toggleCodeView }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-600">Mode HTML</span>
      <Switch 
        checked={isCodeView}
        onCheckedChange={toggleCodeView}
      />
      <Code className="h-4 w-4 text-slate-600" />
    </div>
  );
};

export default EditorModeToggle;
