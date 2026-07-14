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
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { toPng } from 'html-to-image';
import { useWorkspaceStore } from '@/entities/workspace/model/store';
import { buildGraph, getLayoutedElements } from '@/entities/ast/lib/astTraversal';
import { CustomASTNode } from './CustomASTNode';

const nodeTypes = {
  customASTNode: CustomASTNode,
};

const ASTGraphInner: React.FC = () => {
  const ast = useWorkspaceStore((state) => state.ast);
  const filterTypes = useWorkspaceStore((state) => state.filterTypes);
  const collapsedNodeIds = useWorkspaceStore((state) => state.collapsedNodeIds);
  const setActiveNodeId = useWorkspaceStore((state) => state.setActiveNodeId);
  const setCollapsedNodeIds = useWorkspaceStore((state) => state.setCollapsedNodeIds);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const { fitView } = useReactFlow();

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
      collapsedNodeIds,
    );

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(rawNodes, rawEdges);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [ast, filterTypes, collapsedNodeIds, setNodes, setEdges]);

  // Handle graph click to clear selection
  const onPaneClick = () => {
    setActiveNodeId(null, null);
  };

  const handleExport = () => {
    // Save original collapsed state
    const originalCollapsed = [...collapsedNodeIds];

    // 1. Expand all nodes for export
    setCollapsedNodeIds([]);

    // 2. Wait for state to apply and layout to calculate
    setTimeout(() => {
      fitView({ padding: 0.15 });

      // 3. Render viewport into PNG with high density (pixelRatio 3)
      setTimeout(async () => {
        try {
          const flowViewport = document.querySelector('.react-flow__viewport') as HTMLElement;
          if (!flowViewport) return;

          const dataUrl = await toPng(flowViewport, {
            backgroundColor: '#0A0A12',
            pixelRatio: 3,
          });

          // Trigger download
          const link = document.createElement('a');
          link.download = `synapse-ast-${Date.now()}.png`;
          link.href = dataUrl;
          link.click();
        } catch (error) {
          console.error('Failed to export AST layout as PNG:', error);
        } finally {
          // 4. Restore collapsed state and re-align view
          setCollapsedNodeIds(originalCollapsed);
          setTimeout(() => {
            fitView({ padding: 0.2 });
          }, 100);
        }
      }, 150);
    }, 100);
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
        proOptions={{ hideAttribution: true }}
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
          <div className="action-wrap">
            <div className="backdrop" />
            {legendItems.map((item) => (
              <button key={item.label} className="action" type="button">
                <span
                  className="action-icon block rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="action-content">{item.label}</span>
              </button>
            ))}
          </div>
        </Panel>

        {/* Top-Right Panels (Export & Node count) */}
        <Panel position="top-right" className="m-4 flex items-center gap-2 select-none">
          <button
            onClick={handleExport}
            className="bg-[#1C1C2E] border border-[#2A2A45] hover:bg-[#2A2A45] hover:border-[#7C3AED] px-3 py-1.5 rounded-full text-[11px] font-semibold text-white shadow-lg transition-all flex items-center gap-1 cursor-pointer"
            title="Export AST Layout as High-Res PNG"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3.5 h-3.5 text-[#06B6D4]"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm3.293-7.707a1 1 0 0 1 1.414 0L9 10.586V3a1 1 0 1 1 2 0v7.586l1.293-1.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Export PNG
          </button>
          <div className="bg-[#1C1C2E] border border-[#2A2A45] px-3 py-1.5 rounded-full text-[11px] font-semibold text-white shadow-lg">
            {nodes.length} Nodes
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export const ASTGraph: React.FC = () => {
  return (
    <ReactFlowProvider>
      <ASTGraphInner />
    </ReactFlowProvider>
  );
};

export default ASTGraph;
