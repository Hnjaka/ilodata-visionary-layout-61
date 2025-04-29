
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
    toggleCodeView,
    showLinkForm,
    setShowLinkForm,
    linkUrl,
    setLinkUrl,
    openLinkForm,
    handleLinkSubmit,
    removeLink
  } = useRichEditor({ value, onChange });

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-slate-100 p-2 border-b flex flex-wrap gap-1 items-center justify-between">
        <div className="flex flex-wrap gap-1">
          <EditorToolbar 
            editor={editor} 
            isCodeView={isCodeView}
            showLinkForm={showLinkForm}
            setShowLinkForm={setShowLinkForm}
            linkUrl={linkUrl}
            setLinkUrl={setLinkUrl}
            onLinkSubmit={handleLinkSubmit}
            onRemoveLink={removeLink}
            onOpenLinkForm={openLinkForm}
          />
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
