import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWorkspaceStore } from '@/entities/workspace/model/store';

export const Header: React.FC = () => {
  const location = useLocation();
  const isEditorPage = location.pathname === '/editor';

  const language = useWorkspaceStore((state) => state.language);
  const setLanguage = useWorkspaceStore((state) => state.setLanguage);
  const filterTypes = useWorkspaceStore((state) => state.filterTypes);
  const setFilterTypes = useWorkspaceStore((state) => state.setFilterTypes);
  const code = useWorkspaceStore((state) => state.code);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Common node types that can be filtered
  const filters = [
    { label: 'Identifiers (Name)', type: 'Identifier' },
    { label: 'String/Numeric Literals', type: 'StringLiteral' },
    { label: 'Comments', type: 'CommentLine' },
    { label: 'Expressions', type: 'MemberExpression' },
  ];

  const handleFilterToggle = (type: string) => {
    if (filterTypes.includes(type)) {
      setFilterTypes(filterTypes.filter((t) => t !== type));
    } else {
      setFilterTypes([...filterTypes, type]);
    }
  };

  // Copy URL with encoded code for workspace sharing
  const handleShare = () => {
    const encoded = btoa(unescape(encodeURIComponent(code)));
    const shareUrl = `${window.location.origin}/editor#code=${encoded}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Shareable workspace link copied to clipboard!');
  };

  return (
    <header className="h-[56px] border-b border-[#2A2A45] bg-[#12121F] px-6 flex items-center justify-between z-30 relative select-none">
      {/* Left: Logo & Wordmark */}
      <Link to="/" className="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-8 h-8">
          <defs>
            <linearGradient id="navLineGrad" x1="50%" y1="20%" x2="30%" y2="70%">
              <stop offset="0%" stop-color="#7C3AED" />
              <stop offset="100%" stop-color="#06B6D4" />
            </linearGradient>
            <linearGradient id="navLineGradRight" x1="50%" y1="20%" x2="70%" y2="70%">
              <stop offset="0%" stop-color="#7C3AED" />
              <stop offset="100%" stop-color="#06B6D4" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="#1C1C2E" stroke="#7C3AED" stroke-width="4" />
          <line x1="50" y1="30" x2="30" y2="70" stroke="url(#navLineGrad)" stroke-width="5" />
          <line x1="50" y1="30" x2="70" y2="70" stroke="url(#navLineGradRight)" stroke-width="5" />
          <circle cx="50" cy="30" r="9" fill="#7C3AED" />
          <circle cx="30" cy="70" r="9" fill="#06B6D4" />
          <circle cx="70" cy="70" r="9" fill="#06B6D4" />
        </svg>
        <span className="font-bold text-[18px] tracking-wide text-white">
          Synapse<span className="text-[#7C3AED]">AST</span>
        </span>
      </Link>

      {/* Center: Language & filters (Only visible on Editor page) */}
      {isEditorPage ? (
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#94A3B8] font-semibold uppercase">Lang</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-[#1C1C2E] border border-[#2A2A45] text-white px-3 py-1 text-sm rounded-md focus:border-[#06B6D4] outline-none cursor-pointer"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="jsx">React JSX</option>
            </select>
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`bg-[#1C1C2E] border border-[#2A2A45] hover:border-[#06B6D4] text-white px-3 py-1 text-sm rounded-md flex items-center gap-2 outline-none cursor-pointer`}
            >
              <span>Filter Nodes</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
            </button>
            {isFilterOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)} />
                <div className="absolute left-0 mt-2 w-56 bg-[#12121F] border border-[#2A2A45] rounded-lg p-2 shadow-2xl z-20 flex flex-col gap-1">
                  {filters.map((filter) => (
                    <label key={filter.type} className="flex items-center gap-2 px-2 py-1.5 hover:bg-[#1C1C2E] rounded cursor-pointer text-sm text-[#F1F5F9]">
                      <input
                        type="checkbox"
                        checked={filterTypes.includes(filter.type)}
                        onChange={() => handleFilterToggle(filter.type)}
                        className="accent-[#7C3AED]"
                      />
                      <span>{filter.label}</span>
                    </label>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        /* Standard Nav Links */
        <nav className="flex items-center gap-6">
          <Link
            to="/editor"
            className={`text-sm font-medium transition-colors hover:text-white ${location.pathname === '/editor' ? 'text-white' : 'text-[#94A3B8]'}`}
          >
            Editor
          </Link>
          <Link
            to="/examples"
            className={`text-sm font-medium transition-colors hover:text-white ${location.pathname === '/examples' ? 'text-white' : 'text-[#94A3B8]'}`}
          >
            Examples
          </Link>
          <Link
            to="/docs"
            className={`text-sm font-medium transition-colors hover:text-white ${location.pathname === '/docs' ? 'text-white' : 'text-[#94A3B8]'}`}
          >
            Docs
          </Link>
        </nav>
      )}

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {isEditorPage ? (
          <>
            <button
              onClick={handleShare}
              className="bg-[#1C1C2E] border border-[#2A2A45] hover:border-[#7C3AED] text-sm text-white px-3 py-1.5 rounded-md flex items-center gap-2 cursor-pointer transition-colors"
            >
              <span>Share</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </button>
            <Link
              to="/"
              className="text-[#94A3B8] hover:text-white text-sm font-medium transition-colors hidden sm:block"
            >
              Back to Home
            </Link>
          </>
        ) : (
          <Link
            to="/editor"
            className="bg-[#7C3AED] hover:bg-[#A855F7] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-md shadow-[#7C3AED]/20 cursor-pointer"
          >
            Open Editor
          </Link>
        )}
      </div>
    </header>
  );
};
export default Header;
