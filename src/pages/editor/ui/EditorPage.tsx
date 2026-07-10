import React, { useEffect, useState } from 'react';
import { Header } from '@/widgets/header/ui/Header';
import { CodeEditor } from '@/widgets/code-editor/ui/CodeEditor';
import { ASTGraph } from '@/widgets/ast-graph/ui/ASTGraph';
import { useWorkspaceStore } from '@/entities/workspace/model/store';

export const EditorPage: React.FC = () => {
  const parseTime = useWorkspaceStore((state) => state.parseTime);
  const parseError = useWorkspaceStore((state) => state.parseError);
  const activeNodeId = useWorkspaceStore((state) => state.activeNodeId);
  const setCode = useWorkspaceStore((state) => state.setCode);

  const [splitWidth, setSplitWidth] = useState(50); // percentage for left pane
  const [splitHeight, setSplitHeight] = useState(50); // percentage for top pane (mobile)

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

  // Handle pane resize dragging (horizontal - desktop)
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const startX = clientX;
    const startWidth = splitWidth;

    const handleMouseMove = (moveEvent: MouseEvent | TouchEvent) => {
      const currentX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const deltaX = currentX - startX;
      const deltaPercent = (deltaX / window.innerWidth) * 100;
      const newWidth = Math.max(20, Math.min(80, startWidth + deltaPercent));
      setSplitWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove, { passive: false });
    document.addEventListener('touchend', handleMouseUp);
  };

  // Handle pane resize dragging (vertical - mobile)
  const handleMouseDownVertical = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const startY = clientY;
    const startHeight = splitHeight;

    const handleMouseMoveVertical = (moveEvent: MouseEvent | TouchEvent) => {
      const currentY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;
      const deltaY = currentY - startY;
      const deltaPercent = (deltaY / window.innerHeight) * 100;
      const newHeight = Math.max(20, Math.min(80, startHeight + deltaPercent));
      setSplitHeight(newHeight);
    };

    const handleMouseUpVertical = () => {
      document.removeEventListener('mousemove', handleMouseMoveVertical);
      document.removeEventListener('mouseup', handleMouseUpVertical);
      document.removeEventListener('touchmove', handleMouseMoveVertical);
      document.removeEventListener('touchend', handleMouseUpVertical);
    };

    document.addEventListener('mousemove', handleMouseMoveVertical);
    document.addEventListener('mouseup', handleMouseUpVertical);
    document.addEventListener('touchmove', handleMouseMoveVertical, { passive: false });
    document.addEventListener('touchend', handleMouseUpVertical);
  };

  const renderDesktopIcon = () => {
    if (splitWidth < 45) {
      return (
        <svg className="w-3.5 h-3.5 text-[#94A3B8] hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      );
    }
    if (splitWidth > 55) {
      return (
        <svg className="w-3.5 h-3.5 text-[#94A3B8] hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      );
    }
    return (
      <div className="flex gap-0.5 justify-center items-center h-4">
        <div className="w-0.5 h-3 bg-[#94A3B8]/60 rounded-full" />
        <div className="w-0.5 h-3 bg-[#94A3B8]/60 rounded-full" />
      </div>
    );
  };

  const renderMobileIcon = () => {
    if (splitHeight < 45) {
      return (
        <svg className="w-3.5 h-3.5 text-[#94A3B8] hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      );
    }
    if (splitHeight > 55) {
      return (
        <svg className="w-3.5 h-3.5 text-[#94A3B8] hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      );
    }
    return (
      <div className="flex flex-col gap-0.5 justify-center items-center w-4">
        <div className="h-0.5 w-3 bg-[#94A3B8]/60 rounded-full" />
        <div className="h-0.5 w-3 bg-[#94A3B8]/60 rounded-full" />
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-[#0A0A12] text-[#F1F5F9] overflow-hidden select-none">
      <Header />

      {/* Main Workspace Split Pane */}
      <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-56px-24px)] overflow-hidden">
        {/* Left Pane: Code Editor */}
        <div 
          className="relative flex flex-col flex-shrink-0 w-full md:w-[var(--split-width)] h-[var(--split-height)] md:h-full"
          style={{
            '--split-width': `${splitWidth}%`,
            '--split-height': `${splitHeight}%`
          } as React.CSSProperties}
        >
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

        {/* Resizable Divider (Desktop) */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          className="hidden md:flex w-4 h-full cursor-col-resize bg-[#12121F] hover:bg-[#7C3AED] active:bg-[#7C3AED] border-x border-[#2A2A45] transition-colors z-20 flex-shrink-0 items-center justify-center select-none"
        >
          {renderDesktopIcon()}
        </div>

        {/* Resizable Divider (Mobile) */}
        <div
          onMouseDown={handleMouseDownVertical}
          onTouchStart={handleMouseDownVertical}
          className="flex md:hidden h-4 w-full cursor-row-resize bg-[#12121F] hover:bg-[#7C3AED] active:bg-[#7C3AED] border-y border-[#2A2A45] transition-colors z-20 flex-shrink-0 items-center justify-center select-none"
        >
          {renderMobileIcon()}
        </div>

        {/* Right Pane: AST Graph */}
        <div 
          className="relative flex-shrink-0 w-full md:w-[calc(100%_-_var(--split-width))] h-[calc(100%_-_var(--split-height))] md:h-full"
          style={{
            '--split-width': `${splitWidth}%`,
            '--split-height': `${splitHeight}%`
          } as React.CSSProperties}
        >
          <ASTGraph />
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="min-h-[24px] h-auto py-1 sm:py-0 bg-[#12121F] border-t border-[#2A2A45] px-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#94A3B8] font-medium z-30 select-none gap-1 sm:gap-0">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            Parse time: <span className="text-white font-semibold">{parseError ? '--' : `${parseTime}ms`}</span>
          </span>
          {activeNodeId && (
            <span className="text-[#06B6D4] truncate max-w-[200px] sm:max-w-[250px]" title={activeNodeId}>
              Active Node: <span className="font-semibold">{activeNodeId.split('-')[0]}</span>
            </span>
          )}
        </div>
        <div className="text-[10px] sm:text-[11px]">
          <span>Client-only CSR Engine</span>
        </div>
      </div>
    </div>
  );
};
export default EditorPage;
