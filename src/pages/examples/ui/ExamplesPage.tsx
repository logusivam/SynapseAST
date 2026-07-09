import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkspaceStore } from '@/entities/workspace/model/store';
import { Header } from '@/widgets/header/ui/Header';

interface ExampleItem {
  id: string;
  title: string;
  category: string;
  language: 'javascript' | 'typescript' | 'jsx';
  code: string;
}

export const ExamplesPage: React.FC = () => {
  const navigate = useNavigate();
  const setCode = useWorkspaceStore((state) => state.setCode);
  const setLanguage = useWorkspaceStore((state) => state.setLanguage);

  const examples: ExampleItem[] = [
    {
      id: 'arrow-fn',
      title: 'Arrow Function & Map',
      category: 'Expression',
      language: 'javascript',
      code: `const numbers = [1, 2, 3];\nconst doubles = numbers.map(x => x * 2);\nconsole.log(doubles);`,
    },
    {
      id: 'class',
      title: 'ES6 Class declaration',
      category: 'Declaration',
      language: 'javascript',
      code: `class Developer {\n  constructor(name) {\n    this.name = name;\n  }\n  greet() {\n    return \`Hi, I am \${this.name}\`;\n  }\n}`,
    },
    {
      id: 'async-await',
      title: 'Async/Await API Call',
      category: 'Statement',
      language: 'javascript',
      code: `async function fetchData(url) {\n  const res = await fetch(url);\n  const data = await res.json();\n  return data;\n}`,
    },
    {
      id: 'import',
      title: 'Module Imports/Exports',
      category: 'Declaration',
      language: 'typescript',
      code: `import { createStore } from 'zustand';\n\nexport interface State {\n  count: number;\n}\nexport const useStore = createStore<State>(() => ({\n  count: 0,\n}));`,
    },
    {
      id: 'ternary',
      title: 'Nested Ternary Operator',
      category: 'Expression',
      language: 'javascript',
      code: `const status = isLoading \n  ? 'loading' \n  : error \n    ? 'failed' \n    : 'success';`,
    },
    {
      id: 'destructuring',
      title: 'Object & Array Destructuring',
      category: 'Expression',
      language: 'typescript',
      code: `interface User { id: number; name: string; roles: string[] }\nconst user: User = { id: 1, name: 'Alice', roles: ['admin'] };\nconst { name, roles: [primaryRole] } = user;`,
    },
  ];

  const handleLoadExample = (example: ExampleItem) => {
    setCode(example.code);
    setLanguage(example.language);
    navigate('/editor');
  };

  return (
    <div className="min-h-screen bg-[#0A0A12] flex flex-col text-[#F1F5F9] relative select-none">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-white mb-2">Explore AST Examples</h1>
          <p className="text-[#94A3B8] text-base max-w-xl">
            Choose a pre-built code sample to instantly load and visualize its AST structure inside the editor.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {examples.map((ex) => (
            <div
              key={ex.id}
              className="bg-[#12121F] border border-[#2A2A45] rounded-xl overflow-hidden hover:border-[#7C3AED] hover:shadow-lg hover:shadow-[#7C3AED]/5 transition-all transform hover:-translate-y-1 group flex flex-col justify-between"
            >
              {/* Code preview */}
              <div className="p-4 bg-[#0D0D1A] border-b border-[#2A2A45] font-mono text-[11px] text-[#E2E8F0] h-[130px] overflow-hidden relative">
                <pre className="whitespace-pre-wrap">{ex.code}</pre>
                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#0D0D1A] to-transparent" />
              </div>

              {/* Detail block */}
              <div className="p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-white group-hover:text-[#7C3AED] transition-colors">
                    {ex.title}
                  </h3>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    ex.category === 'Declaration' 
                      ? 'bg-[#7C3AED]/20 text-[#A855F7] border border-[#7C3AED]/30'
                      : ex.category === 'Expression'
                      ? 'bg-[#06B6D4]/20 text-[#06B6D4] border border-[#06B6D4]/30'
                      : 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30'
                  }`}>
                    {ex.category}
                  </span>
                </div>
                
                <button
                  onClick={() => handleLoadExample(ex)}
                  className="w-full bg-[#7C3AED] hover:bg-[#A855F7] text-white text-sm font-bold py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Load in Editor
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div 
          onClick={() => navigate('/editor')}
          className="bg-[#1C1C2E] border border-[#2A2A45] p-6 rounded-xl flex items-center justify-between hover:border-[#7C3AED] cursor-pointer transition-colors"
        >
          <div className="flex flex-col gap-1">
            <h4 className="text-white font-bold text-lg">Ready to write your own?</h4>
            <p className="text-[#94A3B8] text-sm">Open the live canvas editor to visualize any custom code fragment.</p>
          </div>
          <span className="text-[#7C3AED] group font-bold flex items-center gap-2 text-sm">
            Open Editor
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </span>
        </div>
      </main>
    </div>
  );
};
export default ExamplesPage;
