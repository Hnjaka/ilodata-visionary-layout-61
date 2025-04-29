
import React from 'react';
import { EditorContent } from '@tiptap/react';
import EditorToolbar from './EditorToolbar';
import EditorModeToggle from './EditorModeToggle';
import CodeView from './CodeView';
import { useRichEditor } from './useRichEditor';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const {
    editor,
    isCodeView,
    codeViewContent,
    handleCodeViewChange,
    toggleCodeView
  } = useRichEditor({ value, onChange });

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-slate-100 p-2 border-b flex flex-wrap gap-1 items-center justify-between">
        <div className="flex flex-wrap gap-1">
          <EditorToolbar editor={editor} isCodeView={isCodeView} />
        </div>
        <EditorModeToggle 
          isCodeView={isCodeView}
          toggleCodeView={toggleCodeView}
        />
      </div>
      <div className="min-h-[200px]">
        {isCodeView ? (
          <CodeView 
            value={codeViewContent} 
            onChange={handleCodeViewChange} 
          />
        ) : (
          <div className="p-3 min-h-[200px] prose prose-slate max-w-none">
            <EditorContent editor={editor} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RichTextEditor;
