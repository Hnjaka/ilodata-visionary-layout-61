
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface CodeViewProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CodeView: React.FC<CodeViewProps> = ({ value, onChange }) => {
  return (
    <Textarea
      value={value}
      onChange={onChange}
      className="min-h-[200px] font-mono text-sm p-3 border-none focus-visible:ring-0 resize-none w-full"
      placeholder="<p>Contenu de l'article en HTML...</p>"
    />
  );
};

export default CodeView;
