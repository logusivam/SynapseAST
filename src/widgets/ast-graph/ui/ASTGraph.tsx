import React, { useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Panel,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useWorkspaceStore } from '@/entities/workspace/model/store';
import { buildGraph, getLayoutedElements } from '@/entities/ast/lib/astTraversal';
import { CustomASTNode } from './CustomASTNode';

const nodeTypes = {
  customASTNode: CustomASTNode,
};

export const ASTGraph: React.FC = () => {
  const ast = useWorkspaceStore((state) => state.ast);
  const filterTypes = useWorkspaceStore((state) => state.filterTypes);
  const collapsedNodeIds = useWorkspaceStore((state) => state.collapsedNodeIds);
  const setActiveNodeId = useWorkspaceStore((state) => state.setActiveNodeId);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  // Compute graph nodes and edges on AST change, filtering, or collapsing
  useEffect(() => {
    if (!ast) {
      setNodes([]);
      setEdges([]);
      return;
    }

    const { nodes: rawNodes, edges: rawEdges } = buildGraph(
      ast.program || ast,
      null,
      '',
      filterTypes,
      collapsedNodeIds
    );

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(rawNodes, rawEdges);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [ast, filterTypes, collapsedNodeIds, setNodes, setEdges]);

  // Handle graph click to clear selection
  const onPaneClick = () => {
    setActiveNodeId(null, null);
  };

  const legendItems = [
    { label: 'Declaration', color: '#7C3AED' },
    { label: 'Expression', color: '#06B6D4' },
    { label: 'Statement', color: '#F59E0B' },
    { label: 'Literal', color: '#10B981' },
    { label: 'Identifier', color: '#94A3B8' },
    { label: 'Root Node', color: '#EF4444' },
  ];

  return (
    <div className="w-full h-full bg-[#0A0A12] relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onPaneClick={onPaneClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
        maxZoom={2.0}
      >
        <Background color="#1C1C2E" gap={16} size={1} />
        
        {/* Controls styling */}
        <div className="absolute bottom-4 right-4 z-10">
          <Controls 
            showInteractive={false}
            className="!bg-[#1C1C2E] !border-[#2A2A45] !shadow-none [&_button]:!bg-[#1C1C2E] [&_button]:!border-[#2A2A45] [&_button]:!fill-[#94A3B8] [&_button:hover]:!bg-[#2A2A45]"
          />
        </div>

        {/* Legend Panel */}
        <Panel position="bottom-left" className="m-4">
          <div className="bg-[#12121F]/90 backdrop-blur-md border border-[#2A2A45] p-3 rounded-lg flex flex-col gap-1.5 shadow-xl max-w-[200px]">
            <span className="text-[10px] uppercase tracking-wider text-[#94A3B8] font-bold border-b border-[#2A2A45] pb-1 mb-1">
              Legend
            </span>
            {legendItems.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[11px] text-[#F1F5F9]">{item.label}</span>
              </div>
            ))}
          </div>
        </Panel>

        {/* Node Count Panel */}
        <Panel position="top-right" className="m-4">
          <div className="bg-[#1C1C2E] border border-[#2A2A45] px-3 py-1.5 rounded-full text-[11px] font-semibold text-white shadow-lg">
            {nodes.length} Nodes
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};
export default ASTGraph;
