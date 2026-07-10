import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';
import { useWorkspaceStore } from '@/entities/workspace/model/store';

// Helper to resolve colors locally
function getNodeColorLocal(type: string): string {
  if (type.endsWith('Declaration') || type.endsWith('Pattern') || type === 'ClassBody') {
    return '#7C3AED'; // Purple
  }
  if (type.endsWith('Expression') || type.endsWith('Member')) {
    return '#06B6D4'; // Cyan
  }
  if (type.endsWith('Statement') || type === 'SwitchCase' || type === 'CatchClause') {
    return '#F59E0B'; // Amber
  }
  if (type.endsWith('Literal')) {
    return '#10B981'; // Green
  }
  if (type === 'Identifier') {
    return '#94A3B8'; // Slate/Muted
  }
  if (type === 'File' || type === 'Program') {
    return '#EF4444'; // Red
  }
  return '#94A3B8'; // Default
}

export const CustomASTNode = memo(({ data }: any) => {
  const { id, type, label, properties, hasChildren, isCollapsed, range } = data;

  const activeNodeId = useWorkspaceStore((state) => state.activeNodeId);
  const setActiveNodeId = useWorkspaceStore((state) => state.setActiveNodeId);
  const toggleCollapseNode = useWorkspaceStore((state) => state.toggleCollapseNode);

  const isActive = activeNodeId === id;
  const categoryColor = getNodeColorLocal(type);

  const handleNodeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveNodeId(id, range);
  };

  const handleCollapseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleCollapseNode(id);
  };

  // Convert properties to display string
  const propList = Object.entries(properties)
    .filter(([_, val]) => val !== undefined && val !== null && typeof val !== 'object')
    .slice(0, 3) // show top 3 properties
    .map(([key, val]) => `${key}: ${String(val)}`);

  return (
    <motion.div
      layoutId={id}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        boxShadow: isActive ? `0 0 16px ${categoryColor}` : 'none',
      }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onClick={handleNodeClick}
      className={`relative px-4 py-2 rounded-lg border bg-[#1C1C2E] cursor-pointer transition-all w-[200px] select-none`}
      style={{
        borderColor: isActive ? categoryColor : '#2A2A45',
        borderTopWidth: '4px',
        borderTopColor: categoryColor,
      }}
    >
      {/* Handles */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#2A2A45', border: '1px solid #1C1C2E' }}
      />

      {/* Node Content */}
      <div className="flex flex-col">
        <span className="text-[12px] font-bold text-white truncate" title={label}>
          {label}
        </span>

        {propList.length > 0 && (
          <div className="mt-1 flex flex-col gap-0.5 border-t border-[#2A2A45] pt-1">
            {propList.map((prop, idx) => (
              <span key={idx} className="text-[10px] text-[#94A3B8] truncate" title={prop}>
                {prop}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Collapse button */}
      {hasChildren && (
        <button
          onClick={handleCollapseClick}
          className="absolute -bottom-2 right-2 flex items-center justify-center w-4 h-4 rounded-full bg-[#2A2A45] border border-[#1C1C2E] hover:bg-[#7C3AED] transition-colors"
        >
          <span className="text-[10px] leading-[0px] text-white">{isCollapsed ? '+' : '-'}</span>
        </button>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#2A2A45', border: '1px solid #1C1C2E' }}
      />
    </motion.div>
  );
});

CustomASTNode.displayName = 'CustomASTNode';
