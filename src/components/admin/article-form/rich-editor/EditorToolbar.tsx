
import React from 'react';
import { Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon,
  Heading1,
  Heading2, 
  Heading3, 
  ListOrdered,
  List, 
  Quote
} from 'lucide-react';
import LinkEditor from './LinkEditor';

interface EditorToolbarProps {
  editor: Editor | null;
  isCodeView: boolean;
  showLinkForm: boolean;
  setShowLinkForm: (show: boolean) => void;
  linkUrl: string;
  setLinkUrl: (url: string) => void;
  onLinkSubmit: (url: string, isExternal: boolean) => void;
  onRemoveLink: () => void;
  onOpenLinkForm: () => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ 
  editor, 
  isCodeView, 
  showLinkForm,
  setShowLinkForm,
  linkUrl = '',
  onLinkSubmit,
  onRemoveLink,
  onOpenLinkForm
}) => {
  if (!editor || isCodeView) {
    return null;
  }

  const toggleFormat = (format: string) => {
    if (!editor) return;
    
    switch(format) {
      case 'bold':
        editor.chain().focus().toggleBold().run();
        break;
      case 'italic':
        editor.chain().focus().toggleItalic().run();
        break;
      case 'underline':
        editor.chain().focus().toggleUnderline().run();
        break;
      case 'h1':
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case 'h2':
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case 'h3':
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        break;
      case 'bulletList':
        editor.chain().focus().toggleBulletList().run();
        break;
      case 'orderedList':
        editor.chain().focus().toggleOrderedList().run();
        break;
      case 'blockquote':
        editor.chain().focus().toggleBlockquote().run();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Button 
        type="button"
        variant={editor.isActive('bold') ? 'secondary' : 'ghost'}
        size="sm" 
        onClick={() => toggleFormat('bold')}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button 
        type="button"
        variant={editor.isActive('italic') ? 'secondary' : 'ghost'}
        size="sm" 
        onClick={() => toggleFormat('italic')}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button 
        type="button"
        variant={editor.isActive('underline') ? 'secondary' : 'ghost'}
        size="sm" 
        onClick={() => toggleFormat('underline')}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>
      <span className="border-r h-6 mx-1"></span>
      <Button 
        type="button"
        variant={editor.isActive('heading', { level: 1 }) ? 'secondary' : 'ghost'}
        size="sm" 
        onClick={() => toggleFormat('h1')}
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button 
        type="button"
        variant={editor.isActive('heading', { level: 2 }) ? 'secondary' : 'ghost'}
        size="sm" 
        onClick={() => toggleFormat('h2')}
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button 
        type="button"
        variant={editor.isActive('heading', { level: 3 }) ? 'secondary' : 'ghost'}
        size="sm" 
        onClick={() => toggleFormat('h3')}
      >
        <Heading3 className="h-4 w-4" />
      </Button>
      <span className="border-r h-6 mx-1"></span>
      <Button 
        type="button"
        variant={editor.isActive('bulletList') ? 'secondary' : 'ghost'}
        size="sm" 
        onClick={() => toggleFormat('bulletList')}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button 
        type="button"
        variant={editor.isActive('orderedList') ? 'secondary' : 'ghost'}
        size="sm" 
        onClick={() => toggleFormat('orderedList')}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button 
        type="button"
        variant={editor.isActive('blockquote') ? 'secondary' : 'ghost'}
        size="sm" 
        onClick={() => toggleFormat('blockquote')}
      >
        <Quote className="h-4 w-4" />
      </Button>
      <span className="border-r h-6 mx-1"></span>
      <LinkEditor
        editor={editor}
        showForm={showLinkForm}
        setShowForm={setShowForm}
        initialUrl={linkUrl || ''}
        onSubmit={onLinkSubmit}
        onRemove={onRemoveLink}
      />
    </>
  );
};

export default EditorToolbar;
