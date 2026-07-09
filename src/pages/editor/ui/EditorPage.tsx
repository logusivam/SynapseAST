import React, { useEffect } from 'react';
import { Header } from '@/widgets/header/ui/Header';
import { CodeEditor } from '@/widgets/code-editor/ui/CodeEditor';
import { ASTGraph } from '@/widgets/ast-graph/ui/ASTGraph';
import { useWorkspaceStore } from '@/entities/workspace/model/store';

export const EditorPage: React.FC = () => {
  const parseTime = useWorkspaceStore((state) => state.parseTime);
  const parseError = useWorkspaceStore((state) => state.parseError);
  const activeNodeId = useWorkspaceStore((state) => state.activeNodeId);
  const setCode = useWorkspaceStore((state) => state.setCode);

  // Check URL hash for shared code on mount
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#code=')) {
      try {
        const base64Code = hash.substring(6);
        const decoded = decodeURIComponent(escape(atob(base64Code)));
        if (decoded) {
          setCode(decoded);
        }
      } catch (err) {
        console.error('Failed to decode shared workspace URL code', err);
      }
    }
  }, [setCode]);

  return (
    <div className="h-screen flex flex-col bg-[#0A0A12] text-[#F1F5F9] overflow-hidden select-none">
      <Header />

      {/* Main Workspace Split Pane */}
      <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#2A2A45] h-[calc(100vh-56px-24px)] overflow-hidden">
        {/* Left Pane: Code Editor */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative flex flex-col">
          <CodeEditor />
          {parseError && (
            <div className="absolute bottom-0 inset-x-0 bg-[#EF4444]/95 text-white text-xs px-4 py-2 border-t border-[#2A2A45] backdrop-blur-md flex items-center justify-between z-10">
              <span className="font-semibold truncate">{parseError}</span>
              <span className="text-[10px] uppercase font-bold bg-white/20 px-1.5 py-0.5 rounded ml-2 flex-shrink-0">
                Parse Error
              </span>
            </div>
          )}
        </div>

        {/* Right Pane: AST Graph */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
          <ASTGraph />
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="h-[24px] bg-[#12121F] border-t border-[#2A2A45] px-4 flex items-center justify-between text-[11px] text-[#94A3B8] font-medium z-30 select-none">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            Parse time: <span className="text-white font-semibold">{parseError ? '--' : `${parseTime}ms`}</span>
          </span>
          {activeNodeId && (
            <span className="text-[#06B6D4] truncate max-w-[250px]" title={activeNodeId}>
              Active Node: <span className="font-semibold">{activeNodeId.split('-')[0]}</span>
            </span>
          )}
        </div>
        <div>
          <span>Client-only CSR Engine</span>
        </div>
      </div>
    </div>
  );
};
export default EditorPage;
