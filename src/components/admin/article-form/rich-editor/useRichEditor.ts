
import { useState, useEffect } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Underline from '@tiptap/extension-underline';

interface UseRichEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const useRichEditor = ({ value, onChange }: UseRichEditorProps) => {
  const [isCodeView, setIsCodeView] = useState(false);
  const [codeViewContent, setCodeViewContent] = useState(value);

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

  return {
    editor,
    isCodeView,
    codeViewContent,
    handleCodeViewChange,
    toggleCodeView
  };
};
