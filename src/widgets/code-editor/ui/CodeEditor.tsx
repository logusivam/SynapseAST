import React, { useEffect, useRef } from 'react';
import MonacoEditor, { Monaco } from '@monaco-editor/react';
import { useWorkspaceStore } from '@/entities/workspace/model/store';
import { parseSourceCode } from '@/features/ast-parse/model/parser';

// Helper to find the deepest node covering cursor offset
function findDeepestNodeAtOffset(node: any, offset: number): any | null {
  if (!node || typeof node.start !== 'number' || typeof node.end !== 'number') return null;
  if (node.start > offset || node.end < offset) return null;

  let deepestChild: any = null;

  for (const key in node) {
    if (key === 'loc' || key === 'start' || key === 'end' || key === 'tokens') continue;
    const value = node[key];
    if (value && typeof value === 'object') {
      if (value.type && typeof value.start === 'number' && typeof value.end === 'number') {
        const found = findDeepestNodeAtOffset(value, offset);
        if (found) {
          if (!deepestChild || found.end - found.start < deepestChild.end - deepestChild.start) {
            deepestChild = found;
          }
        }
      } else if (Array.isArray(value)) {
        for (const item of value) {
          if (item && item.type && typeof item.start === 'number' && typeof item.end === 'number') {
            const found = findDeepestNodeAtOffset(item, offset);
            if (found) {
              if (
                !deepestChild ||
                found.end - found.start < deepestChild.end - deepestChild.start
              ) {
                deepestChild = found;
              }
            }
          }
        }
      }
    }
  }

  return deepestChild || node;
}

export const CodeEditor: React.FC = () => {
  const code = useWorkspaceStore((state) => state.code);
  const setCode = useWorkspaceStore((state) => state.setCode);
  const language = useWorkspaceStore((state) => state.language);
  const setAST = useWorkspaceStore((state) => state.setAST);
  const setParseError = useWorkspaceStore((state) => state.setParseError);
  const activeNodeId = useWorkspaceStore((state) => state.activeNodeId);
  const highlightRange = useWorkspaceStore((state) => state.highlightRange);
  const setActiveNodeId = useWorkspaceStore((state) => state.setActiveNodeId);
  const ast = useWorkspaceStore((state) => state.ast);

  const editorRef = useRef<any>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const decorationsRef = useRef<string[]>([]);
  const isUpdatingFromGraphRef = useRef<boolean>(false);

  // Parse code whenever it changes (with debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      const result = parseSourceCode(code, language);
      if (result.error) {
        setParseError(result.error);
      } else {
        setAST(result.ast, result.timeMs);
      }
    }, 80); // Debounce typing

    return () => clearTimeout(timer);
  }, [code, language, setAST, setParseError]);

  // Highlight range in editor when activeNodeId / highlightRange changes
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current || !highlightRange) {
      if (editorRef.current && decorationsRef.current.length > 0) {
        decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, []);
      }
      return;
    }

    const editor = editorRef.current;
    const monaco = monacoRef.current;
    const model = editor.getModel();

    if (!model) return;

    isUpdatingFromGraphRef.current = true;

    const startPos = model.getPositionAt(highlightRange.start);
    const endPos = model.getPositionAt(highlightRange.end);

    const range = new monaco.Range(
      startPos.lineNumber,
      startPos.column,
      endPos.lineNumber,
      endPos.column,
    );

    // Apply cyan background highlight (using standard Monaco styling or class)
    decorationsRef.current = editor.deltaDecorations(decorationsRef.current, [
      {
        range,
        options: {
          isWholeLine: false,
          className: 'bg-cyan/20 border-b border-cyan border-dashed',
          inlineClassName: 'bg-[#06B6D4]/20',
        },
      },
    ]);

    // Scroll to reveal the code if selection changed
    editor.revealRangeInCenterIfOutsideViewport(range);

    setTimeout(() => {
      isUpdatingFromGraphRef.current = false;
    }, 50);
  }, [highlightRange, activeNodeId]);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Set theme
    monaco.editor.defineTheme('synapse-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '94A3B8', fontStyle: 'italic' },
        { token: 'keyword', foreground: '7C3AED', fontStyle: 'bold' },
        { token: 'string', foreground: '10B981' },
        { token: 'number', foreground: '10B981' },
        { token: 'type', foreground: '06B6D4' },
      ],
      colors: {
        'editor.background': '#0D0D1A',
        'editor.lineHighlightBackground': '#12121F',
        'editorGutter.background': '#0D0D1A',
        'editorLineNumber.foreground': '#2A2A45',
        'editorLineNumber.activeForeground': '#7C3AED',
      },
    });
    monaco.editor.setTheme('synapse-dark');

    // Cursor position change listener (Editor -> Graph Sync)
    editor.onDidChangeCursorPosition((e: any) => {
      if (isUpdatingFromGraphRef.current || !ast) return;

      const model = editor.getModel();
      if (!model) return;

      const offset = model.getOffsetAt(e.position);
      const deepest = findDeepestNodeAtOffset(ast.program || ast, offset);

      if (deepest) {
        const id = `${deepest.type}-${deepest.start || 0}-${deepest.end || 0}`;
        const range = { start: deepest.start || 0, end: deepest.end || 0 };
        setActiveNodeId(id, range);
      } else {
        setActiveNodeId(null, null);
      }
    });
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#0D0D1A]">
      <MonacoEditor
        height="100%"
        language={language === 'typescript' ? 'typescript' : 'javascript'}
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: 'JetBrains Mono',
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: false,
          automaticLayout: true,
          padding: { top: 12 },
        }}
      />
    </div>
  );
};
export default CodeEditor;
