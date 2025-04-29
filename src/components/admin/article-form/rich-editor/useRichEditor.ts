
import { useState, useEffect } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link'; // Add Link extension

interface UseRichEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const useRichEditor = ({ value, onChange }: UseRichEditorProps) => {
  const [isCodeView, setIsCodeView] = useState(false);
  const [codeViewContent, setCodeViewContent] = useState(value);
  const [showLinkForm, setShowLinkForm] = useState(false); // State for link form visibility
  const [linkUrl, setLinkUrl] = useState(''); // State for link URL

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // disable to use custom heading configuration
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Underline, // Add the Underline extension
      Link.configure({
        openOnClick: false, // Don't open links on click in the editor
        linkOnPaste: true, // Automatically convert pasted URLs to links
        HTMLAttributes: {
          class: 'text-ilodata-600 hover:text-ilodata-800 cursor-pointer',
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
      setCodeViewContent(html);
    },
  });

  // Update editor content when value prop changes (important for editing existing articles)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
      setCodeViewContent(value);
    }
  }, [value, editor]);

  // Handle code view content changes
  const handleCodeViewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCodeViewContent(e.target.value);
    onChange(e.target.value);
    // Update editor content if we switch back to rich text
    if (editor) {
      editor.commands.setContent(e.target.value);
    }
  };

  // Toggle between rich text and code view
  const toggleCodeView = () => {
    setIsCodeView(!isCodeView);
    // Ensure content is synchronized
    if (editor && isCodeView) {
      // Switching from code to rich text
      editor.commands.setContent(codeViewContent);
    }
  };

  // Handle creating/editing a link
  const handleLinkSubmit = (url: string, isExternal: boolean) => {
    if (editor) {
      if (url) {
        // Process URL for internal links
        const finalUrl = isExternal || url.startsWith('http') ? url : `/${url.replace(/^\/+/, '')}`;
        
        editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: finalUrl })
          .run();
      }
      setShowLinkForm(false);
      setLinkUrl('');
    }
  };

  // Handle removing a link
  const removeLink = () => {
    if (editor) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      setShowLinkForm(false);
      setLinkUrl('');
    }
  };

  // Open link form and populate with current link if exists
  const openLinkForm = () => {
    if (editor) {
      const attrs = editor.getAttributes('link');
      if (attrs.href) {
        setLinkUrl(attrs.href);
      } else {
        setLinkUrl('');
      }
      setShowLinkForm(true);
    }
  };

  return {
    editor,
    isCodeView,
    codeViewContent,
    handleCodeViewChange,
    toggleCodeView,
    showLinkForm,
    setShowLinkForm,
    linkUrl,
    setLinkUrl,
    openLinkForm,
    handleLinkSubmit,
    removeLink
  };
};
