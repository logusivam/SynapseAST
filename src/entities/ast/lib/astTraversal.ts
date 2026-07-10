import { Node, Edge } from '@xyflow/react';
import * as dagre from 'dagre';

export interface ASTNodeData {
  id: string;
  type: string;
  label: string;
  range: { start: number; end: number };
  properties: Record<string, any>;
  hasChildren: boolean;
  isCollapsed: boolean;
}

// Check if a value is an AST Node
function isASTNode(value: any): boolean {
  return (
    value &&
    typeof value === 'object' &&
    typeof value.type === 'string' &&
    value.type !== 'Position' &&
    value.type !== 'SourceLocation'
  );
}

// Extract primitive properties and flag if node has children
function extractNodeDetails(node: any): {
  properties: Record<string, any>;
  children: Array<{ key: string; node: any }>;
} {
  const properties: Record<string, any> = {};
  const children: Array<{ key: string; node: any }> = [];

  for (const key in node) {
    if (
      key === 'type' ||
      key === 'loc' ||
      key === 'start' ||
      key === 'end' ||
      key === 'extra' ||
      key === 'tokens'
    ) {
      continue;
    }

    const value = node[key];
    if (isASTNode(value)) {
      children.push({ key, node: value });
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (isASTNode(item)) {
          children.push({ key: `${key}[${index}]`, node: item });
        }
      });
    } else if (value !== null && typeof value !== 'object') {
      properties[key] = value;
    }
  }

  return { properties, children };
}

// Unique stable ID generator based on node type and source range
export function generateNodeId(node: any): string {
  const start = node.start !== undefined ? node.start : 0;
  const end = node.end !== undefined ? node.end : 0;
  return `${node.type}-${start}-${end}`;
}

export function buildGraph(
  node: any,
  _parentId: string | null = null,
  edgeLabel: string = '',
  filterTypes: string[] = [],
  collapsedNodeIds: string[] = [],
  nodes: Node[] = [],
  edges: Edge[] = [],
  visibleParentId: string | null = null,
): { nodes: Node[]; edges: Edge[] } {
  if (!node || !node.type) return { nodes, edges };

  const nodeId = generateNodeId(node);
  const isFiltered = filterTypes.includes(node.type);
  const isCollapsed = collapsedNodeIds.includes(nodeId);

  const { properties, children } = extractNodeDetails(node);
  const hasChildren = children.length > 0;

  let currentVisibleParentId = visibleParentId;

  if (!isFiltered) {
    const nodeData: ASTNodeData = {
      id: nodeId,
      type: node.type,
      label: node.type,
      range: { start: node.start || 0, end: node.end || 0 },
      properties,
      hasChildren,
      isCollapsed,
    };

    nodes.push({
      id: nodeId,
      type: 'customASTNode',
      position: { x: 0, y: 0 },
      data: nodeData as any,
    });

    if (visibleParentId) {
      edges.push({
        id: `${visibleParentId}->${nodeId}`,
        source: visibleParentId,
        target: nodeId,
        label: edgeLabel,
        animated: true,
        style: { stroke: '#06B6D4', strokeWidth: 1.5 },
      });
    }
    currentVisibleParentId = nodeId;
  }

  // If node is collapsed, we don't process its children
  if (isCollapsed) return { nodes, edges };

  children.forEach(({ key, node: childNode }) => {
    buildGraph(
      childNode,
      nodeId,
      key,
      filterTypes,
      collapsedNodeIds,
      nodes,
      edges,
      currentVisibleParentId,
    );
  });

  return { nodes, edges };
}

// Dagre Layout computation
export function getLayoutedElements(
  nodes: Node[],
  edges: Edge[],
  direction = 'TB',
): { nodes: Node[]; edges: Edge[] } {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 200;
  const nodeHeight = 80;

  dagreGraph.setGraph({ rankdir: direction, ranksep: 60, nodesep: 40 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
}
