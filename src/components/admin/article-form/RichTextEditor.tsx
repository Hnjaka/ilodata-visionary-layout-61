
import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Underline from '@tiptap/extension-underline';
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

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // disable to use custom heading configuration
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Underline, // Add the Underline extension
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update editor content when value prop changes (important for editing existing articles)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  const toggleFormat = (format: string) => {
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
    <div className="border rounded-md overflow-hidden">
      <div className="bg-slate-100 p-2 border-b flex flex-wrap gap-1">
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
      </div>
      <div className="p-3 min-h-[200px] prose prose-slate max-w-none">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
