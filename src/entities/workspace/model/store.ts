import { create } from 'zustand';

export interface CodeRange {
  start: number;
  end: number;
}

export interface ASTNodeData {
  id: string;
  type: string;
  label: string;
  range: CodeRange;
  properties: Record<string, any>;
  isCollapsed?: boolean;
  hasChildren?: boolean;
}

export interface WorkspaceState {
  code: string;
  language: 'javascript' | 'typescript' | 'jsx';
  ast: any | null;
  activeNodeId: string | null;
  highlightRange: CodeRange | null;
  parseError: string | null;
  parseTime: number; // in ms
  filterTypes: string[]; // types of nodes to hide
  collapsedNodeIds: string[]; // nodes whose children are hidden

  // Actions
  setCode: (code: string) => void;
  setLanguage: (lang: 'javascript' | 'typescript' | 'jsx') => void;
  setAST: (ast: any, parseTime: number) => void;
  setParseError: (err: string | null) => void;
  setActiveNodeId: (id: string | null, range?: CodeRange | null) => void;
  toggleFilterType: (type: string) => void;
  setFilterTypes: (types: string[]) => void;
  toggleCollapseNode: (id: string) => void;
  setCollapsedNodeIds: (ids: string[]) => void;
}

const defaultCode = `// Welcome to SynapseAST!
// Type code here and watch the tree morph in real time.

function greet(user) {
  const message = "Hello, " + user.name;
  console.log(message);
  return message;
}

const userObj = { name: "SynapseAST" };
greet(userObj);
`;

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  code: defaultCode,
  language: 'javascript',
  ast: null,
  activeNodeId: null,
  highlightRange: null,
  parseError: null,
  parseTime: 0,
  filterTypes: [],
  collapsedNodeIds: [],

  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),
  setAST: (ast, parseTime) => set({ ast, parseTime, parseError: null }),
  setParseError: (parseError) => set({ parseError }),
  setActiveNodeId: (activeNodeId, range = null) =>
    set((state) => ({
      activeNodeId,
      highlightRange: range !== undefined ? range : state.highlightRange,
    })),
  toggleFilterType: (type) =>
    set((state) => ({
      filterTypes: state.filterTypes.includes(type)
        ? state.filterTypes.filter((t) => t !== type)
        : [...state.filterTypes, type],
    })),
  setFilterTypes: (filterTypes) => set({ filterTypes }),
  toggleCollapseNode: (id) =>
    set((state) => ({
      collapsedNodeIds: state.collapsedNodeIds.includes(id)
        ? state.collapsedNodeIds.filter((cid) => cid !== id)
        : [...state.collapsedNodeIds, id],
    })),
  setCollapsedNodeIds: (collapsedNodeIds) => set({ collapsedNodeIds }),
}));
